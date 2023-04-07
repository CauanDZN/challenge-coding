from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required, get_jwt

from datetime import datetime, timezone, timedelta

from db import db
from models import ViagemModel, SentidoModel, ParadaModel, LinhaModel
from schemas import ViagemSchema, PlainViagemSchema
from math import radians, sin, atan2, cos, sqrt

blp = Blueprint("Viagens", __name__, description="Operações com viagens.")


@blp.route('/viagens')
class ViagemList(MethodView):
  @blp.response(200, ViagemSchema(many=True))
  def get(self):
    linha_id = req.args.get('linha')
    sentido_id = req.args.get('sentido')
    data_arg = req.args.get('data')

    data = datetime(datetime.today().year, datetime.today().month, datetime.today().day) if data_arg == 'hoje' else datetime.strptime(data_arg, '%d-%m-%Y')

    self.post(linha_id, sentido_id, data_arg)

    viagens = ViagemModel.query.filter(ViagemModel.id_linha == linha_id, ViagemModel.id_sentido == sentido_id, ViagemModel.data >= data).all()
    
    return viagens
  
  def post(self, lid, sid, data_):
    linha_id = req.args.get('linha') if not lid else lid
    sentido_id = req.args.get('sentido') if not sid else sid
    data_arg = req.args.get('data') if not data_ else data_

    data = datetime(datetime.today().year, datetime.today().month, datetime.today().day) if data_arg == 'hoje' else datetime.strptime(data_arg, '%d-%m-%Y')

    sentido = SentidoModel.query.filter(SentidoModel.id_linha == linha_id, SentidoModel.id == sentido_id).first()
    paradas = ParadaModel.query.filter(ParadaModel.id_linha == linha_id, ParadaModel.id_sentido == sentido_id).all()

    inicia_as = f"{sentido.horario_inicio}:00"
    termina_as = f"{sentido.horario_fim}:00"

    velocidade = 18.32
    
    inicio = datetime.strptime(f'{data.day}-{data.month}-{data.year} {inicia_as} Z-0300', '%d-%m-%Y %H:%M:%S Z%z')
    data_fim = datetime.strptime(f'{data.day}-{data.month}-{data.year} {termina_as} Z-0300', '%d-%m-%Y %H:%M:%S Z%z')

    viagem_exists = ViagemModel.query.filter(ViagemModel.id_linha == linha_id, ViagemModel.id_sentido == sentido_id, ViagemModel.data >= data).all()
    
    if not len(viagem_exists):
      while inicio <= data_fim:
        distancia_total = 0
        tempo_total = timedelta()

        for i in range(0, len(paradas) - 1):
            lat1 = radians(float(paradas[i].latitude))
            lon1 = radians(float(paradas[i].longitude))
            lat2 = radians(float(paradas[i + 1].latitude))
            lon2 = radians(float(paradas[i + 1].longitude))
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
            c = 2 * atan2(sqrt(a), sqrt(1 - a))
            distancia = 6371 * c

            segment_time = timedelta(hours=distancia / velocidade)

            tempo_total += segment_time
            distancia_total += distancia

        inicia_as = inicio
        inicio += tempo_total
        formatted_end_time = datetime.strftime(inicio, "%H:%M:%S")

        viagem = ViagemModel(
          id_linha=linha_id,
          id_sentido=sentido_id,
          data=data,
          origem=paradas[0].parada,
          destino=paradas[-1].parada,
          duracao_media=tempo_total.seconds,
          horario_partida=inicia_as,
          horario_chegada=inicio,
          pago_inteira=0,
          pago_meia=0,
          gratuidade=0,
          assentos_disponiveis=LinhaModel.query.get_or_404(linha_id).capacidade_assento,
        )
          
        try:
          db.session.add(viagem)
          db.session.commit()
        except Exception as e:
          print(e)
          abort(500, "An error ocurred while inserting item to table 'viagem'.")
    
    viagens = ViagemModel.query.filter(ViagemModel.id_linha == linha_id, ViagemModel.id_sentido == sentido_id, ViagemModel.data >= data)

    return viagens


@blp.route('/viagem')
class Viagem(MethodView):
  @blp.response(200, ViagemSchema)
  def get(self):
    viagem_id = req.args.get('id')
    viagem = ViagemModel.query.get_or_404(viagem_id)

    return viagem
  
  @jwt_required()
  @blp.arguments(ViagemSchema)
  @blp.response(201, ViagemSchema)
  def post(self, viagem_data):
    usuario_admin = get_jwt()["admin"]
    usuario_motorista = get_jwt()["motorista"]
    
    if usuario_admin or usuario_motorista:
      viagem = ViagemModel(**viagem_data)

      try:
        db.session.add(viagem)
        db.session.commit()
      except Exception as e:
        print(e)
        abort(500, "An error ocurred while inserting item to table 'viagem'.")

      return viagem
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.arguments(ViagemSchema)
  @blp.response(200, ViagemSchema)
  def put(self, viagem_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      viagem_id = req.args.get('id')
      viagem = ViagemModel.query.get(viagem_id)

      if viagem:
        viagem.id_linha = viagem_data["id_linha"]
        viagem.id_sentido = viagem_data["id_sentido"]
        viagem.data = viagem_data["data"]
        viagem.origem = viagem_data["origem"]
        viagem.destino = viagem_data["destino"]
        viagem.horario_partida = viagem_data["horario_partida"]
        viagem.horario_chegada = viagem_data["horario_chegada"]
        viagem.pago_inteira = viagem_data["pago_inteira"]
        viagem.pago_meia = viagem_data["pago_meia"]
        viagem.gratuidade = viagem_data["gratuidade"]
        viagem.assentos_disponiveis = viagem_data["assentos_disponiveis"]
        viagem.atualizado_em = datetime.now(tz=timezone.utc)
      else:
        viagem = ViagemModel(id=viagem_id, **viagem_data)

      try:
        db.session.add(viagem)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while inserting item to table 'viagem'.")

      return viagem
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.response(204)
  def delete(self):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      viagem_id = req.args.get('id')
      viagem = ViagemModel.query.get(viagem_id)

      if viagem:
        db.session.delete(viagem)
        db.session.commit()
      else:
        abort(404, "Item not found.")

      return {"message": "Viagem excluida."}
    abort(401, "Unauthorized access.")