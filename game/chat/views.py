from django.shortcuts import render, redirect
import requests

def endpoint(token):
    headers = {'Authorization': f'Token {token}'}
    url = f'http://auth:8000/tasks/'
    response = requests.get(url, headers=headers)
    data = None
    print(response.status_code, "-----------------response.status_code------------------")
    if response.status_code == 200:
        data = response.json()
        for task in data:
            task['photo_profile'] = task['photo_profile'].replace('http://auth:8000/', '')
    return data