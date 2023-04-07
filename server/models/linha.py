from db import db
from datetime import datetime, timezone

class LinhaModel(db.Model):
  __tablename__ = "linhas"
  __searchable__ = ['cod', 'nome', 'campus', 'tipo', 'tags']

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  cod = db.Column(db.String(3), nullable=False)
  nome = db.Column(db.String, nullable=False)
  campus = db.Column(db.String, nullable=False)
  valor_inteira = db.Column(db.Float(precision=2), nullable=False)
  valor_meia = db.Column(db.Float(precision=2), nullable=False)
  tipo = db.Column(db.String(20), nullable=False)
  capacidade_assento = db.Column(db.Integer, nullable=False)
  criado_em = db.Column(db.DateTime, default=datetime.now(tz=timezone.utc), nullable=False)
  atualizado_em = db.Column(db.DateTime, nullable=True)
  tags = db.Column(db.String, nullable=True)

  paradas = db.relationship("ParadaModel", back_populates="linha", cascade="all, delete")
  viagens = db.relationship("ViagemModel", back_populates="linha", cascade="all, delete")
  sentidos = db.relationship("SentidoModel", back_populates="linha", cascade="all, delete")