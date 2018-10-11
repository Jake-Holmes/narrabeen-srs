from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.table import Table

class TableSchema():
	id = field.Integer(dump_only=True)
	table_number = fields.Int()
	seats = fields.Int()
	qr_code = fields.Str(dump_only=True)
	passcode = fields.Str()
	status = fields.Bool()