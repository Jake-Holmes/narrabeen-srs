from sqlalchemy import exists
from .decorators import error_handler
from db.schemas.table import Table
from db.schemas.order import OrderStatus
from interface.schemas.table import TableSchema
from .common_functions import session_scope, generate_code

@error_handler
def add_table(request):
    table_data = request.get_json()
    schema = TableSchema(exclude=("id",))
    valid_table, errors = schema.load(table_data)
    if errors:
        return ("Error: unable to map object", 422)
    
    table = Table(**valid_table)

    with session_scope() as session:
        if session.query(exists().where(Table.table_number==table.table_number)).scalar():
            return ("Error: Table number taken", 400)

        session.add(table)
        new_table = schema.dump(table).data

    return new_table, 201

@error_handler
def get_table(request):
    id = request.args.get("id")
    schema = TableSchema(exclude=("order",))

    with session_scope() as session:
        table_object = session.query(Table).get(id)
        table, errors = schema.dump(table_object)

    return table, 200

@error_handler
def table_login(request):
    id = request.args.get("id")
    table_passcode = int(request.args.get("passcode"))

    with session_scope() as session:
        table = session.query(Table).get(id)
        if table != None:
            if table.passcode == table_passcode:
                table.qr_code = generate_code()
                return table.qr_code, 200
            else:
                return "Passcode incorrect", 401
        else:
            return "No table with that id", 404

    return "Bad Request", 400

@error_handler
def get_all_tables(request):
    schema = TableSchema(many=True, exclude=("qr_code","passcode"))

    with session_scope() as session:
        table_objects = session.query(Table).all()
        tables, errors = schema.dump(table_objects)

    return tables, 200

@error_handler
def edit_table(request):
    table_data = request.get_json()
    schema = TableSchema()
    valid_table, errors = schema.load(table_data)

    if errors:
        return ("Error: unable to map object", 422)

    with session_scope() as session:
        session.query(Table).filter(Table.id == valid_table["id"]).update(valid_table)
        updated_table = schema.dump(valid_table).data

    return updated_table, 200