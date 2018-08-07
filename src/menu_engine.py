from . import menu_access as ma

# Menu module to implement business logic

def get_menu(conf):
	'''Pull the active menu from the database'''
	
	menu = ma.query_active_menu(conf)
	
	return menu
	
def get_all_dishes(conf):
	'''Get all active and inactive dishes from the menu'''
	
	# Logic to restrict this call to a manager goes here
	
	
	items = ma.query_all_dishes(conf)
	
	return items
