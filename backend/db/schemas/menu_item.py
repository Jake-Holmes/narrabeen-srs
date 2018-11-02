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
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    menu_item_type = Column(Enum(MenuItemType), nullable=False)
    base_price = Column(Float, nullable=False)
    image = Column(String)
    active = Column(Boolean, nullable=False)
    date_created = Column(DateTime, nullable=False)
    date_modified = Column(DateTime, nullable=False)

    def __init__(self, name, description, menu_item_type, base_price, active):
        self.name = name
        self.description = description
        self.menu_item_type = MenuItemType[menu_item_type]
        self.base_price = base_price
        self.active = active
        self.image = "images/food.jpg" # todo: Change this on implementation
        now = datetime.datetime.utcnow()
        self.date_created = now
        self.date_modified = now