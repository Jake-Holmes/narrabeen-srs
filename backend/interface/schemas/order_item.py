from sqlalchemy import Column, ForeignKey, Integer, String, Binary, Enum, DateTime, Float
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields, post_load
import sys
sys.path.insert(0, '../../')
from db.schemas.order_item import OrderItem

# todo: Order Item object schema
class OrderItemSchema(Schema):
    id = fields.Integer(dump_only=True)
    slot = fields.Int()
    price = fields.Float()
    status = fields.Str()
    order_type = fields.Str()
    menu_item_id = fields.Integer(dump_only=True)
    order_id = fields.Integer(dump_only=True)
    date_created = fields.DateTime(dump_only=True)
    date_modified = fields.DateTime(dump_only=True)