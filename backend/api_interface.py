from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from src import menu_engine as me
from db.schemas.user import User, UserSchema
from base import session_factory
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


@app.route('/api/users', methods=['GET'])
def get_user():
	session = session_factory()
	user_objects = session.query(User).all()
	schema = UserSchema(many=True)
	users = schema.dump(user_objects)[0]
	session.close()
	return jsonify(users)


@app.route('/api/users', methods=['POST'])
def add_user():

	try:
		user_data = request.get_json()
		schema = UserSchema()
		user = schema.load(user_data)[0]
	except:
		return jsonify("Error: Failed to decode user object"), 422

	session = session_factory() # Open db session
	session.add(user) # Add user row
	session.commit() # Commit changes

	new_user = schema.dump(user).data # Return created user

	session.close() # Close session
	return jsonify(new_user), 201


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


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)