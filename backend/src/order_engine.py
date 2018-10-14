from base import session_factory
from .decorators import error_handler
from db.schemas.order import Order
from db.schemas.order_item import OrderItem
from interface.schemas.order import OrderSchema
from interface.schemas.order_item import OrderItemSchema

# Business logic for the order module

@error_handler
def get_order(request):
	id = request.args.get("id")

	session = session_factory()

	try:
		order_object = session.query(Order).get(id)
		schema = OrderSchema()
		order, errors = schema.dump(order_object)
	except Exception as error:
		return (error)
	

	session.close()
	return order, 200

@error_handler
def edit_order(data):
	return "Okay", 200

@error_handler
def get_all_orders(request):
	# todo: Use url query params to filter in db query
	OrderItemStatus = string_to_bool(request.args.get("Status", None))
	session = session_factory()

	order_objects = session.query(Order).all()
	schema = OrderSchema(many=True)
	orders, errors = schema.dump(order_objects)

	if OrderItemStatus != None:
		order_objects = session.query(OrderItem).filter(OrderItem.Status == OrderItemStatus)
	else:
		order_objects = session.query(OrderItem).all()

	orders, errors = schema.dump(order_objects)

	session.close()
	return orders, 200