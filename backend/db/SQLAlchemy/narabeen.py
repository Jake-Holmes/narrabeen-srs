#imported Flask class from the Flask library.
from flask import Flask

# import CRUD Operations 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, UserAcc, OrderDish, MenuDish, Table, Staff, Order
app = Flask(__name__)

# Create session and connect to DB
engine = create_engine('sqlite:///restaurantmenu.db')

# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
DBSession = sessionmaker(bind=engine)
session = DBSession()

#create an instance of this class with the name of the running application as the argument.
'''
Anytime we run an application in Python, a special variable called name gets defined for the application and all of the imports it uses.
The application run by the Python interpreter gets a name variable set to __main__ 
whereas all the other imported Python files get a double underscore, name double underscore variable set to the actual name of the Python file.
'''
app = Flask(__name__)

#decorator in Python essentially wraps our function inside the app.route function that Flask has already created.
#So if either of these routes get sent from the browser, the function that we define here gets executed.
'''
Just know that this @app.route piece of code will call the function that follows it whenever the web server receives a request with a URL that matches its argument.
So in this case, if we visit the root of my site at local host port 5000 or local host port 5000/narrabeen, the function Narrabeen will be invoked.
'''
@app.route('/')
@app.route('/narrabeen')

#Performingfollowing query to grab the menudishes out of my database.
#And list out all of the menu items and stored in a string called output.
#I'll also add a break line tag to make my output a bit easier to read.
#I will return this output string so that my user sees it from the browser.
def Narrabeen():
	#return "Welcome to Narrabeen Resturant"

    menudishes = session.query(MenuDish).all()
    output = ''
    for menudish in menudishes:
        output += menudish.DishName
        output += '</br>'
        output += '</br>'
    return output

	
#Use the run function to run the local server with our application.
'''
The if statement here makes sure
the server only runs if the script is executed directly from the Python interpreter, and not used as an imported module.
So basically, this line of code says, if you're executing me withthe Python interpreter, then do this.
But if you're importing me into another Python file don't do this, but you still have access to the rest of the code.
By default, the server is only accessible from the host machine and not from any other computer.
'''	
'''
Restarting our server each time we make a modification to our code
can get pretty annoying but Flask can take care of this for us.
If you enable debug support the server will reload itself each time it notices a code change.
'''
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
