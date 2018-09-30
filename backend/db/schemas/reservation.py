from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base



class Reservation(Base):
	__tablename__ = 'reservation'
	id = Column(Integer, primary_key=True)
	start_time = Column(DateTime)
	end_time = Column(DateTime)
	duration = Column(Float)
	table_id = Column(Integer, ForeignKey('table.id'))
	table = relationship(Table)
	customer_id = Column(Integer, ForeignKey('customer.id'))
	customer = relationship(Customer)

	def __init__(self, duration, table, customer):
		self.duration = duration
		self.table = table
		self.customer = customer
		now = datetime.datetime.utcnow()
		self.start_time = now
		self.end_time = now
