from marshmallow import Schema, fields
import sys
sys.path.insert(0, '../../')
from db.schemas.menu_item import MenuItem

class MenuItemSchema(Schema):
    id = fields.Integer(dump_only=True) # Ignore id when loading data to object
    name = fields.Str()
    menu_item_type = fields.Str()
    description = fields.Str()
    # image = fields.Str()
    base_price = fields.Float()
    active = fields.Boolean()
    date_created = fields.DateTime(dump_only=True) # Ignore date_created when loading data to object
    date_modified = fields.DateTime(dump_only=True) # 
