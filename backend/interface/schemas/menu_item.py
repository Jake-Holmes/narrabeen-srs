from marshmallow import Schema, fields, pre_dump
import sys
sys.path.insert(0, '../../')
from db.schemas.menu_item import MenuItem

class MenuItemSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.Str(required=True)
    menu_item_type = fields.Str(required=True)
    description = fields.Str(required=True)
    image = fields.Str(dump_only=True)
    base_price = fields.Float(required=True)
    active = fields.Boolean(required=True)
    date_created = fields.DateTime(dump_only=True, required=True) # Ignore date_created when loading data to object
    date_modified = fields.DateTime(dump_only=True, required=True) # 

    @pre_dump
    def remove_enum_prefix(self, in_data):
        in_data.menu_item_type = in_data.menu_item_type.name
        return in_data