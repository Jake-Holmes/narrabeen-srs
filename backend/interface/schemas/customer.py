from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.customer import Customer

class CustomerSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when deserializing object
	phone = fields.Str()
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	status = fields.Boolean(dump_only=True) # Ignore status field when loading data to objects
	date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True) # Ignore data_modified when loading data to object