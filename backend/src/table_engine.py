from sqlalchemy import exists
from .decorators import error_handler
from db.schemas.table import Table
from interface.schemas.table import TableSchema
from .common_functions import session_scope

@error_handler
def add_table(request):
    table_data = request.get_json()
    schema = TableSchema()
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
