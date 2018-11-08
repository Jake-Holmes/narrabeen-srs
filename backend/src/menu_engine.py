from . import menu_access as ma
from .decorators import error_handler
from db.schemas.menu_item import MenuItem
from interface.schemas.menu_item import MenuItemSchema
from .common_functions import string_to_bool, session_scope, generate_code
from sqlalchemy import exists
import base64

# Menu module to implement business logic

@error_handler
def add_menu_item(request):
    menu_data = request.get_json()
    schema = MenuItemSchema(dump_only=('id',))
    valid_menu_item, errors = schema.load(menu_data)
    if errors:
        return ("Error: unable to map object", 422)

    menu_item = MenuItem(**valid_menu_item)
    
    if "image" in menu_data:
        filename = valid_menu_item["name"].replace(" ","") + ".png"
        menu_item.image = filename
        with open("images/" + filename, "wb") as fh:
            fh.write(base64.b64decode(menu_data["image"]))

    with session_scope() as session:
        if session.query(exists().where(MenuItem.name == menu_item.name)).scalar():
            return ("Error: Menu item already exists", 400)
        session.add(menu_item)
        session.commit()
        new_menu_item = schema.dump(menu_item).data

    return new_menu_item, 200

@error_handler
def delete_menu_item(request):
    id = request.args.get("id")

    with session_scope() as session:
        if session.query(exists().where(MenuItem.id == id)).scalar():
            session.query(MenuItem).filter(MenuItem.id == id).delete()
        else:
            return ("Error: Menu item does not exist", 400)
    
    return "Menu item successfully removed", 200

@error_handler
def get_menu_item(request):
    id = request.args.get("id")
    schema = MenuItemSchema()

    with session_scope() as session:
        if session.query(exists().where(MenuItem.id == id)).scalar():
            menu_object = session.query(MenuItem).get(id)
            menu_item, errors = schema.dump(menu_object)
        else:
            return ("Error: Menu item does not exist", 400)

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
        menu_item = session.query(MenuItem).get(valid_menu_data["id"])
        if menu_item != None:
            if menu_item.name != valid_menu_data["name"] and session.query(exists().where(MenuItem.name == valid_menu_data["name"])).scalar():
                return ("Error: This name already exists", 400)
            session.query(MenuItem).filter(MenuItem.id == valid_menu_data["id"]).update(valid_menu_data)
        else:
            return ("Error: This ID does not exist", 400)

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