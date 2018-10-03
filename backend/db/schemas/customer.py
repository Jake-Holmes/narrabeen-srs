from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Boolean
from marshmallow import Schema, fields, post_load
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base


class Customer(Base):
	__tablename__ = 'customers'
	id = Column(Integer, primary_key=True)
	phone = Column(String)
	firstname = Column(String)
	lastname = Column(String)
	status = Column(Boolean)
	# todo: TakeAway relationship
	date_created = Column(DateTime)
	date_modified = Column(DateTime)

	def __init__(self, phone, firstname, lastname, username, status):
		self.phone = phone
		self.firstname = firstname
		self.lastname = lastname
		self.username = username
		self.status = status
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now

	def __repr__(self):
		return "<Customer(id='{}', firstname='{}', lastname='{}')>".format(self.id, self.firstname, self.lastname)