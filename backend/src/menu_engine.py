import base64
from . import menu_access as ma
from .decorators import error_handler
from db.schemas.menu_item import MenuItem
from interface.schemas.menu_item import MenuItemSchema
from .common_functions import string_to_bool, session_scope, generate_code
from sqlalchemy import exists

# Menu module to implement business logic

@error_handler
def add_menu_item(request):
    menu_data = request.get_json()
    schema = MenuItemSchema(exclude=('id',))
    valid_menu_item, errors = schema.load(menu_data)
    if errors:
        return ("Error: unable to map object", 422)

    menu_item = MenuItem(**valid_menu_item)

    if "image" in menu_data:
        filename = valid_menu_item["name"].replace(" ", "") + ".png"
        menu_item.image = filename
        with open("images/" + filename, "wb") as fh:
            fh.write(base64.b64decode(menu_data["image"]))

    with session_scope() as session:
        if session.query(exists().where(MenuItem.name==menu_item.name)).scalar():
            return ("Error: Menu item exists", 400)
        session.add(menu_item)
        new_menu_item = schema.dump(menu_item).data

    return new_menu_item, 200

@error_handler
def delete_menu_item(request):
    return "Okay", 200

@error_handler
def get_menu_item(request):
    id = request.args.get("id")
    schema = MenuItemSchema()

    with session_scope() as session:
        menu_object = session.query(MenuItem).get(id)
        menu_item, errors = schema.dump(menu_object)

    return menu_item, 200

@error_handler
def edit_menu_item(request):
    menu_data = request.get_json()
    schema = MenuItemSchema()
    valid_menu_data, errors = schema.load(menu_data)

    if errors:
        return ("Error: unable to map object", 422)

    if "image" in menu_data:
        filename = valid_menu_data["name"].replace(" ", "") + ".png"
        valid_menu_data["image"] = filename
        with open("images/" + filename, "wb") as fh:
            fh.write(base64.b64decode(menu_data["image"]))

    with session_scope() as session:
        # Update the menu with the ID specified
        session.query(MenuItem).filter(MenuItem.id == valid_menu_data["id"]).update(valid_menu_data)

    return "Edit menu successful", 200

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