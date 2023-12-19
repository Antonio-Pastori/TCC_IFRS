from flask_pymongo import PyMongo
from flask import jsonify
from run import app
import random

def plantas_por_categoria(categoria):
    mongo = PyMongo(app)
    if mongo.db is not None:

        sua_colecao = mongo.db.Plantus

        
        plantas = sua_colecao.find({"Categoria": categoria})
        
        plantas_info = {}

        for planta in plantas:
            nome = planta['Nome']
            imagem = planta.get('Imagem', '')  
            
            id_imagem = extrair_id_do_link(imagem)
            
            Link_Novo = criar_novo_link(id_imagem)

            plantas_info[nome] = {'Imagem': Link_Novo}
        
        return {"Categoria": categoria, "Infos_Plantas": plantas_info}
    else:
        return "Erro: Não foi possível conectar ao banco de dados."
    
def extrair_id_do_link(imagem):
    partes_link = imagem.split('/')
    id_imagem = partes_link[-2]  
    return id_imagem

def criar_novo_link(id_imagem):
    
    return f'https://drive.google.com/uc?id={id_imagem}'


def Planta_Por_Nome(id):
    mongo = PyMongo(app)
    if mongo.db is not None:
        sua_colecao = mongo.db.Plantus

        planta = sua_colecao.find_one({"Nome": id})
        
        id_imagem = extrair_id_do_link(planta['Imagem'])
        
        
        if planta:
            planta_info = {
                'Nome': planta['Nome'],
                'NomeCientifico': planta['Nome Científico'],
                'Cuidados': planta['Cuidados'],
                'Dificuldade': planta['Dificuldade'],
                'Luz': planta['Luz'],
                'Solo': planta['Solo'],
                'Ambiente': planta['Ambiente'],
                'Imagem': criar_novo_link(id_imagem),
                'Categoria': planta['Categoria'],
                'Doencas': planta['Doenças']
            }

            return planta_info
        else:
            return jsonify({'mensagem': 'Planta não encontrada'}), 404


def perform_search(search_term):
    mongo = PyMongo(app)
    if mongo.db is not None:
      
        plantas = mongo.db.Plantus
        
    if search_term and search_term.strip():
        results = plantas.find({'Nome': {'$regex': f'^{search_term}', '$options': 'i'}})
        result_list = list(results)
        return jsonify(result_list)
    else:
        return jsonify({'message': 'Digite o Nome da Planta!'})

        
def Quantidade_Plantas():
    mongo = PyMongo(app)
    if mongo.db is not None:
        plantas = mongo.db.Plantus

        todas_as_plantas = plantas.count_documents({"_id": {"$nin": [0, 1]}})

    return todas_as_plantas

def Sortear_Planta(total):
    mongo = PyMongo(app)
    if mongo.db is not None:
        plantas = mongo.db.Plantus
        id_sorteado = random.randint(2, total)
        Planta_Sorteada = plantas.find_one({"_id": str(id_sorteado)})
        id_imagem = extrair_id_do_link(Planta_Sorteada['Imagem'])
        if Planta_Sorteada:
             Sugestao_Planta = {
                'Nome': Planta_Sorteada['Nome'],
                'Imagem': criar_novo_link(id_imagem)
             }
    return Sugestao_Planta



            
    


