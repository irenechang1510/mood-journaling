import flask
from flask import Flask, request, render_template, url_for
from clock import run
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from flask_apscheduler import APScheduler
import pickle

with open('models/deploy_model.sav', 'rb') as f:
    model = pickle.load(f)

app = Flask(__name__, template_folder='templates')
scheduler = APScheduler()

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
    print(table)
    return render_template('main.html', results =table)

if __name__ == '__main__':
    scheduler.add_job(id = '123', func=run, trigger="cron", hour=23, minute=58, second=0)
    scheduler.start()
    app.run(debug=True)