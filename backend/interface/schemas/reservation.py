from marshmallow import Schema, fields, post_load
import sys
sys.path.insert(0, '../../')
from db.schemas.reservation import Reservation

class ReservationSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id when loading data to object
	start_time = fields.DateTime()
	end_time = fields.DateTime()
	duration = fields.Integer()
	table_id = fields.Integer(dump_only=True) # Ignore table_id when loading data to object
	customer_id = fields.Integer(dump_only=True) # Ignore customer_idwhen loading data to object
	date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True) # Ignore data_modified when loading data to object