import flask
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
import pickle

with open('models/deploy_model.sav', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__, template_folder='templates')
db_name = 'schema.sql'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Mood(db.Model):
    __tablename__ = 'result'
    index = db.Column(db.Integer, primary_key=True)
    results = db.Column(db.Float)

@app.route('/', methods=['GET'])
def main():
    table = Mood.query.with_entities(Mood.results).all()
    table = [r for r, in table]
    print(table) # show results in build log
    return render_template('main.html', results =table)

if __name__ == '__main__':
    app.run(debug=True)
