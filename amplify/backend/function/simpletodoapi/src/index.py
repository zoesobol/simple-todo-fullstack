import json


def handler(event, context):
    body = {
        "message": "If at first you don't succeed, try, try again."
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    return response
