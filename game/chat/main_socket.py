import asyncio, json
from . views import endpoint
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer
# from asgiref.sync import sync_to_async
from . cons import User, Match
import requests

connects = {}

class main_socket(AsyncWebsocketConsumer):
    async def connect(self):
        print("----------------Main socket connected----------------")
        # global room_name
        await self.accept()
        self.avaible = True
        query_string = self.scope['query_string'].decode().split('&')
        token = query_string[0].split('=')[1]
        # id = query_string[1][1]
        data = endpoint(token)
        self.user = User(data[0])
        # self.group_name = room_name
        # room_name = 'room_' + datetime.now().time().strftime("%H_%M_%S_%f")
        connects[self.user.username] = self
        headers = {'Authorization': f'Token {token}'}
        body = {
            'is_online': True,
        }
        url = f'http://auth:8000/api/tasks/{self.user.id}/'
        requests.patch(url=url, headers=headers, data=body)

    async def receive(self, text_data):
        global room_name
        data = json.loads(text_data)
        if data.get('type') == 'room.create':
            await connects[data.get('vs')].send(json.dumps({'type':'game.challenge', 'vs': self.user.serialize_User()}))
            self.room_name = 'room_' + datetime.now().time().strftime("%H_%M_%S_%f")
        elif data.get('type') == 'room.refuse':
            await connects[data.get('vs')].send(json.dumps({'type':'game.refuse', 'vs': self.user.serialize_User()}))

    async def send_data(self, event):
        if self.avaible:
            await self.send(event['data'])

    async def disconnect(self, event):
        print("----------Main socket disconnect-----------")
        query_string = self.scope['query_string'].decode().split('&')
        token = query_string[0].split('=')[1]
        connects[self.user.username] = self
        headers = {'Authorization': f'Token {token}'}
        body = {
            'is_online': False,
        }
        url = f'http://auth:8000/api/tasks/{self.user.id}/'
        requests.patch(url=url, headers=headers, data=body)
        del connects[self.user.username]