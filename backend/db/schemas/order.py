from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime
from sqlalchemy.orm import relationship
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base
from db.schemas.order_item import OrderItem
from db.schemas.takeawayorder import TakeAwayOrder

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
    table_id = Column(Integer, ForeignKey('tables.id'))
    table = relationship("Table", uselist=False)
    takeaway_id = Column(Integer, ForeignKey('takeawayorders.id'))
    takeaway = relationship("TakeAwayOrder", uselist=False)
    date_created = Column(DateTime)
    date_modified = Column(DateTime) 

    def __init__(self, status, order_type):
        self.status = OrderStatus[status]
        self.order_type = OrderType[order_type]
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now