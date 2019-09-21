import hmac
import hashlib
import os


def is_valid(login):
    token = os.environ['TELEGRAM_TOKEN']
    login_hash = login['hash']
    del login['hash']
    value_array = []
    for key in sorted(login.keys()):
        value_array.append(key + "=" + login[key])
    data_check_string = '\n'.join(value_array)
    secret_key = hashlib.sha256(token.encode())
    dag = hmac.new(
        msg=data_check_string.encode(),
        key=secret_key.digest(),
        digestmod=hashlib.sha256
    ).hexdigest()
    return dag == login_hash
