from urllib import request, parse, error

# Since the auth platform is hosted on the same machine as the narrabeen-srs, the host changes depending on if it is
# deployed in production or being tested on the local dev machine.
# Set to localhost:5001 for production deployment, or https://jakeholmes.me:5001 for local testing during development.
AUTH_HOST = 'https://jakeholmes.me:5001'
# AUTH_HOST = 'localhost:5001'

# Endpoint for the platform version being consumed.
AUTH_ENDPOINT = '/vaultish/vauth/v0/'

# Full request URL for the validate session endpoint
AUTH_VALIDATE_URL = AUTH_HOST + AUTH_ENDPOINT + 'validate'


def is_manager(session_id):

    # For now the in-development auth platform does not support different account roles.
    # Therefore we are hard coding the UUID of the narrabeen-srs accounts.

    # UUID for user narrabeen-admin
    uuid = 7937211315127948730
    return validate_session(uuid, session_id)


def is_staff(session_id):

    # For now the in-development auth platform does not support different account roles.
    # Therefore we are hard coding the UUID of the narrabeen-srs accounts.

    # UUID for user narrabeen-staff
    uuid = 1947234905763317675
    return validate_session(uuid, session_id)

def is_kitchen(session_id):

    # For now the in-development auth platform does not support different account roles.
    # Therefore we are hard coding the UUID of the narrabeen-srs accounts.

    # UUID for user narrabeen-kitchen
    uuid = 3329490443595619779
    return validate_session(uuid, session_id)


def validate_session(uuid, session_id):

    data = parse.urlencode({
        'uuid': uuid,
        'sessionId': session_id,
    }).encode()

    req = request.Request(AUTH_VALIDATE_URL, data=data)

    try:
        # Get the request response and return true only if response code is 200
        return request.urlopen(req).getcode() == 200

    except error.HTTPError as e:
        # Request could not be validated for given uuid and session
        return False
