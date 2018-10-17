from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.reservation import Reservation

class ReservationSchema(Schema):
	id = fields.Integer(dump_only=True, required=True) # Ignore id when loading data to object
	start_time = fields.DateTime(required=True)
	end_time = fields.DateTime(required=True)
	duration = fields.Integer(required=True)
	table_id = fields.Integer(dump_only=True, required=True) # Ignore table_id when loading data to object
	customer_id = fields.Integer(dump_only=True, required=True) # Ignore customer_idwhen loading data to object
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore data_modified when loading data to object