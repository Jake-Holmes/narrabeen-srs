from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from src import menu_engine, order_engine, user_engine, table_engine, reservation_engine, customer_engine
import mock_data

app = Flask(__name__)
app.debug = True
CORS(app)


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

@app.route('/order/items', methods=['PUT'])
def route_edit_order_status():
    response_body, response_code = order_engine.edit_order_status(request)
    return jsonify(response_body), response_code

@app.route('/order/items/all', methods=['GET'])
def route_get_all_order_items():
    response_body, response_code = order_engine.get_all_order_items(request)
    return jsonify(response_body), response_code

@app.route('/order/table', methods=['POST'])
def route_add_table_order():
    response_body, response_code = order_engine.add_table_order(request)
    return jsonify(response_body), response_code

@app.route('/order/table/bill', methods=['GET'])
def route_get_table_bill():
    response_body, response_code = order_engine.get_table_bill(request)
    return jsonify(response_body), response_code

@app.route('/order/table/bill', methods=['POST'])
def route_pay_table_bill():
    response_body, response_code = order_engine.pay_table_bill(request)
    return jsonify(response_body), response_code

###----------MENU----------###
@app.route('/menu', methods=['POST'])
def route_add_menu_item():
    response_body, response_code = menu_engine.add_menu_item(request)
    return jsonify(response_body), response_code

@app.route('/menu', methods=['DELETE'])
def route_delete_menu_item():
    response_body, response_code = menu_engine.delete_menu_item(request)
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

@app.route('/table', methods=['GET'])
def get_table():
    response_body, response_code = table_engine.get_table(request)
    return jsonify(response_body), response_code

@app.route('/table/login', methods=['GET'])
def table_login():
    response_body, response_code = table_engine.table_login(request)
    return jsonify(response_body), response_code

@app.route('/table', methods=['PUT'])
def edit_table():
    response_body, response_code = table_engine.edit_table(request)
    return jsonify(response_body), response_code

###----------RESERVATION----------###
@app.route('/reservations/all', methods=['GET'])
def get_all_reservations():
    response_body, response_code = reservation_engine.get_all_reservations(request)
    return jsonify(response_body), response_code

@app.route('/reservations', methods=['GET'])
def get_reservation():
    response_body, response_code = reservation_engine.get_reservation(request)
    return jsonify(response_body), response_code

@app.route('/reservations/customer', methods=['GET'])
def get_customer_reservations():
    response_body, response_code = reservation_engine.get_available_reservations(request)
    return jsonify(response_body), response_code

@app.route('/reservations/customer', methods=['POST'])
def make_customer_reservations():
    response_body, response_code = reservation_engine.make_customer_reservations(request)
    return jsonify(response_body), response_code

###----------CUSTOMER----------###
@app.route('/customer', methods=['POST'])
def route_add_customer():
    response_body, response_code = customer_engine.add_customer(request)
    return jsonify(response_body), response_code

@app.route('/customer', methods=['GET'])
def route_get_customer():
    response_body, response_code = customer_engine.get_customer(request)
    return jsonify(response_body), response_code

@app.route('/customer/takeaway', methods=['GET'])
def route_get_takeaway_customer():
    response_body, response_code = customer_engine.get_takeaway_customer(request)
    return jsonify(response_body), response_code

@app.route('/customer/reservation', methods=['GET'])
def route_get_customer_reservation():
    response_body, response_code = customer_engine.get_customer_reservation(request)
    return jsonify(response_body), response_code

@app.route('/customer', methods=['PUT'])
def route_edit_customer():
    response_body, response_code = customer_engine.edit_customer(request)
    return jsonify(response_body), response_code

###----------IMAGES----------###
@app.route('/images/<path:path>', methods=['GET'])
def get_image(path):
    return send_from_directory('images', path)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
