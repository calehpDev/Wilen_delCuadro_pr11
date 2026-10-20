import mysql.connector
from app.config import Config

def obtener_conexion():
    return mysql.connector.connect(
        host=getattr(Config, 'DB_HOST', "mysql-25318457-vallegrande-1aec.j.aivencloud.com"),
        port=int(getattr(Config, 'DB_PORT', 26610)),
        user=getattr(Config, 'DB_USER', "avnadmin"),
        password=getattr(Config, 'DB_PASSWORD', " "),
        database=getattr(Config, 'DB_NAME', "user_system"),
        ssl_ca=getattr(Config, 'DB_SSL_CA', 'ca.pem'),
        connect_timeout=10
    )

def guardar_contacto(nombre, email, telefono, producto, tipo_comprador, mensaje):
    conn = obtener_conexion()
    cursor = conn.cursor()
    

    query = """
        INSERT INTO users (name, email, phone, product, buyer_type, message, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, NOW())
    """
    
    valores = (nombre, email, telefono, producto, tipo_comprador, mensaje)
    
    cursor.execute(query, valores)
    conn.commit()
    
    cursor.close()
    conn.close()