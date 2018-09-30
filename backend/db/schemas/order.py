from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base
from db.schemas.order_item import OrderItem

class OrderType(enum.Enum):
    dinein = 1
    takeaway = 2

class OrderStatus(enum.Enum):
    confirmed = 1
    inprogress = 2
    ready = 3
    paid = 4

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    status = Column(Enum(OrderStatus))
    order_type = Column(Enum(OrderType))
    order_items = relationship("OrderItem")
    date_created = Column(DateTime)
    date_modified = Column(DateTime)
    #TableId
    #TakeawayId

    def __init__(self, status, order_type):
        self.status = OrderStatus[status]
        self.order_type = OrderType[order_type]
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now

class OrderSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	status = fields.Str()
	order_type = fields.Str()
	#  order_items = 
	date_created = fields.DateTime(dump_only=True)
	date_modified = fields.DateTime()

	@post_load
	def make_order(self, data):
		return Order(**data) # Creates Order object post schema.load()