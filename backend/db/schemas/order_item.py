from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base

# Should we move all enums to a separate file?

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
    menu_item_id = Column(Integer, ForeignKey('menuitems.id'))
    menu_item = relationship("MenuItem", uselist=False)
    order_id = Column(Integer, ForeignKey('orders.id'))
    order = relationship("Order", uselist=False)
    date_created = Column(DateTime)
    date_modified = Column(DateTime)

    def __init__(self, slot, price, status, menu_item):
        self.slot = slot
        self.price = price
        self.status = OrderItemStatus[status]
        self.menu_item = menu_item
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now