from .decorators import error_handler
from .common_functions import string_to_bool, session_scope
from db.schemas.order import Order, OrderType, OrderStatus
from db.schemas.table import Table
from db.schemas.order_item import OrderItem, OrderItemStatus
from db.schemas.menu_item import MenuItem
from interface.schemas.order import OrderSchema
from interface.schemas.order_item import OrderItemSchema

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
	menu_item_dict = request.get_json()

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
			for menu_item_id in menu_item_dict:
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