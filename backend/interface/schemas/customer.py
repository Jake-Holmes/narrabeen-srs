from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.customer import Customer
from interface.schemas.reservation import ReservationSchema
from interface.schemas.takeawayorder import TakeAwayOrderSchema

class CustomerSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	phone = fields.Str()
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	status = fields.Boolean(dump_only=True) # Ignore status field when loading data to objects
	reservations = fields.Nested(ReservationSchema, many=True)
	takeaway_orders = fields.Nested(TakeAwayOrderSchema, many=True)
	date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True) # Ignore data_modified when loading data to object