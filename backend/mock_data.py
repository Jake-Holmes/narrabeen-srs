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

order_kitchen_data = [
    {
        "id": 1,
        "slot": 1,
        "price": 10.90,
        "name": "Chicken",
        "description": "some description",
        "status": "ordered",
        "details": "Gluten free",
        "order_id": 1789
    },
    {
        "id": 2,
        "slot": 2,
        "price": 22.40,
        "name": "Beef",
        "description": "some description",
        "status": "ordered",
        "details": "Gluten free",
        "order_id": 2
    }
]

order_ready_data = [
    {
        "id": 1,
        "slot": 1,
        "price": 10.90,
        "name": "Chicken",
        "description": "some description",
        "status": "ready",
        "details": "Gluten free",
        "order_id": 1789
    },
    {
        "id": 2,
        "slot": 2,
        "price": 22.40,
        "name": "Beef",
        "description": "some description",
        "status": "ready",
        "details": "Gluten free",
        "order_id": 2
    }
]

menu_item = [
    {
        "id": 101,
        "name": 'chicken',
        "type": 'poultry',
        "description": 'spicy',
        "image": 'chicken',
        "base_price": 13.50,
        "status": 'active'
    },
    {
        "id": 102,
        "name": 'fish',
        "type": 'seafood',
        "description": 'non-spicy',
        "image": 'fish',
        "base_price": 16.50,
        "status": 'active'
    },
    {
        "id": 103,
        "name": 'beef',
        "type": 'meat',
        "description": 'non-spicy',
        "image": 'beef',
        "base_price": 17.90,
        "status": 'active'
    },
    {
        "id": 104,
        "name": 'apple pie',
        "type": 'dessert',
        "description": 'sweet',
        "image": 'apple pie',
        "base_price": 6.50,
        "status": 'inactive'
    }
]

