from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserPro(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1, blank=True)
    photo_profile = models.ImageField(upload_to='User_profile', default="User_profile/default_profile.png")
    # token_access = models.CharField(max_length=255, blank=True)
    username = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    score = models.IntegerField(default=10)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    def __str__(self):
        return self.user.username

class UserFriend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=False, related_name="user_creator")
    friend = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.user.username + "_friend"
    
class Request_friend(models.Model):
    request_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_request")
    user_suggestion = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['request_user', 'user_suggestion'], name='unique_friend_request')
        ]
    def __str__(self):
        return "from_" + self.request_user.username + "_to_" + self.user_suggestion.username + "_Request"
class Player(models.Model):
    name = models.CharField(blank=True, null=False)
    score = models.IntegerField(default=0)

class Match(models.Model):
    player1 = models.CharField(blank=True, null=False)
    player2 = models.CharField(blank=True, null=False)
    date_match = models.DateTimeField()
    details = models.TextField()
    



