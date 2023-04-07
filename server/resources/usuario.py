from flask import request as req
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

import bcrypt
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, create_refresh_token, get_jwt_identity

from datetime import datetime, timezone

from db import db
from models import UsuarioModel
from schemas import UsuarioSchema, PlainUsuarioSchema, AuthSchema, ClienteSchema

from blocklist import BLOCKLIST

blp = Blueprint("Usuarios", __name__, description="Operações com usuários.")

salt = bcrypt.gensalt()

@blp.route('/usuario')
class Usuario(MethodView):
  @jwt_required()
  @blp.response(200, UsuarioSchema)
  def get(self):
    usuario_id = get_jwt_identity() 
    usuario = UsuarioModel.query.get_or_404(usuario_id)

    return usuario
  
  @blp.arguments(PlainUsuarioSchema)
  @blp.response(201, UsuarioSchema)
  def post(self, usuario_data):
    bytePassword = usuario_data['senha'].encode('utf-8')
    hashPassword = bcrypt.hashpw(bytePassword, salt)

    usuario_data["senha"] = hashPassword.decode('utf-8')

    usuario = UsuarioModel(**usuario_data)

    try:
      db.session.add(usuario)
      db.session.commit()
    except SQLAlchemyError:
      abort(500, "An error ocurred while inserting item to table 'usuario'.")

    return usuario
  
  @jwt_required()
  @blp.arguments(PlainUsuarioSchema)
  @blp.response(200)
  def put(self, usuario_data):
    admin = get_jwt()["admin"]
    self_user = get_jwt_identity()

    usuario_id = req.args.get('id')

    usuario = UsuarioModel.query.get_or_404(usuario_id)

    if not admin:
      if usuario.id == self_user:
        usuario.nome_usuario = usuario_data['nome_usuario']
        usuario.nome = usuario_data['nome']
        usuario.sobrenome = usuario_data['sobrenome']
        usuario.email = usuario_data['email']
        usuario.atualizado_em = datetime.now(tz=timezone.utc)
      else: abort(403, "Error trying to update: You can't update an user that isn't you.")
    
    if admin:
      usuario.nome_usuario = usuario_data['nome_usuario']
      usuario.nome = usuario_data['nome']
      usuario.sobrenome = usuario_data['sobrenome']
      usuario.email = usuario_data['email']
      usuario.admin = usuario_data['admin']
      usuario.motorista = usuario_data['motorista']
      usuario.atualizado_em = datetime.now(tz=timezone.utc)

    try:
      db.session.add(usuario)
      db.session.commit()
    except SQLAlchemyError:
      abort(500, "An error ocurred while updating item in table 'usuarios'.")
    
    return {"message": "User updated."}
  
  @jwt_required()
  @blp.arguments(PlainUsuarioSchema)
  @blp.response(200)
  def delete(self, id):
    admin = get_jwt()["admin"]
    self_user = get_jwt_identity()

    usuario_id = req.args.get('id')

    usuario = UsuarioModel.query.get_or_404(usuario_id)

    if not admin:
      if usuario.id == self_user:
        try:
          db.session.delete(usuario)
          db.session.commit()
        except SQLAlchemyError: abort(500, "An error ocurred while deleting item in table 'usuarios'.")
      else: abort(403, "Error trying to delete: You can't delete an user that isn't you.")
    
    if admin:
      try:
        db.session.delete(usuario)
        db.session.commit()
      except SQLAlchemyError: abort(500, "An error ocurred while deleting item in table 'usuarios'.")
    
    return {"message": "User delete."}


@blp.route('/me')
class UsuarioCliente(MethodView):
  @jwt_required()
  @blp.response(200, ClienteSchema)
  def get(self):
    usuario_id = get_jwt_identity() 
    usuario = UsuarioModel.query.get_or_404(usuario_id)

    return usuario


@blp.route('/logout')
class UsuarioLogout(MethodView):
  @jwt_required()
  def post(self):
    jti = get_jwt()["jti"]
    BLOCKLIST.add(jti)

    return {"message": "Successfully logged out."}


@blp.route('/refresh')
class TokenRefresh(MethodView):
  @jwt_required(refresh=True)
  def post(self):
    usuario_atual = get_jwt_identity()
    new_token = create_access_token(identity=usuario_atual, fresh=False)

    jti = get_jwt()["jti"]
    BLOCKLIST.add(jti)

    return {"token": new_token}


@blp.route('/auth')
class UsuarioAuth(MethodView):
  @blp.arguments(AuthSchema)
  def post(self, usuario_data):
    usuario = UsuarioModel.query.filter(
      (UsuarioModel.nome_usuario == usuario_data["identificador"]) |
      (UsuarioModel.email == usuario_data["identificador"])
    ).first()

    if not usuario:
      abort(404, "Usuário não encontrado.")

    if usuario and bcrypt.checkpw(usuario_data["senha"].encode('utf8'), usuario.senha.encode('utf-8')):
      token = create_access_token(identity=usuario.id, fresh=True)
      refresh_token = create_refresh_token(identity=usuario.id)
      return {"token": token, "refresh_token": refresh_token}
    
    abort(401, "Não foi possível autenticar-se. Verifique se as suas credenciais estão corretas.")