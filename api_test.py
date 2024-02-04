import requests

url = "http://34.207.98.86:8000/predict"
data = {'data': ['I hate women']}

# Send data as JSON in the request body
response = requests.post(url, json=data)

print()
print(response.text)
