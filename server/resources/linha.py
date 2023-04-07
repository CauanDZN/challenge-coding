from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt
import openai

from sqlalchemy.exc import SQLAlchemyError

from datetime import datetime, timezone

from db import db
from models import LinhaModel, SentidoModel
from schemas import LinhaSchema, PlainLinhaSchema


blp = Blueprint("Linhas", __name__, description="Operações com linhas.")


@blp.route('/linhas')
class LinhaList(MethodView):
  @blp.response(200, LinhaSchema(many=True))
  def get(self):
    linhas = LinhaModel.query.all()

    return linhas


@blp.route('/linhas/search')
class LinhaList(MethodView):
  @blp.response(200, LinhaSchema(many=True))
  def get(self):
    query = req.args.get('query')

    if query:
      linhas = LinhaModel.query.msearch(query, fields=['cod', 'nome', 'campus', 'tipo', 'tags'], limit=20)
    else:
      linhas = LinhaModel.query.all()

    return linhas
  
  @blp.response(200)
  def post(self):
    query = req.args.get('query')

    if query:
      linhas = LinhaModel.query.msearch(query, fields=['cod', 'nome', 'campus', 'tipo', 'tags'], limit=20).all()

      input_text = 'input: Considere as seguintes informações: '

      for linha in linhas:
        sentidos = SentidoModel.query.filter(SentidoModel.id_linha == linha.id).all()
        input_text += f'Encontrada a linha de ônibus com nome "{linha.cod} {linha.nome}", que contém uma parada próxima ao campus {linha.campus}, contendo {len(sentidos)} sentidos, sendo esses: '

        for sentido in sentidos:
          input_text += f'Sentido {sentido.sentido}, que inicia suas operações as {sentido.horario_inicio} partindo de {sentido.ponto_partida} e chegando ao destino {sentido.ponto_destino} em cada viagem, terminando o dia as {sentido.horario_fim}. '
      
      input_text += f'Faça um texto resumido gerando apenas as informações pedidas de acordo com as palavras chave "{str(query)}", utilizando como base as linhas de ônibus encontradas, gerando as informações da forma mais simplificada o possível para o entendimento do usuário, leve mais em consideração a localização de origem e o campus onde o ônibus para.'

      print(input_text)

      response = openai.Completion.create(
          engine="text-davinci-003",
          prompt=input_text,
          temperature=0.6,
          max_tokens=512,
          top_p=1,
          frequency_penalty=0,
          presence_penalty=0,
          stop=["input:"],
      )

      generated_text = ''

      for choice in response.choices:
        generated_text+= choice.text + ''

    else:
      linhas = LinhaModel.query.all()

      return linhas

    return generated_text


@blp.route("/linha")
class Linha(MethodView):
  @blp.response(200, LinhaSchema)
  def get(self):
    linha_id = req.args.get('id')
    linha = LinhaModel.query.get_or_404(linha_id)

    return linha
  
  @jwt_required()
  @blp.arguments(LinhaSchema)
  @blp.response(201, LinhaSchema)
  def post(self, linha_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      linha = LinhaModel(**linha_data)

      try:
        db.session.add(linha)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while inserting item to table 'linha'.")

      return linha
    
    abort(401, "Unauthorized access.")

  @jwt_required()
  @blp.arguments(LinhaSchema)
  @blp.response(200, LinhaSchema)
  def put(self, linha_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      linha_id = req.args.get('id')
      linha = LinhaModel.query.get(linha_id)

      if linha:
        linha.cod = linha_data["cod"]
        linha.nome = linha_data["nome"]
        linha.campus = linha_data["campus"]
        linha.valor_inteira = linha_data["valor_inteira"]
        linha.valor_meia = linha_data["valor_meia"]
        linha.tipo = linha_data["tipo"]
        linha.capacidade_assento = linha_data["capacidade_assento"]
        linha.atualizado_em = datetime.now(tz=timezone.utc)
      else:
        linha = LinhaModel(id=linha_id, **linha_data)

      try:
        db.session.add(linha)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while updating item in table 'linha'.")

      return linha
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.response(204)
  def delete(self):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      linha_id = req.args.get('id')
      linha = LinhaModel.query.get(linha_id)

      if linha:
        db.session.delete(linha)
        db.session.commit()
      else:
        abort(404, "Item not found in table 'linha'.")
      
      return {"message": "Linha excluida."}
    
    abort(401, "Unauthorized access.")