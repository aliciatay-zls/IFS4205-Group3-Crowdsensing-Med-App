from rest_framework import serializers
from backend.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'name']

class PatientSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingSessions
        fields = ['session_id']
