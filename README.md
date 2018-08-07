# Narrabeen-SRS

0. How to Run

	From the project root directory, run the command "python3 app.py". You can then visit localhost:5000/ on a web browser and access the URL endpoints e.g. localhost:5000/api/menu. 
	
	This however is for development purposes only! The flask built in dev server is not produciton capable and is not fully featured. It is however very useful for development purposes. You can leave the server running and it will auto update any changes you make to the python files as you go (Assuming no unhandled exceptions are raised).

1. Dependencies

	Any version of Python 3.x.x should be fine. Initial dev has been done using Python 3.5.2.
	
	Non-native python libraries listed below will also be needed. These can be installed using python3-pip (aka pip3) and running the command "pip3 install module" on a linux system. Alternatively you may choose to use a python virtual environment. If you are unsure how to do these on your OS of choice, google is your friend.
	
	Third party Python libraries used (Please update if you add more):
	* flask
 
2. Overview

	This is the smart restaurant system backend for all API and database functionality.

	Version 0.0.1-dev:
	* Includes a static web page being served but this is purely for development purposes. The final project will NOT be serving webpages through Python/flask.
	* This version also includes a development server. The full production server will now be the flask built in server.
	* A simple verison of getting the API menu and getting all possible dishes has been implemented.


3. Directory Structure

	./app.py
		This is the first piece of python code to touch a user request in the workflow and is passed a request from the server implementation. It has three key roles; to ensure that the HTTP request is valid, to route the request to the correct engine module, and to return the appropriate response to the request (HTTP response code, data encoding, etc.). This is the interface to the backend logic, but does NOT implement the logic itself.

	/config
		Contains Python files with various static configuration values including db access, strings or any other configuration variables used throughout the project. Initial configs are development, staging and production. Feel free to create your own configurations for testing purposes. To implement a new config, edit the app.py file to import your config on line 2 using "from config import configfile as conf where configfile is the name of your desired configuration.py file.
	
	/db
		Directory holding the SQLite3 database and any other directly related files.
	
	/logs
		Directory for any log files to be held/written.
	
	/src
		Contains the backend logic and implementations. File types are split into two types, x_engine.py and x_access.py where x_engine.py is the module that will implement any and all backend logic related to a particuar call and is what gets used by app.py to return the API call results. x_access.py is the module used by its relates engine module to pull any data required from the database. 
		
		The simplified flow of backend logic goes: 
		Server(Sends request)-->app.py(Handle+route request)-->x_engine.py(Enforce logic)-->x_access.py(Query db)-->db
	
	/web


4. Code Style and Standards

	When in doubt, use https://www.python.org/dev/peps/pep-0008/as a reference for the code style guide.