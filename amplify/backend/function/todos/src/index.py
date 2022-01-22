import json
import awsgi
import boto3
import os

from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

app = Flask(__name__)
CORS(app)

client = boto3.client("dynamodb")
TABLE = os.environ.get("STORAGE_SIMPLETODOSTORAGE_NAME")

# Constant variable with path prefix
BASE_ROUTE = "/simpletodoapi"


@app.route(BASE_ROUTE, methods=['POST'])
def create_todo():
    request_json = request.get_json()
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'name': {'S': request_json.get("name")},
        'description': {'S': request_json.get("description")},
    })
    return jsonify(message="item created")


@app.route(BASE_ROUTE, methods=['GET'])
def list_todos():
    return jsonify(data=client.scan(TableName=TABLE))


def handler(event, context):
    return awsgi.response(app, event, context)
