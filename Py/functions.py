from flask_pymongo import PyMongo
from flask import jsonify
from run import app


def plantas_por_categoria(categoria):
    mongo = PyMongo(app)
    if mongo.db is not None:

        
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


def Planta_Por_Nome(id):
    mongo = PyMongo(app)
    if mongo.db is not None:
        # Atribui sua coleção a uma variável
        sua_colecao = mongo.db.Plantus

        # Exemplo: Busca todas as plantas na coleção com a categoria fornecida
        planta = sua_colecao.find_one({"Nome": id})
        
        id_imagem = extrair_id_do_link(planta['Imagem'])
        
        
        if planta:
            # Cria um dicionário com as informações da planta
            planta_info = {
                'Nome': planta['Nome'],
                'NomeCientifico': planta['Nome Científico'],
                'Cuidados': planta['Cuidados'],
                'Dificuldade': planta['Dificuldade'],
                'Luz': planta['Luz'],
                'Solo': planta['Solo'],
                'Ambiente': planta['Ambiente'],
                'Imagem': criar_novo_link(id_imagem),
                'Categoria': planta['Categoria']
            }

            # Converte o dicionário para JSON e retorna para o frontend
            return planta_info
        else:
            return jsonify({'mensagem': 'Planta não encontrada'}), 404


def perform_search(search_term):
    mongo = PyMongo(app)
    if mongo.db is not None:
      
        plantas = mongo.db.Plantus
        
    if search_term and search_term.strip():
        # Realiza a pesquisa no MongoDB
        results = plantas.find({'Nome': {'$regex': f'^{search_term}', '$options': 'i'}})

        # Converte os resultados para uma lista e os envia como JSON
        result_list = list(results)
        return jsonify(result_list)
    else:
        # Se o termo de pesquisa estiver vazio, retorna uma mensagem ou algo apropriado
        return jsonify({'message': 'Digite o Nome da Planta!'})

        
        

