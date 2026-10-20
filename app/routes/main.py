from flask import render_template, request, jsonify
from app.database import guardar_contacto

def register_routes(app):

    @app.route('/')
    def inicio():
        return render_template('inicio/index.html')

    @app.route('/productos')
    def productos():
        return render_template('clientes/productos.html')

    @app.route('/nosotros')
    def nosotros():
        return render_template('nosotros/nosotros.html')

    @app.route('/contacto', methods=['GET', 'POST'])
    def contacto():
        if request.method == 'POST':
            data = request.get_json()

            nombre = data.get('nombre')
            email = data.get('correo')
            telefono = data.get('telefono')
            producto = data.get('producto')
            tipo_comprador = data.get('comprador')
            mensaje = data.get('mensaje')

            try:
                guardar_contacto(nombre, email, telefono, producto, tipo_comprador, mensaje)
                return jsonify({"status": "success", "message": "Consulta registrada correctamente"}), 200
            except Exception as e:
                print(f"Error al guardar registro: {e}")
                return jsonify({"status": "error", "message": "Ocurrió un error al registrar los datos"}), 500

        return render_template('contacto/contacto.html')