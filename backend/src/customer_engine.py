from .decorators import error_handler
from .common_functions import string_to_bool, session_scope
from db.schemas.customer import Customer
from db.schemas.reservation import Reservation
from db.schemas.takeawayorder import TakeAwayOrder
from db.schemas.order import Order, OrderStatus
from interface.schemas.takeawayorder import TakeAwayOrderSchema
from interface.schemas.reservation import ReservationSchema
from interface.schemas.customer import CustomerSchema
from sqlalchemy import exists

# Business logic for the customer module

@error_handler
def add_customer(request):
    customer_data = request.get_json()
    schema = CustomerSchema(dump_only=('id',))
    valid_customer, errors = schema.load(customer_data)
    if errors:
        print(errors)
        return ("Error: unable to map object", 422)
    
    customer = Customer(**valid_customer)

    with session_scope() as session:
        if session.query(exists().where(Customer.phone == customer.phone)).scalar():
            return ("Error: Phone number is already registered", 400)
        session.add(customer)
        session.commit()
        new_customer = schema.dump(customer).data

    return new_customer, 200

@error_handler
def get_customer(request):
    param_phone = request.args.get("mobNum")
    schema = CustomerSchema()

    with session_scope() as session:
        customer_object = session.query(Customer).filter(Customer.phone==param_phone).scalar()
        customer_item, errors = schema.dump(customer_object)

    return customer_item, 200

@error_handler
def get_customer_takeaway(request):
    param_phone = request.args.get("mobNum")
    schema = TakeAwayOrderSchema()
    
    with session_scope() as session:
        customer_object = session.query(Customer).filter(Customer.phone == param_phone).scalar()
        current_takeawayorder = session.query(TakeAwayOrder, Order).filter(TakeAwayOrder.customer_id == customer_object.id).filter(Order.takeaway_id == TakeAwayOrder.id).filter(Order.status != OrderStatus.paid).scalar()
        current_takeawayorder, errors = schema.dump(current_takeawayorder)
    
    return current_takeawayorder, 200

@error_handler
def get_customer_reservation(request):
    param_phone = request.args.get("mobNum")
    schema = ReservationSchema(many=True, exclude=("customer",))

    with session_scope() as session:
        customer_object = session.query(Customer).filter(Customer.phone == param_phone).scalar()
        # Search for customer id in reservation
        customer_reservation = session.query(Reservation).filter(Reservation.customer_id == customer_object.id)
        reservation_item, errors = schema.dump(customer_reservation)

    return reservation_item, 200

@error_handler
def edit_customer(request):
    customer_data = request.get_json()
    schema = CustomerSchema()
    valid_customer_data, errors = schema.load(customer_data)

    if errors:
        return ("Error: unable to map object", 422)


    with session_scope() as session:
        # Update the customer with the ID specified
        if session.query(exists().where(Customer.id == valid_customer_data["id"])).scalar():
            session.query(Customer).filter(Customer.id == valid_customer_data["id"]).update(valid_customer_data)
        else:
            return ("Error: This customer ID does not exist", 400)

    return "Edit customer successful", 200