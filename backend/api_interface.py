from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from src import menu_engine, order_engine
from src import user as UserFacade
from src import order as OrderFacade
from src import reservation as ReservationFacade
import mock_data

app = Flask(__name__)
app.debug = True
app.config['CORS_HEADERS'] = 'Content-Type'


###----------ORDERS----------###
@app.route('/order', methods=['GET'])
def route_get_order():
        response_body, response_code = order_engine.get_order(request.form)
        return jsonify(response_body), response_code

        
@app.route('/order', methods=['PUT'])
def route_edit_order():
        response_body, response_code = order_engine.edit_order(request.form)
        return jsonify(response_body), response_code


@app.route('/order/all', methods=['GET'])
def route_get_all_order():
        response_body, response_code = order_engine.get_all_orders(request.form)
        return jsonify(response_body), response_code


###----------MENU----------###
@app.route('/menu', methods=['POST'])
def route_set_menu():
        response_body, response_code = menu_engine.set_menu(request.form)
        return jsonify(response_body), response_code


@app.route('/menu', methods=['GET'])
def route_get_menu_item():
        response_body, response_code = menu_engine.get_menu_item(request.form)
        return jsonify(response_body), response_code


@app.route('/menu', methods=['PUT'])
def route_edit_menu_item():
        response_body, response_code = menu_engine.edit_menu_item(request.form)
        return jsonify(response_body), response_code


@app.route('/menu/all', methods=['GET'])
def route_get_all_menu():
        response_body, response_code = menu_engine.get_all_menu(request.form)
        return jsonify(response_body), response_code


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)
