from .decorators import error_handler
from .common_functions import string_to_bool, session_scope
from db.schemas.customer import Customer
from interface.schemas.customer import CustomerSchema
from sqlalchemy import exists

# Business logic for the customer module

@error_handler
def add_customer(request):
    customer_data = request.get_json()
    schema = CustomerSchema()
    valid_customer, errors = schema.load(customer_data)
    if errors:
        return ("Error: unable to map object", 422)

    customer = Customer(**valid_customer)

    with session_scope() as session:
        if session.query(exists().where(Customer.phone == customer.phone)).scalar():
            return ("Error: Phone number is already registered", 400)

        session.add(customer)
        new_customer = schema.dump(customer).data
    return new_customer, 200

@error_handler
def get_customer(request):
    param_phone = request.args.get("mobNum")
    schema = CustomerSchema()

    with session_scope() as session:
        customer_object = session.query(Customer).get(param_phone)
        customer_item, errors = schema.dump(customer_object)

    return customer_item, 200

@error_handler
def get_takeaway_customer(request):
    return 200

@error_handler
def get_customer_reservation(request):
    return 200

@error_handler
def edit_customer(request):
    return ("Edit customer successful", 200)