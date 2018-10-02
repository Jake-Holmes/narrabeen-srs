from marshmallow import Schema, fields, post_load
import sys
sys.path.insert(0, '../../')
from db.schemas.user import User

class UserSchema(Schema):
	id = fields.Integer(dump_only=True) # Ignore id field when loading data to object
	firstname = fields.Str()
	lastname = fields.Str()
	username = fields.Str()
	password = fields.Str(load_only=True) # Ignore field when dumping object to data
	access_level = fields.Str() # Should probably replace with Enum
	email_address = fields.Str()
	date_created = fields.DateTime(dump_only=True) # Ignore field when loading data to object
	date_modified = fields.DateTime()

	@post_load
	def make_user(self, data):
		return User(**data) # Creates User object post schema.load()