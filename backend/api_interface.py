from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from src import menu_engine, order_engine, user_engine, table_engine
from src import reservation as ReservationFacade
import mock_data

app = Flask(__name__)
app.debug = True
app.config['CORS_HEADERS'] = 'Content-Type'


###----------ORDERS----------###
@app.route('/order', methods=['GET'])
def route_get_order():
    response_body, response_code = order_engine.get_order(request)
    return jsonify(response_body), response_code

    
@app.route('/order', methods=['PUT'])
def route_edit_order():
    response_body, response_code = order_engine.edit_order(request)
    return jsonify(response_body), response_code


@app.route('/order/all', methods=['GET'])
def route_get_all_order():
    response_body, response_code = order_engine.get_all_orders(request)
    return jsonify(response_body), response_code

@app.route('/order/items/all', methods=['GET'])
def route_get_all_order_items():
    response_body, response_code = order_engine.get_all_order_items(request)
    return jsonify(response_body), response_code

###----------MENU----------###
@app.route('/menu', methods=['POST'])
def route_add_menu_item():
    response_body, response_code = menu_engine.add_menu_item(request)
    return jsonify(response_body), response_code


@app.route('/menu', methods=['GET'])
def route_get_menu_item():
    response_body, response_code = menu_engine.get_menu_item(request)
    return jsonify(response_body), response_code


@app.route('/menu', methods=['PUT'])
def route_edit_menu_item():
    response_body, response_code = menu_engine.edit_menu_item(request)
    return jsonify(response_body), response_code


@app.route('/menu/all', methods=['GET'])
def route_get_all_menu_items():
    response_body, response_code = menu_engine.get_all_menu_items(request)
    return jsonify(response_body), response_code


###----------USER----------###
@app.route('/user/all', methods=['GET'])
def get_all_users():
    response_body, response_code = user_engine.get_all_users(request)
    return jsonify(response_body), response_code


@app.route('/user', methods=['POST'])
def add_user():
    response_body, response_code = user_engine.add_user(request)
    return jsonify(response_body), response_code

###----------TABLE----------###
@app.route('/table', methods=['POST'])
def add_table():
    response_body, response_code = table_engine.add_table(request)
    return jsonify(response_body), response_code

@app.route('/table/all', methods=['GET'])
def get_all_tables():
    response_body, response_code = table_engine.get_all_tables(request)
    return jsonify(response_body), response_code

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
