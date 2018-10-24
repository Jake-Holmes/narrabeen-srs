from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.table import Table
from interface.schemas.order import OrderSchema

class TableSchema(Schema):
	id = fields.Integer(dump_only=True, required=True)
	table_number = fields.Int(required=True)
	seats = fields.Int(required=True)
	qr_code = fields.Str(dump_only=True, required=True)
	passcode = fields.Int(required=True)
	status = fields.Bool(required=True)
	order = fields.Nested(OrderSchema, dump_only=True, required=True)
	date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
	date_modified = fields.DateTime(dump_only=True, required=True) # Ignore data_modified when loading data to object