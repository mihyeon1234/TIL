import requests

url='https://api.agify.io/?name=mihyeon'

print(requests.get(url).json())