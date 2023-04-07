from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity

from datetime import datetime, timezone

from db import db
from models import SentidoModel
from schemas import SentidoSchema


blp = Blueprint("Sentidos", __name__, description="Operações com sentidos.")


@blp.route('/sentidos')
class SentidoList(MethodView):
  @blp.response(200, SentidoSchema(many=True))
  def get(self):
    linha_id = req.args.get('linha')
    
    if linha_id:
      sentidos = SentidoModel.query.filter(SentidoModel.id_linha == linha_id)
    else:
      sentidos = SentidoModel.query.all()

    return sentidos

@blp.route('/sentido')
class Sentido(MethodView):
  @blp.response(200, SentidoSchema)
  def get(self):
    sentido_id = req.args.get('id')
    sentido = SentidoModel.query.get_or_404(sentido_id)

    return sentido

  @jwt_required()
  @blp.arguments(SentidoSchema)
  @blp.response(201, SentidoSchema)
  def post(self, sentido_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      sentido = SentidoModel(**sentido_data)

      try:
        db.session.add(sentido)
        db.session.commit()
      except SQLAlchemyError:
        abort(500, "An error ocurred while inserting item to table 'sentido'.")

      return sentido
    
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.arguments(SentidoSchema)
  @blp.response(200, SentidoSchema)
  def put(self, sentido_data):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      sentido_id = req.args.get('id')
      sentido = SentidoModel.query.get(sentido_id)

      if sentido:
        sentido.id_linha = sentido_data["id_linha"]
        sentido.sentido = sentido_data["sentido"]
        sentido.ponto_partida = sentido_data["ponto_partida"]
        sentido.ponto_destino = sentido_data["ponto_destino"]
        sentido.horario_inicio = sentido_data["horario_inicio"]
        sentido.horario_fim = sentido_data["horario_fim"]
        sentido.atualizado_em = datetime.now().isoformat()
      else:
        sentido = SentidoModel(id=sentido_id, **sentido_data)

      return sentido
    abort(401, "Unauthorized access.")
  
  @jwt_required()
  @blp.response(204)
  def delete(self):
    usuario_admin = get_jwt()["admin"]
    
    if usuario_admin:
      sentido_id = req.args.get('id')
      sentido = SentidoModel.query.get(sentido_id)

      if sentido:
        db.session.delete(sentido)
        db.session.commit()
      else:
        abort(404, "Item not found.")

      return {"message", "Sentido excluido."}
    abort(401, "Unauthorized access.")