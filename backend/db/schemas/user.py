from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum
from marshmallow import Schema, fields, post_load
import enum
import sys
sys.path.insert(0, '../../')
from db.base import Base

class AccessLevel(enum.Enum):
    customer = 1
    staff = 2

class User(Base):
	__tablename__ = 'users'
	id = Column(Integer, primary_key=True)
	firstname = Column(String)
	lastname = Column(String)
	username = Column(String)
	password = Column(Binary)
	access_level = Column(Enum(AccessLevel))
	email_address = Column(String)

	def __init__(self, firstname, lastname, username, password, access_level, email_address):
		self.firstname = firstname
		self.lastname = lastname
		self.username = username
		self.password = password.encode('utf-8')
		self.access_level = AccessLevel[access_level] # String to enum, customer -> AccessLevel.customer
		self.email_address = email_address

	def __repr__(self):
		return '<User(name={self.firstname!r})>'.format(self=self)

class UserSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	password = fields.Str()
	access_level = fields.Str() # Should probably replace with Enum
	email_address = fields.Str()

	@post_load
	def make_user(self, data):
		return User(**data) # Creates User object post schema.load()