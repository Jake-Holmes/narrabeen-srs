from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.user import User

class UserSchema(Schema):
	id = fields.Integer(dump_only=True, required=True) # Ignore id field when loading data to object
	firstname = fields.Str(required=True)
	lastname = fields.Str(required=True)
	username = fields.Str(required=True)
	password = fields.Str(load_only=True, required=True) # Ignore password when dumping object to data
	access_level = fields.Str(required=True) # Should probably replace with Enum so we can validate data
	email_address = fields.Str(required=True)
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore date modified when loading data to object