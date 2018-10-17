from base import session_factory
from sqlalchemy import exists
from .decorators import error_handler
from db.schemas.user import User
from interface.schemas.user import UserSchema

@error_handler
def get_all_users(request):
    session = session_factory()

    user_objects = session.query(User).all()
    schema = UserSchema(many=True)
    users, errors = schema.dump(user_objects)

    session.close()
    return users, 200

@error_handler
def add_user(request):
    user_data = request.get_json()
    schema = UserSchema()
    valid_user, errors = schema.load(user_data)
    if errors:
        return ("Error: unable to map object", 422)

    user = User(**valid_user)

    session = session_factory()
    
    if session.query(exists().where(User.username==user.username)).scalar():
        session.close()
        return ("Error: Username taken", 400)

    session.add(user)
    session.commit()

    new_user = schema.dump(user).data

    session.close()
    return new_user, 201