from flask_pymongo import PyMongo
from flask import render_template, request, make_response
from run import app


def plantas_por_categoria(categoria):
    mongo = PyMongo(app)
    if mongo.db:
        # Atribui sua coleção a uma variável
        sua_colecao = mongo.db.Plantus

        # Exemplo: Busca todas as plantas na coleção com a categoria fornecida
        plantas = sua_colecao.find({"Categoria": categoria})
        
        plantas_info = {}

        for planta in plantas:
            nome = planta['Nome']
            imagem = planta.get('Imagem', '')  # Supondo que o campo seja chamado 'Imagem'
            
            id_imagem = extrair_id_do_link(imagem)
            
            Link_Novo = criar_novo_link(id_imagem)

            plantas_info[nome] = {'Imagem': Link_Novo}
        # Retorna as plantas para um template HTML
        return {"Categoria": categoria, "Infos_Plantas": plantas_info}
    else:
        return "Erro: Não foi possível conectar ao banco de dados."
    
def extrair_id_do_link(imagem):
    partes_link = imagem.split('/')
    id_imagem = partes_link[-2]  # A ID está na penúltima parte
    return id_imagem

def criar_novo_link(id_imagem):
    
    return f'https://drive.google.com/uc?id={id_imagem}'

