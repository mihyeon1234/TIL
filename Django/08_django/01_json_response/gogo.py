# gogo.py

import requests
from pprint import pprint


response = requests.get('http://127.0.0.1:8000/api/v1/json-3/')
result = response.json()

<<<<<<< HEAD
pprint(result)
# pprint(result[0])
# pprint(result[0].get('title'))
=======
# pprint(result)
# pprint(result[0])
pprint(result[0].get('title'))
>>>>>>> caec6716b679e379072aff9bdc3495ebcece383a
