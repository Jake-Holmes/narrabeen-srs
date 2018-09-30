from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base
from db.schemas.menu_item import MenuItem

# Should we move all enums to a separate file?
# This enum is present in order.py
class OrderType(enum.Enum):
    dinein = 1
    takeaway = 2

class OrderItemStatus(enum.Enum):
    confirmed = 1
    inprogress = 2
    ready = 3
    paid = 4

class OrderItem(Base):
    __tablename__ = 'orderitems'
    id = Column(Integer, primary_key=True)
    slot = Column(Integer)
    price = Column(Float)
    status = Column(Enum(OrderItemStatus))
    order_type = Column(Enum(OrderType))
    menu_item_id = Column(Integer, ForeignKey('menuitems.id'))
    menu_item = relationship("MenuItem")
    order_id = Column(Integer, ForeignKey('orders.id'))
    date_created = Column(DateTime)
    date_modified = Column(DateTime)

    def __init__(self, slot, price, status, order_type, menu_item):
        self.slot = slot
        self.price = price
        self.status = OrderItemStatus[status]
        self.order_type = OrderType[order_type]
        self.menu_item = menu_item
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now