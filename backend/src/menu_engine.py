from . import menu_access as ma
from base import session_factory
from .decorators import error_handler
from db.schemas.menu_item import MenuItem
from interface.schemas.menu_item import MenuItemSchema

# Menu module to implement business logic

@error_handler
def add_menu_item(request):
    try:
        menu_data = request.get_json()
        schema = MenuItemSchema()
        valid_menu_item, errors = schema.load(menu_data)
        if errors:
            return ("Error: unable to map object", 422)
    except Exception as error:
        return (error)

    menu_item = MenuItem(**valid_menu_item)
    session = session_factory()
    session.add(menu_item)
    session.commit()

    new_menu_item = schema.dump(menu_item).data
    session.close()
    return new_menu_item, 201

def get_menu_item(data):
	return "Okay", 200

def edit_menu_item(data):
	return "Okay", 200

def get_all_menu(data):
	return "Okay", 200