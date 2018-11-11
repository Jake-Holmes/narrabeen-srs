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
	pickup_time = Column(DateTime, nullable=False)
	customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
	customer = relationship("Customer", uselist=False)
	order = relationship("Order", uselist=False)
	date_created = Column(DateTime, nullable=False)
	date_modified = Column(DateTime, nullable=False)

	def __init__(self, pickup_time):
		self.pickup_time = pickup_time
		now = datetime.datetime.utcnow()
		self.date_created = now
		self.date_modified = now

	def __repr__(self):
		return "<TakeAwayOrder(id='{}', pickup_time='{}', customer_id='{}')>".format(self.id, self.pickup_time, self.customer_id)