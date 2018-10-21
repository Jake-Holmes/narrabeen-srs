from . import menu_access as ma
from .decorators import error_handler
from db.schemas.menu_item import MenuItem
from interface.schemas.menu_item import MenuItemSchema
from .common_functions import string_to_bool, session_scope

# Menu module to implement business logic

@error_handler
def add_menu_item(request):
    menu_data = request.get_json()
    schema = MenuItemSchema()
    valid_menu_item, errors = schema.load(menu_data)
    if errors:
        return ("Error: unable to map object", 422)

    menu_item = MenuItem(**valid_menu_item)
    
    with session_scope() as session:
        session.add(menu_item)
        new_menu_item = schema.dump(menu_item).data

    return new_menu_item, 201

def get_menu_item(data):
    return "Okay", 200

def edit_menu_item(data):
    return "Okay", 200

@error_handler
def get_all_menu_items(request):
    active = string_to_bool(request.args.get("active", None))
    schema = MenuItemSchema(many=True)

    with session_scope() as session:
        if active != None:
            menu_objects = session.query(MenuItem).filter(MenuItem.active == active)
        else:
            menu_objects = session.query(MenuItem).all()

        menu_items, errors = schema.dump(menu_objects)    

    return menu_items, 200