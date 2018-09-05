from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from config import active as conf
from src import menu_engine as me
from src import testing_purposes as test


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


@app.route('/api/menu', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def route_menu():
	
	return jsonify(me.get_menu(conf))


@app.route('/api/items', methods=['GET'])
def route_dishes():

	return jsonify(me.get_all_dishes(conf))


@app.route('/api/test', methods=['GET'])
def route_test():
	
	x = int(request.args.get('x'))
	y = int(request.args.get('y'))
	return jsonify(test.add_numbers(x, y))
	
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)
