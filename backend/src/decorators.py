from functools import wraps

def error_handler(func):
    @wraps(func)
    def wrapper_handler(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as error:
            print(repr(error))
            return ("Oops, something went wrong", 500)
    return wrapper_handler