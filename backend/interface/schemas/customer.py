from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.customer import Customer
import interface.schemas.reservation
from interface.schemas.takeawayorder import TakeAwayOrderSchema

class CustomerSchema(Schema):
	id = fields.Integer(dump_only=True, required=True) # Ignore id field when deserializing object
	phone = fields.Str(required=True)
	firstname = fields.Str(required=True)
	lastname = fields.Str(required=True)
	username = fields.Str(required=True)
	status = fields.Boolean(dump_only=True, required=True) # Ignore status field when loading data to objects
	reservations = fields.Nested('ReservationSchema', many=True, exclude=('customer',))
	takeaway_orders = fields.Nested(TakeAwayOrderSchema, many=True)
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore data_modified when loading data to object