from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base

class AccessLevel(enum.Enum):
    manager = 1
    staff = 2

class User(Base):
	__tablename__ = 'users'
	id = Column(Integer, primary_key=True)
	firstname = Column(String)
	lastname = Column(String)
	username = Column(String)
	password = Column(String)
	access_level = Column(Enum(AccessLevel))
	email_address = Column(String)
	date_created = Column(DateTime)
	date_modified = Column(DateTime)

	def __init__(self, firstname, lastname, username, password, access_level, email_address):
		self.firstname = firstname
		self.lastname = lastname
		self.username = username
		self.password = password
		self.access_level = AccessLevel[access_level] # String to enum, customer -> AccessLevel.customer
		self.email_address = email_address
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now