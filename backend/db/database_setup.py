import os
import sys
sys.path.insert(0, '../')
from db.schemas.user import User
from db.base import session_factory

dbfile="narrabeen2.db"

## Delete database file ##
if os.path.isfile(dbfile):
	os.remove(dbfile)
	print("File: %s removed" % dbfile)
else:
	print("Note: %s database file not found" % dbfile)

session = session_factory()

Corey = User("Corey", "Stidston", "cstidston", "password", "customer", "corey@mail.com")
Wallace = User("Wallace", "Alaswad", "alaswaw", "123", "staff", "wallace.alaswad@gmail.com")

session.add(Corey)
session.add(Wallace)

session.commit()
session.close()

print("New database file created")