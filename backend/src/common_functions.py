def string_to_bool(data):
    if data in ("true", "True"):
        return True
    elif data in {"false", "False"}:
        return False
    else:
        return None