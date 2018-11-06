from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Boolean
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base

class Customer(Base):
	__tablename__ = 'customers'
	id = Column(Integer, primary_key=True)
	phone = Column(String, nullable=False)
	firstname = Column(String, nullable=False)
	lastname = Column(String, nullable=False)
	status = Column(Boolean, nullable=False)
	takeawayorders = relationship("TakeAwayOrder")
	reservations = relationship("Reservation")
	date_created = Column(DateTime, nullable=False)
	date_modified = Column(DateTime, nullable=False)

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
		return "<Customer(id='{}', firstname='{}', lastname='{}', phone='{}')>".format(self.id, self.firstname, self.lastname, self.phone)