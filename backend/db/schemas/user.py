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

class UserSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	password = fields.Str(load_only=True)
	access_level = fields.Str() # Should probably replace with Enum
	email_address = fields.Str()
	date_created = fields.DateTime(dump_only=True)
	date_modified = fields.DateTime()

	@post_load
	def make_user(self, data):
		return User(**data) # Creates User object post schema.load()