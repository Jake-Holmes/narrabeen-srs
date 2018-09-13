from functools import wraps

def error_handler(func):
    @wraps(func)
    def wrapper_handler(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            return ("Oops, something went wrong: " + repr(error), 500)
    return wrapper_handler