from . import menu_access as ma

# Menu module to implement business logic

def get_menu():
	'''Pull the active menu from the database'''
	
	menu = ma.query_active_menu()
	
	return menu
	
def get_all_dishes():
	'''Get all active and inactive dishes from the menu'''
	
	# Logic to restrict this call to a manager goes here
	
	items = ma.query_all_dishes()
	
	return items

def get_by_itemid(id):
	'''Get specific menu item by the ID'''

	item = ma.query_id_menu(id)

	return item