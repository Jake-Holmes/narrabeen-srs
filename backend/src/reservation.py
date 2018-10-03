from flask import jsonify
from base import session_factory
from .decorators import error_handler
from db.schemas.reservation import Reservation
from interface.schemas.reservation import ReservationSchema

@error_handler
def get_reservations(request):
    session = session_factory()

    reservation_objects = session.query(Reservation).all()
    schema = ReservationSchema(many=True)
    reservations, errors = schema.dump(reservation_objects)
    
    session.close()
    return (jsonify(reservations), 200)

# @error_handler
# def get_order(request, id):
#     session = session_factory()
#     order_object = session.query(Order).get(id)
#     schema = OrderSchema()
#     order = schema.dump(order_object)[0] # todo: lookup why schema dump is returning an extra empty array
#     session.close()
#     return (jsonify(order), 200)