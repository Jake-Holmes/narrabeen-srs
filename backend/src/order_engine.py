from .decorators import error_handler
from .common_functions import string_to_bool, session_scope
from db.schemas.order import Order, OrderType, OrderStatus
from db.schemas.table import Table
from db.schemas.order_item import OrderItem, OrderItemStatus
from db.schemas.menu_item import MenuItem
from db.schemas.takeawayorder import TakeAwayOrder
from db.schemas.customer import Customer
from interface.schemas.order import OrderSchema
from interface.schemas.order_item import OrderItemSchema
from interface.schemas.takeawayorder import TakeAwayOrderSchema
from sqlalchemy import exists
from datetime import datetime

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

@error_handler
def add_table_order(request):
	qr_code = str(request.args.get("qr_code", None))
	menu_items_data = request.get_json()

	with session_scope() as session:
		table = session.query(Table).filter(Table.qr_code == qr_code).scalar()
		
		if table != None:
			if table.order == None or table.order.status == OrderStatus.paid:
				order = Order("confirmed", "dinein") # Create new order
				return_msg = "Order received"
			else:
				order = table.order # Append existing order
				return_msg = "Order items added to order"

			order_items = []
			for menu_item_id in menu_items_data:
				menu_item = session.query(MenuItem).get(int(menu_item_id))
				order_item = OrderItem(None, float(menu_item.base_price), "confirmed", menu_item)
				order.order_items.append(order_item)
				order_items.append(order_item)

			table.order = order
			session.add_all(order_items)
			session.add(order)
		else:
			return "Code incorrect", 401

	return return_msg, 200

@error_handler
def get_table_bill(request):
	qr_code = str(request.args.get("qr_code", None))
	schema = OrderSchema()

	with session_scope() as session:
		table = session.query(Table).filter(Table.qr_code == qr_code).scalar()
		if table != None:
			order, errors = schema.dump(table.order)
		else:
			return "Code incorrect", 401

	return order, 200

@error_handler
def pay_table_bill(request):
	qr_code = str(request.args.get("qr_code", None))
	schema = OrderSchema()

	with session_scope() as session:
		table = session.query(Table).filter(Table.qr_code == qr_code).scalar()
		if table != None:
			table.order.status = OrderStatus.paid
			for order_item in table.order.order_items:
				order_item.status = OrderItemStatus.paid

			order, errors = schema.dump(table.order)
		else:
			return "Code incorrect", 401

	return order, 200

@error_handler
def add_takeaway_order(request):
	menu_items_data = request.get_json()
	customer_id = request.args.get("id", None)
	pickup_time_data = request.args.get("time", None)

	pickup_time = datetime.strptime(pickup_time_data, "%Y-%m-%dT%H:%M:%SZ")

	with session_scope() as session:
		# get customer
		customer = session.query(Customer).get(customer_id)
		
		for takeawayorder in customer.takeawayorders:
			if takeawayorder.order.status != OrderStatus.paid:
				return "Error: Customer already has takewayorder", 400

		# create order
		order = Order("confirmed", "takeaway")

		# add order items to order
		order_items = []
		for menu_item_id in menu_items_data:
			menu_item = session.query(MenuItem).get(menu_item_id)
			order_item = OrderItem(None, float(menu_item.base_price), "confirmed", menu_item)
			order.order_items.append(order_item)
			order_items.append(order_item)

		session.add_all(order_items)
		session.add(order)

		# add takeaway order
		takeawayorder = TakeAwayOrder(pickup_time)
		takeawayorder.customer = customer
		takeawayorder.order = order

		session.add(takeawayorder)
		session.commit()

		new_takeawayorder, errors = TakeAwayOrderSchema().dump(takeawayorder)

	return new_takeawayorder, 200

@error_handler
def mark_takeaway_order_as_paid(request):
	takeaway_id = request.args.get("id", None)

	with session_scope() as session:
		takeaway_order = session.query(TakeAwayOrder).get(takeaway_id)
		if takeaway_order != None:
			takeaway_order.order.status = OrderStatus.paid
			for order_item in takeaway_order.order.order_items:
				order_item.status = OrderItemStatus.paid
		else:
			return "Bad request", 400

	return "Takeaway order marked as paid", 200