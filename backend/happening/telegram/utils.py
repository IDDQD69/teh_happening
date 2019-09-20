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
    secret_key = hashlib.sha256(token.encode()).digest()
    dag = hmac.new(data_check_string.encode(), secret_key, hashlib.sha256).hexdigest()
    print('dag', dag)
    print('hash', login_hash)
    return True
