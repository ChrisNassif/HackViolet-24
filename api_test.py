import requests

url = "http://127.0.0.1:8000/predict"
params = {"data": "I hate women"}

response = requests.post(url, params=params)

print(response.text)