from flask import jsonify
from base import session_factory
from .decorators import error_handler
from db.schemas.user import User
from interface.schemas.user import UserSchema

@error_handler
def get_users(request):
    session = session_factory() # Open db session

    user_objects = session.query(User).all() # Query all Users
    schema = UserSchema(many=True)
    users, errors = schema.dump(user_objects) # Dump user db objects to schema

    session.close()
    return (jsonify(users), 200)

@error_handler
def add_user(request):
    try:
        user_data = request.get_json()
        schema = UserSchema()
        valid_user, errors = schema.load(user_data)
        if errors:
            return ("Error: unable to map object", 422)
    except Exception as error:
        return (error)

    user = User(**valid_user) # Map valid user data to User db object
    session = session_factory() # Open db session
    session.add(user) # Add user row
    session.commit() # Commit changes

    new_user = schema.dump(user).data # Return created user

    session.close()
    return (jsonify(new_user), 201)