from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import enum
import sys
import datetime
sys.path.insert(0, '../../')
from db.base import Base

class MenuItemType(enum.Enum):
    main = 1
    appetizer = 2
    dessert = 3
    beverage = 4

class MenuItem(Base):
    __tablename__ = 'menuitems'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    menu_item_type = Column(Enum(MenuItemType))
    price = Column(Float)
    active = Column(Boolean)
    date_created = Column(DateTime)
    date_modified = Column(DateTime)

    def __init__(self, name, description, menu_item_type, price, active):
        self.name = name
        self.description = description
        self.menu_item_type = MenuItemType[menu_item_type]
        self.price = price
        self.active = active
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now