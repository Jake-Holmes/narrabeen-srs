from flask import jsonify
from base import session_factory
from .decorators import error_handler
from db.schemas.user import User, UserSchema

@error_handler
def get_users(request):
    session = session_factory()
    user_objects = session.query(User).all()
    schema = UserSchema(many=True)
    users = schema.dump(user_objects)[0]
    session.close()
    return (jsonify(users), 200)

@error_handler
def add_user(request):
    try:
        user_data = request.get_json()
        schema = UserSchema()
        schema_obj = schema.load(user_data)
        user = schema_obj[0]
        errors = schema_obj[1]
        if errors:
            return ("Error: unable to map object", 422)
    except Exception as error:
        return (error)

    session = session_factory() # Open db session
    session.add(user) # Add user row
    session.commit() # Commit changes

    new_user = schema.dump(user).data # Return created user

    session.close() # Close session
    return (jsonify(new_user), 201)