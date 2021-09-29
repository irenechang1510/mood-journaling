import flask
from flask import Flask, jsonify, request, render_template, url_for
import json
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
    timestamp = db.Column(db.DateTime)
    results = db.Column(db.Float)

@app.route('/', methods=['GET'])
def main():
    table = Mood.query.with_entities(Mood.results).all()
    table = [r for r, in table]
    return render_template('main.html', results =table)

if __name__ == '__main__':
    app.run(debug=True)

# @app.route('/', methods=['GET', 'POST'])
# def main():
# #     if flask.request.method == 'GET':
# #         return(render_template('main.html'))
# # def testdb():
#     try:
#         db.session.query(text('1')).from_statement(text('SELECT 1')).all()
#         return '<h1>It works.</h1>'
#     except Exception as e:
#         error_text = "<p>The error:<br>" + str(e) + "</p>"
#         hed = '<h1>Something is broken.</h1>'
#         return hed + error_text