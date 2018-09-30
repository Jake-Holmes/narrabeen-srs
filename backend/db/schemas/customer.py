from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Boolean
from marshmallow import Schema, fields, post_load
import sys

sys.path.insert(0, '../../')
from db.base import Base


class Customer(Base):
	__tablename__ = 'customer'
	id = Column(Integer, primary_key=True)
	phone = Column(String)
	firstname = Column(String)
	lastname = Column(String)
	status = Column(Boolean)

	def __init__(self, phone, firstname, lastname, username, status):
		self.phone = phone
		self.firstname = firstname
		self.lastname = lastname
		self.username = username
		self.status = status

class CustomerSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	phone = fields.Str()
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	status = fields.Boolean()
	@post_load
	def make_customer(self, data):
		return Customer(**data) # Creates Customer object post schema.load()