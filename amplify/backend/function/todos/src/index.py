import json
import awsgi
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

# Constant variable with path prefix
BASE_ROUTE = "/simpletodoapi"


@app.route(BASE_ROUTE, methods=['GET'])
def list_todos():
    return jsonify(message="hello world from list_todos()")


def handler(event, context):
    return awsgi.response(app, event, context)
