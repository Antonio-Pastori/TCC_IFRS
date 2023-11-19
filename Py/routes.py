from Py.functions import *
from app import app
from flask import render_template, redirect, url_for

from flask import Flask
from flask_pymongo import PyMongo

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
        print(dados_plantas)
        return render_template("ListaPlantas.html",  Infos_Plantas_Categoria=dados_plantas, categoria=dados_plantas["Categoria"])
    except Exception as e:
        print(f"Erro: {str(e)}")
    return "Erro interno do servidor", 500

