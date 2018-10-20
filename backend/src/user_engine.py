from base import session_factory
from sqlalchemy import exists
from .decorators import error_handler
from db.schemas.user import User
from interface.schemas.user import UserSchema
from .common_functions import session_scope

@error_handler
def get_all_users(request):
    schema = UserSchema(many=True)

    with session_scope() as session:
        user_objects = session.query(User).all()
        users, errors = schema.dump(user_objects)

    return users, 200

@error_handler
def add_user(request):
    user_data = request.get_json()
    schema = UserSchema()
    valid_user, errors = schema.load(user_data)
    if errors:
        return ("Error: unable to map object", 422)

    user = User(**valid_user)

    with session_scope() as session:
        if session.query(exists().where(User.username==user.username)).scalar():
            return ("Error: Username taken", 400)

        session.add(user)
        new_user = schema.dump(user).data

    return new_user, 201