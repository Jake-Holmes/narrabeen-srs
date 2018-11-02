from contextlib import contextmanager
from base import session_factory
import string
import random

@contextmanager
def session_scope():
    session = session_factory()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()

def string_to_bool(data):
    if data in ("true", "True"):
        return True
    elif data in {"false", "False"}:
        return False
    else:
        return None

def generate_code(size=9, chars=string.ascii_uppercase + string.digits + string.ascii_lowercase):
    return ''.join(random.choice(chars) for _ in range(size))