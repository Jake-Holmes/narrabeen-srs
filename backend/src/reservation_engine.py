from datetime import datetime, timedelta
from .common_functions import string_to_bool, session_scope
from .decorators import error_handler
from db.schemas.reservation import Reservation
from interface.schemas.reservation import ReservationSchema
from sqlalchemy import and_

# gets all of the reservations for the next 2 weeks
@error_handler
def get_all_reservations(request):
    today = datetime.today().date()
    daterange = today + timedelta(days=14)
    schema = ReservationSchema(many=True) #can return an array of reservations

    with session_scope() as session:
        reservation_objects = session.query(Reservation).filter(
            and_(Reservation.start_time >= today, Reservation.start_time <= daterange))
        reservations, errors = schema.dump(reservation_objects)

    return reservations, 200

# gets all the customer's reservations (no limit)
@error_handler
def get_customer_reservations(request):
    customerid = request.args.get("customer_id", None)
    schema = ReservationSchema(many=True)  # can return an array of reservations

    with session_scope() as session:
        if customerid != None:
            reservation_objects = session.query(Reservation).filter(Reservation.customer_id == customerid)
            reservations, errors = schema.dump(reservation_objects)
        else:
            return "Bad request: no customer id", 400

    return reservations, 200

# gets a particular reservation
@error_handler
def get_reservation(request):
    reservationid = request.args.get("reservation_id", None)
    schema = ReservationSchema(many=True)  # can return an array of reservations

    with session_scope() as session:
        if reservationid != None:
            reservation_objects = session.query(Reservation).filter(Reservation.id == reservationid)
            reservation, errors = schema.dump(reservation_objects)
        else:
            return "Bad request: no reservation id", 400

    return reservation, 200

# to do:
# - get all of the resevations for 2 weeks(done)
# - get all reservations for a customer (done)
# - get one reservation (done)
# - make a reservation
# - edit/delete a reservation
# - think we might need a status for a table (might just do this in the front end logic)

# @error_handler
# def get_all_reservations(request):
#     session = session_factory()
#
#     reservation_objects = session.query(Reservation).all()
#     schema = ReservationSchema(many=True)
#     reservations, errors = schema.dump(reservation_objects)
#     session.close()
#     return ((reservations), 200)

# @error_handler
# def get_order(request, id):
#     session = session_factory()
#     order_object = session.query(Order).get(id)
#     schema = OrderSchema()
#     order = schema.dump(order_object)[0] # todo: lookup why schema dump is returning an extra empty array
#     session.close()
#     return (jsonify(order), 200)