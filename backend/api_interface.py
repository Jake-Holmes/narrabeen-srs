from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from src import menu_engine as me
from src import user as UserFacade
from src import order as OrderFacade
import mock_data

app = Flask(__name__)
app.debug = True
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def root():
	# Dev method. If this is a static file, it is always best served via a web server.
	# Full implementation will not use the flask interface to serve web pages
	try:
		with open('web/index.html', 'r') as f:
			webpage = f.read()
	except:
		webpage = "File Error."
		
	return webpage


@app.route('/api/menu/all', methods=['GET'])
def route_dishes():
	return jsonify(mock_data.menu_item)
	#return jsonify(me.get_all_dishes())


@app.route('/api/menu/active', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def route_menu():
	response = []
	for item in mock_data.menu_item:
		if item['status'] == 'active':
			response.append(item)

	return jsonify(response)
	#return jsonify(me.get_menu())


@app.route('/api/menu/dish', methods=['GET'])
def route_item():
	for item in mock_data.menu_item:
		if item['id'] == int(request.args.get('id')):
			return jsonify(item)

	return jsonify("Does not exist"), 400
	#return jsonify(me.get_by_itemid(request.args.get('id')))


@app.route('/api/menu/add', methods=['GET'])
def add_item():
	item = {
		"id": int(request.args.get('id')),
		"name": request.args.get('name'),
		"type": request.args.get('type'),
		"description": request.args.get('desc'),
		"image": request.args.get('img'),
		"base_price": float(request.args.get('base')),
		"status": request.args.get('stat')
	}

	mock_data.menu_item.append(item)
	return jsonify(mock_data.menu_item)


@app.route('/api/menu/remove', methods=['GET'])
def remove_item():
	for item in mock_data.menu_item:
		if item['id'] == int(request.args.get('id')):
			mock_data.menu_item.remove(item)
			return jsonify(mock_data.menu_item)

	return jsonify("Does not exist"), 400


@app.route('/api/users', methods=['GET'])
def get_user():
	return UserFacade.get_users(request)


@app.route('/api/users', methods=['POST'])
def add_user():
	return UserFacade.add_user(request)


@app.route('/api/orders', methods=['GET'])
def get_orders():
	return OrderFacade.get_orders(request)


@app.route('/api/orders/<orderId>', methods=['GET'])
def get_order(orderId):
	return OrderFacade.get_order(request, orderId)


@app.route('/api/orders/admin', methods=['GET'])
def get_orders_admin():
	return(jsonify(mock_data.orders_data)), 200


@app.route('/api/orderitems', methods=['GET'])
def get_order_items():
	return(jsonify(mock_data.order_items_data)), 200


@app.route('/api/orders/kitchen', methods=['GET'])
def get_orders_kitchen():
	return(jsonify(mock_data.order_kitchen_data)), 200


@app.route('/api/orders/ready', methods=['GET'])
def get_orders_ready():
	return(jsonify(mock_data.order_ready_data)), 200

@app.route('/api/example/<path_param>', methods=['GET','POST','PUT','DELETE'])
def example_route(path_param):
	# Make the call http://0.0.0.0:5000/api/example/recipes?query_param_1=soup&query_param_2=tasty
	#
	# query_param_1 and query_param_2 are passed as 'query strings'
	# query strings are used to 'query' a resource
	#
	# 'recipes' is a path parameter (passed as a method parameter of the route)
	# path parameters are used to represent resources and subresources, like a file system
	# e.g. '/Documents/users.csv' resembles '/api/users'

	query_param_1 = request.args.get("query_param_1", None) # where None is the default value
	query_param_2 = request.args.get("query_param_2", None)
	return(jsonify([query_param_1, query_param_2, path_param]), 200)

#all reservations
@app.route('/api/reservations', methods=['GET'])
def get_reservations_all():
	return(jsonify(mock_data.reservation_data)), 200



if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)