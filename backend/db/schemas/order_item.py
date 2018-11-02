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
    price = Column(Float, nullable=False)
    status = Column(Enum(OrderItemStatus), nullable=False)
    menu_item_id = Column(Integer, ForeignKey('menuitems.id'), nullable=False)
    menu_item = relationship("MenuItem", uselist=False)
    order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
    order = relationship("Order", uselist=False)
    date_created = Column(DateTime, nullable=False)
    date_modified = Column(DateTime, nullable=False)

    def __init__(self, slot, price, status, menu_item):
        self.slot = slot
        self.price = price
        self.status = OrderItemStatus[status]
        self.menu_item = menu_item
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now