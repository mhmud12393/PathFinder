import math
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import LinkStation 
from .serializers import LinkStationSerializer

# Defining a ViewSet for the LinkStation model
class LinkStationViewSet(viewsets.ModelViewSet):
    queryset = LinkStation.objects.all()  # Query to get all LinkStation objects (SELECT * FROM LinkStation)
    serializer_class = LinkStationSerializer  # Serializer for LinkStation objects (converts to/from JSON)

# API view to calculate the best link station for given coordinates
@api_view(['GET'])
def calculate_best_link_station(request, x, y):
    try:
        x, y = int(x), int(y)  # Convert the coordinates to integers
    except ValueError:
        # Raise an error if the coordinates are not valid numbers
        raise ValidationError({"error": "Invalid coordinates. Both x and y should be numbers."})

    max_power = 0  # Initialize max power as 0
    best_station = None  # Initialize best station as None

    # Iterate over all LinkStation objects
    for station in LinkStation.objects.all():
        # Calculate the distance from the station to the point
        distance = math.sqrt((station.x - x) ** 2 + (station.y - y) ** 2)
        # If the point is within the station's range
        if distance <= station.r:
            # Calculate the power of the link station at the point
            power = (station.r - distance) ** 2
            # If the power is greater than the current max power
            if power > max_power:
                # Update max power and best station with the current power and station
                max_power, best_station = power, station

    # If a best station was found
    if best_station:
        # Serialize the best station
        serializer = LinkStationSerializer(best_station)
        # Return the point, best link station, and power
        return Response({
            'point': f'({x}, {y})',
            'best_link_station': serializer.data,
            'power': max_power
        }, status=status.HTTP_200_OK)
    else:
        # If no link station was found within reach, return a message
        return Response({
            'No link station within reach for point {},{}'.format(x, y)
        }, status=status.HTTP_200_OK)