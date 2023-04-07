from db import db
from datetime import datetime, timezone

class SentidoModel(db.Model):
  __tablename__ = "sentidos"

  id = db.Column(db.Integer, primary_key=True)
  id_linha = db.Column(db.Integer, db.ForeignKey("linhas.id"), nullable=False)
  sentido = db.Column(db.String, nullable=False)
  ponto_partida = db.Column(db.String, nullable=False)
  ponto_destino = db.Column(db.String, nullable=False)
  horario_inicio = db.Column(db.String, nullable=False)
  horario_fim = db.Column(db.String, nullable=False)
  criado_em = db.Column(db.DateTime, default=datetime.now(tz=timezone.utc),nullable=False)
  atualizado_em = db.Column(db.DateTime, nullable=True)

  linha = db.relationship("LinhaModel", back_populates="sentidos")
  paradas = db.relationship("ParadaModel", back_populates="sentido", cascade="all, delete")
  viagens = db.relationship("ViagemModel", back_populates="sentido", cascade="all, delete")