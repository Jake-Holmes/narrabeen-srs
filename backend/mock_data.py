orders_data = [
		{
			"date_created": "2007-12-31 23:00:00",
			"id": 1789,
			"is_paid": False,
			"order_type": "Takeaway",
			"table_id": 3,
			"takeaway_id": None,
			"status": "confirmed"
		},
        {
			"date_created": "2007-12-31 23:00:00",
			"id": 2,
			"is_paid": False,
			"order_type": "Takeaway",
			"table_id": 3,
			"takeaway_id": None,
			"status": "cooking"
		}
	]

order_items_data = [
        {
            "id": 1,
            "slot": 1,
            "price": 10.90,
            "name": "Chicken",
            "description": "some description",
            "status": "confirmed",
            "details": "Gluten free",
			"order_id": 1789
        },
		{
            "id": 2,
            "slot": 2,
            "price": 22.40,
            "name": "Beef",
            "description": "some description",
            "status": "cooking",
            "details": "Gluten free",
			"order_id": 2
        }
    ]