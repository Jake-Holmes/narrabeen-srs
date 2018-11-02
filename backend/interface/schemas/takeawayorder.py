from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.takeawayorder import TakeAwayOrder

class TakeAwayOrderSchema(Schema):
	id = fields.Integer(dump_only=True, required=True) # Ignore id field when loading data to object
	pickup_time = fields.DateTime(required=True)
	customer_id = fields.Integer(dump_only=True, required=True) # Ignore customer_id when loading data to object
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore data_modified when loading data to object