from rest_framework import serializers

from UserManagement.models import UserPro 

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPro
        fields = '__all__'