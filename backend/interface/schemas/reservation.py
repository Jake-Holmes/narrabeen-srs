from marshmallow import Schema, fields, post_load
import sys
sys.path.insert(0, '../../')
from db.schemas.reservation import Reservation

class ReservationSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id when loading data to object
	start_time = fields.DateTime()
	end_time = fields.DateTime()
	duration = fields.Integer()
	table_id = fields.Integer()
	customer_id = fields.Integer()

	@post_load
	def make_reservation(self, data):
		return Reservation(**data)  # Creates Reservation object post schema.load()