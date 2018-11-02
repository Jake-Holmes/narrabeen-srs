from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base
from db.schemas.table import Table
from db.schemas.customer import Customer

class Reservation(Base):
	__tablename__ = 'reservations'
	id = Column(Integer, primary_key=True)
	start_time = Column(DateTime, nullable=False)
	end_time = Column(DateTime, nullable=False)
	duration = Column(Float, nullable=False)
	table_id = Column(Integer, ForeignKey('tables.id'), nullable=False)
	table = relationship("Table", uselist=False)
	customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
	customer = relationship("Customer", uselist=False)
	date_created = Column(DateTime, nullable=False)
	date_modified = Column(DateTime, nullable=False)

	def __init__(self, duration, table, customer, start_time, end_time):
		self.duration = duration
		self.table = table
		self.customer = customer
		self.start_time = start_time
		self.end_time = end_time
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now

	def __repr__(self):
		return "<Reservation(id='{}', customer_id='{}', table_id='{}')>".format(self.id, self.customer_id, self.table_id)