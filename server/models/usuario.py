from db import db
from datetime import datetime, timezone

class UsuarioModel(db.Model):
  __tablename__ = "usuarios"

  id = db.Column(db.Integer, primary_key=True)
  nome_usuario = db.Column(db.String(25), unique=True, nullable=False)
  nome = db.Column(db.String, nullable=False)
  sobrenome = db.Column(db.String, nullable=False)
  senha = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  motorista = db.Column(db.Integer, default=0, nullable=False)
  admin = db.Column(db.Integer, default=0, nullable=False)
  criado_em = db.Column(db.DateTime, default=datetime.now(tz=timezone.utc), nullable=False)
  atualizado_em = db.Column(db.DateTime, nullable=True)

  reservas = db.relationship("ReservaModel", back_populates="usuario", cascade="all, delete")
  viagens = db.relationship("ViagemModel", back_populates="motorista", cascade="all, delete")