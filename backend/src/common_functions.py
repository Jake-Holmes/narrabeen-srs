from contextlib import contextmanager
from base import session_factory

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