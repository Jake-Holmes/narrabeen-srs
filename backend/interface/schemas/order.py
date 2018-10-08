from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.order import Order
from interface.schemas.order_item import OrderItemSchema

class OrderSchema(Schema):
	id = fields.Int(dump_only=True) # Ignore id when loading data to object
	status = fields.Str()
	order_type = fields.Str()
	order_items = fields.Nested(OrderItemSchema, many=True)
	table_id = fields.Int()
	takeaway_id = fields.Int()
	date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True) # Ignore data_modified when loading data to object