from marshmallow import Schema, fields, post_load
import sys
sys.path.insert(0, '../../')
from db.schemas.order import Order

class OrderSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id when loading data to object
	status = fields.Str()
	order_type = fields.Str()
    # Something like this -
	# order_items = fields.Nested(OrderItemSchema, many=True, only=['menu_item_id'])
    # Nested Schemas reference https://marshmallow.readthedocs.io/en/3.0/nesting.html
    # or maybe something like:
    # fields.Dict(values=fields.Float(), keys=fields.Str())
	date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True) # Ignore data_modified when loading data to object