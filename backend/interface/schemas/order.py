from marshmallow import Schema, fields, pre_dump
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

	@pre_dump
	def remove_enum_prefix(self, in_data):
		in_data.order_type = in_data.order_type.name
		in_data.status = in_data.status.name
		return in_data