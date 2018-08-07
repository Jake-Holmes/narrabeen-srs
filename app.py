from flask import Flask, request, jsonify
from config import development as conf
from src import menu_engine as me

app = Flask(__name__)
app.debug = True

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
def route_menu():

	return jsonify(me.get_menu(conf))
	
@app.route('/api/items', methods=['GET'])
def route_dishes():
	
	return jsonify(me.get_all_dishes(conf))

if __name__ == "__main__":
	app.run()
