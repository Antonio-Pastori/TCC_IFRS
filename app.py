from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config['MONGO_URI'] = "mongodb+srv://usuario:UsuarioPlantVitae@plantvitae.ecf84x6.mongodb.net/PlantVitae?retryWrites=true&w=majority"

mongo = PyMongo(app)

from Py.routes import *


if __name__ == "__main__":
    app.run(debug=False)






