from flask import Flask
from .config import Config
from .routes.main import register_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Registra las rutas directamente en la aplicación
    register_routes(app)

    return app