from django.contrib import admin
from .models import UserPro , UserFriend, Request_friend, Match
# Register your models here.
admin.site.register(UserPro)
admin.site.register(UserFriend)
admin.site.register(Request_friend)
admin.site.register(Match)