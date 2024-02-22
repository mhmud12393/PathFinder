from rest_framework import serializers
from .models import LinkStation, DevicePoint

class LinkStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkStation
        fields = '__all__'

class DevicePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevicePoint
        fields = '__all__'