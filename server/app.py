import os

from db import db

from flask import Flask, jsonify
from flask_smorest import Api
from flask_msearch import Search
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import openai

from models import UsuarioModel

from resources.linha import blp as LinhaBlueprint
from resources.parada import blp as ParadaBlueprint
from resources.reserva import blp as ReservaBlueprint
from resources.sentido import blp as SentidoBlueprint
from resources.usuario import blp as UsuarioBlueprint
from resources.viagem import blp as ViagemBlueprint

from datetime import timedelta

from blocklist import BLOCKLIST

def create_app(db_url=None):
  app = Flask(__name__)

  app.config['PROPAGATE_EXCEPTIONS'] = True

  app.config['API_TITLE'] = "Moovooca API - Python Flask"
  app.config['API_VERSION'] = "v1"

  app.config["OPENAPI_VERSION"] = "3.0.3"
  app.config["OPENAPI_URL_PREFIX"] = "/"
  app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
  app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

  app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL", "sqlite:///data.db")
  app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

  app.config['MSEARCH_INDEX_NAME'] = os.path.join(app.root_path, 'msearch')
  app.config['MSEARCH_PRIMARY_KEY'] = 'id'
  app.config['MSEARCH_ENABLE'] = True

  app.config['CORS_HEADERS'] = 'Content-Type'

  app.config["JWT_COOKIE_SECURE"] = True
  app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")
  app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)

  openai.api_key = os.getenv('OPENAI_API_KEY')
  
  db.init_app(app)

  api = Api(app)
  search = Search(app)
  cors = CORS(app)
  
  search.init_app(app)

  jwt = JWTManager(app)

  @jwt.token_in_blocklist_loader
  def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST
  
  @jwt.revoked_token_loader
  def revoked_token_callback(jwt_header, jwt_payload):
    return(
      jsonify(
        {"description": "The token has been revoked.", "error": "token_revoked"}
      ), 401
    )

  @jwt.additional_claims_loader
  def add_claims_to_jwt(identity):
    claims = {}
    usuario = UsuarioModel.query.filter(UsuarioModel.id == identity).first()
    
    if usuario.admin == 0: claims["admin"] = False
    else: claims["admin"] = True

    if usuario.motorista == 0: claims["motorista"] = False
    else: claims["motorista"] = True

    return claims

  @jwt.expired_token_loader
  def expired_token_callback(jwt_header, jwt_payload):
    return(
      jsonify({"message": "The token has expired.", "error": "token_expired"}),
      401
    )
  
  @jwt.invalid_token_loader
  def invalid_token_callback(error):
    return(
      jsonify({"message": "Signature verification invalid.", "error": "invalid_token"}),
      401
    )
  
  @jwt.unauthorized_loader
  def missing_token_callback(error):
    return(
      jsonify({"message": "Request does not contain an access token.",  "error": "authorization_required"}),
      401
    )
  
  @jwt.needs_fresh_token_loader
  def token_not_fresh_callback(jwt_header, jwt_payload):
    return(
      jsonify({
        "description": "The token is not fresh.",
        "error": "fresh_token_required"
      }), 401
    )

  @app.before_first_request
  def create_tables():
    db.create_all()

  api.register_blueprint(LinhaBlueprint)
  api.register_blueprint(ParadaBlueprint)
  api.register_blueprint(ReservaBlueprint)
  api.register_blueprint(SentidoBlueprint)
  api.register_blueprint(UsuarioBlueprint)
  api.register_blueprint(ViagemBlueprint)

  return app

app = create_app()

if __name__ == '__main__':
  app.run(debug=True, host="0.0.0.0")