from .decorators import error_handler
from .common_functions import string_to_bool, session_scope
from db.schemas.order import Order
from db.schemas.order_item import OrderItem
from interface.schemas.order import OrderSchema
from interface.schemas.order_item import OrderItemSchema
from sqlalchemy import exists

# Business logic for the order module

@error_handler
def get_order(request):
	id = request.args.get("id")
	schema = OrderSchema()

	with session_scope() as session:
		order_object = session.query(Order).get(id)
		order, errors = schema.dump(order_object)

	return order, 200

@error_handler
def edit_order(data):
	return "Okay", 200

@error_handler
def edit_order_status(request):
	param_id = request.args.get("id")
	param_status = request.args.get("status")
	param_slot = request.args.get("slot")
	# Counter to track number of ready order items in specific order
	ready_count = 0

	with session_scope() as session:
		order_item = session.query(OrderItem).get(param_id)
		order_item.status = param_status
		# Check if order item is 'ready'
		if param_status=="ready":
			order_item.slot = param_slot
		# Check if all order items with order_item.order_id have status = ready
		list_same_order = session.query(OrderItem).filter(OrderItem.order_id==order_item.order_id)
		# Number of order items with same order id
		rows_count = list_same_order.count()
		# Identify which order items are ready
		for items in list_same_order:
			if items.status=="ready":
				ready_count = ready_count + 1
		# Check if all order items are ready
		if ready_count==rows_count:
			# All order items are ready, change order status to ready
			order = session.query(Order).get(order_item.order_id)
			order.status = "ready"

	return ("Edit order status successful", 200)

@error_handler
def get_all_orders(request):
	status = request.args.get("status", None)
	schema = OrderSchema(many=True, exclude=("order_items",))

	with session_scope() as session:
		if status != None:
			order_objects = session.query(Order).filter(Order.status == status)
		else:
			order_objects = session.query(Order).all()

		orders, errors = schema.dump(order_objects)

	return orders, 200

@error_handler
def get_all_order_items(request):
	status = request.args.get("status", None)
	schema = OrderItemSchema(many=True)

	with session_scope() as session:
		if status != None:
			order_item_objects = session.query(OrderItem).filter(OrderItem.status == status)
		else:
			order_item_objects = session.query(OrderItem).all()

		order_items, errors = schema.dump(order_item_objects)

	return order_items, 200