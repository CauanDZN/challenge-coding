from db import db
from datetime import datetime, timezone

class ViagemModel(db.Model):
  __tablename__ = "viagens"

  id = db.Column(db.Integer, primary_key=True)
  id_linha = db.Column(db.Integer, db.ForeignKey("linhas.id"), nullable=False)
  id_sentido = db.Column(db.Integer, db.ForeignKey("sentidos.id"),nullable=False)
  id_motorista = db.Column(db.Integer, db.ForeignKey("usuarios.id"), default=1, nullable=False)
  data = db.Column(db.DateTime, nullable=False)
  origem = db.Column(db.String, nullable=False)
  destino = db.Column(db.String, nullable=False)
  horario_partida = db.Column(db.DateTime, nullable=False)
  horario_chegada = db.Column(db.DateTime, nullable=True)
  duracao_media = db.Column(db.Integer, nullable=True)
  pago_inteira = db.Column(db.Integer, nullable=False, default=0)
  pago_meia = db.Column(db.Integer, nullable=False, default=0)
  gratuidade = db.Column(db.Integer, nullable=False, default=0)
  assentos_disponiveis = db.Column(db.Integer, nullable=False)
  criado_em = db.Column(db.DateTime, default=datetime.now(tz=timezone.utc), nullable=False)
  atualizado_em = db.Column(db.DateTime, nullable=True)

  linha = db.relationship("LinhaModel", back_populates="viagens")
  sentido = db.relationship("SentidoModel", back_populates="viagens")
  reservas = db.relationship("ReservaModel", back_populates="viagem", cascade="all, delete")
  motorista = db.relationship("UsuarioModel", back_populates="viagens")