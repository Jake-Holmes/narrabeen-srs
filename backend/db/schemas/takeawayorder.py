from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Boolean
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import sys
import datetime

sys.path.insert(0, '../../')
from db.base import Base
from db.schemas.customer import Customer

class TakeAwayOrder(Base):
	__tablename__ = 'takeawayorders'
	id = Column(Integer, primary_key=True)
	pickup_time = Column(DateTime)
	customer_id = Column(Integer, ForeignKey('customer.id'))
	customer = relationship(Customer)
	date_created = Column(DateTime)
	date_modified = Column(DateTime)

	def __init__(self, pickup_time):
		self.pickup_time = pickup_time
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now

class TakeAwayOrderSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	pickup_time = fields.DateTime()
	customer_id = fields.Int()
	date_created = fields.DateTime(dump_only=True)
	date_modified = fields.DateTime()
	
	@post_load
	def make_takeawayorder(self, data):
		return TakeAwayOrder(**data) # Creates TakeAwayOrder object post schema.load()