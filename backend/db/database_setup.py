import os
import sys
from datetime import datetime, timedelta
sys.path.insert(0, '../')
from db.schemas.user import User
from db.schemas.order import Order
from db.schemas.menu_item import MenuItem
from db.schemas.order_item import OrderItem
from db.schemas.table import Table
from db.schemas.customer import Customer
from db.schemas.reservation import Reservation
from db.base import session_factory

dbfile="narrabeen2.db"

# Delete database file
if os.path.isfile(dbfile):
	os.remove(dbfile)
	print("File: %s removed" % dbfile)
else:
	print("Note: %s database file not found" % dbfile)

session = session_factory()

# Generate some instances of the classes and persist to the database

table1 = Table(1, 4, "SomeQrCode", "passcode", True)

corey = User("Corey", "Stidston", "cstidston", "password", "manager", "corey@mail.com")
wallace = User("Wallace", "Alaswad", "alaswaw", "123", "staff", "wallace.alaswad@gmail.com")

steak = MenuItem("Steak", "Serious steak for a serious steak lover", "main", 19.99, True)

orderItem1 = OrderItem(1, 19.99, "confirmed", "dinein", steak) # OrderItem1 has an association with menu item Steak

order1 = Order("confirmed", "dinein")
table1.order = order1 # Table1 links to Order1
order1.order_items = [orderItem1] # Order1 has is associated with a collection of order items

customer1 = Customer("911", "Joe", "Smith", "JSmith", True)

start = datetime.utcnow()
end = start + timedelta(hours=2)
reservation1 = Reservation(1.5, table1, customer1, start, end)

# Add given instances to the session

session.add_all([table1, corey, wallace, steak, orderItem1, order1, customer1, reservation1])

# Commit and close session

session.commit()
session.close()

print("New database file created")