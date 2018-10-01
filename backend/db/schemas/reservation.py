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
	start_time = Column(DateTime)
	end_time = Column(DateTime)
	duration = Column(Float)
	table_id = Column(Integer, ForeignKey('tables.id'))
	table = relationship("Table")
	customer_id = Column(Integer, ForeignKey('customers.id'))
	customer = relationship("Customer")
	date_created = Column(DateTime)
	date_modified = Column(DateTime)

	def __init__(self, duration, table, customer, start_time, end_time):
		self.duration = duration
		self.table = table
		self.customer = customer
		self.start_time = start_time
		self.end_time = end_time
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now

class ReservationSchema(Schema):
	id = fields.Integer(dump_only=True)
	start_time = fields.DateTime()
	end_time = fields.DateTime()
	duration = fields.Integer()
	table_id = fields.Integer()
	customer_id = fields.Integer()

	@post_load
	def make_reservation(self, data):
		return Reservation(**data)  # Creates Order object post schema.load()

# todo: add object schema