from datetime import datetime, timedelta
from .common_functions import string_to_bool, session_scope
from .decorators import error_handler
from db.schemas.reservation import Reservation
from interface.schemas.reservation import ReservationSchema
from db.schemas.customer import Customer
from db.schemas.table import Table
from sqlalchemy import and_
from sqlalchemy.sql import exists

# gets all of the reservations (admin only)
@error_handler
def get_all_reservations(request):
    schema = ReservationSchema(many=True, exclude=('table.order', 'table.qr_code', 'table.passcode', 'customer',))

    with session_scope() as session:
        reservation_objects = session.query(Reservation).all()
        reservations, errors = schema.dump(reservation_objects)

    return reservations, 200

# gets a particular reservation using reservation id
@error_handler
def get_reservation(request):
    reservationid = int(request.args.get("id", None))
    schema = ReservationSchema(exclude=('table.order', 'table.qr_code', 'table.passcode',))

    with session_scope() as session:
        if reservationid != None:
            reservation_objects = session.query(Reservation).filter(Reservation.id == reservationid).scalar()
            reservation, errors = schema.dump(reservation_objects)

        else:
            return "Bad request: no reservation id", 400

    return reservation, 200

# gets available reservations for 2 weeks (customer display)
@error_handler
def get_available_reservations(request):
    today= datetime.utcnow().date()
    daterange = today + timedelta(days=14)
    schema = ReservationSchema(many=True, exclude=('table.order', 'table.qr_code', 'table.passcode', 'customer',))

    with session_scope() as session:
        reservation_objects = session.query(Reservation).filter(
            and_(Reservation.start_time >= today, Reservation.end_time <= daterange))
        reservations, errors = schema.dump(reservation_objects)

    return reservations, 200

@error_handler
def make_customer_reservations(request):
    reservation_data = request.get_json()
    schema = ReservationSchema(exclude=('table.order', 'table.qr_code', 'table.passcode',))
    paramMobNum = request.args.get('mobNum', None)
    paramTableId = request.args.get('table', None)
    valid_reservation, errors = schema.load(reservation_data)

    # check if there any mistakes with the JSON
    if errors:
        return "Error: unable to map object", 422

    # then check if the customer and table exists
    with session_scope() as session:
        customer_object = session.query(Customer).filter(Customer.phone == paramMobNum).scalar()
        table_object = session.query(Table).filter(Table.id == paramTableId).scalar()

        # check if url params exist and check if url params match with JSON
        if customer_object == None or customer_object.id != int(reservation_data['customer_id']):
            return "Error: user with mobile number not found", 400

        if table_object == None or table_object.id != int(reservation_data['table_id']):
            return "Error: table id not found", 400

    # make reservation object for ORM
    reservation = Reservation(**valid_reservation)

    # if all are good then add to database
    session.add(reservation)
    session.commit()
    new_reservation = schema.dump(reservation).data

    return new_reservation, 200

    # to do:
    # - get all of the reservations (admin view) (done)
    # - get all available reservations (customer view) (done)
    # - get one reservation (done)
    # - make a reservation (done)
    # - edit/delete a reservation


    ###----------------IN PROGRESS CODE----------------###
    # @error_handler
    # def get_available_reservations(request):
    #     customerid = request.args.get("id", None)
    #     schema = ReservationSchema(many=True)  # can return an array of reservations
    #
    #     with session_scope() as session:
    #         if customerid != None:
    #             reservation_objects = session.query(Reservation).filter(Reservation.customer_id == customerid)
    #             reservations, errors = schema.dump(reservation_objects)
    #         else:
    #             return "Bad request: no customer id", 400
    #
    #     return reservations, 200

    # with session_scope() as session:
    #     if session.query(exists().where(and_(
    #                     Reservation.customer_id != None, Reservation.table_id == reservation.table_id, Reservation.start_time == reservation.start_time))).scalar():
    #         return  "Error: reservation already exists", 400