from marshmallow import Schema, fields, post_dump
import sys
sys.path.insert(0, '../../')
from db.schemas.order import Order
from interface.schemas.order_item import OrderItemSchema

class OrderSchema(Schema):
	id = fields.Int(dump_only=True, required=True) # Ignore id when loading data to object
	status = fields.Str(required=True)
	order_type = fields.Str(required=True)
	order_items = fields.Nested(OrderItemSchema, many=True, required=True)
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore data_modified when loading data to object

	@post_dump
	def remove_enum_prefix(self, out_data):
		out_data["status"] = out_data["status"].replace("OrderStatus.","")
		out_data["order_type"] = out_data["order_type"].replace("OrderType.","")
		return out_data