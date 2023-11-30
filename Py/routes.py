from Py.functions import *
from app import app
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import json




@app.route('/')
def index():
    return render_template("index.html")

@app.route('/redirecionar')
def redirecionar():
    return redirect(url_for('Home'))

@app.route('/Home')
def Home():
    return render_template('Home.html')

@app.route('/categorias/<categoria>')
def buscar_plantas_por_categoria(categoria):
    try:
        dados_plantas = plantas_por_categoria(categoria)
        return render_template("ListaPlantas.html",  Infos_Plantas_Categoria=dados_plantas, categoria=dados_plantas["Categoria"])
    except Exception as e:
        print(f"Erro: {str(e)}")
    return "Erro interno do servidor", 500


@app.route("/api/planta/<id>")
def Buscar_Infos_da_Planta(id):
        Infos_da_Planta = Planta_Por_Nome(id)
        if Infos_da_Planta:
            return jsonify(Infos_da_Planta)
        else:
            return jsonify({'mensagem': 'Planta não encontrada'}), 404


@app.route("/planta/<id>")
def renderizar_pagina_da_planta(id):
     # Obtém os parâmetros de consulta
    infos_json_str = request.args.get('infos', '{}')

    # Converte a string JSON para um objeto Python
    planta_info = json.loads(infos_json_str)

    return render_template('Planta.html', Infos_da_Planta_json=planta_info, id=id)

@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('termo')

    search_results = perform_search(search_term)

    # Retorna os resultados como JSON
    return search_results