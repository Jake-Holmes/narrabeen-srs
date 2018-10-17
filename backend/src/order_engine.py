from base import session_factory
from .decorators import error_handler
from .common_functions import string_to_bool
from db.schemas.order import Order
from db.schemas.order_item import OrderItem
from interface.schemas.order import OrderSchema
from interface.schemas.order_item import OrderItemSchema

# Business logic for the order module

@error_handler
def get_order(request):
	id = request.args.get("id")

	session = session_factory()

	order_object = session.query(Order).get(id)
	schema = OrderSchema()
	order, errors = schema.dump(order_object)

	session.close()
	return order, 200

@error_handler
def edit_order(data):
	return "Okay", 200

@error_handler
def get_all_orders(request):
	status = request.args.get("status", None)
	session = session_factory()

	order_objects = session.query(Order).all()
	schema = OrderSchema(many=True, exclude=("order_items",))
	orders, errors = schema.dump(order_objects)
	
	if status != None:
		order_objects = session.query(Order).filter(Order.status == status)
	else:
		order_objects = session.query(Order).all()

	orders, errors = schema.dump(order_objects)
	return orders, 200

@error_handler
def get_all_order_items(request):
	status = request.args.get("status", None)
	session = session_factory()

	order_objects = session.query(Order).all()
	schema = OrderSchema(many=True)
	orders, errors = schema.dump(order_objects)

	if status != None:
		order_objects = session.query(OrderItem).filter(Order.status == status)
	else:
		order_objects = session.query(OrderItem).all()

	orders, errors = schema.dump(order_objects)

	session.close()
	return orders, 200