from django.db import models

class LinkStation(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    r = models.IntegerField()  # Power

    def __str__(self):
        return f'LinkStation at ({self.x}, {self.y}) with reach {self.r}'

class DevicePoint(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()

    def __str__(self):
        return f'DevicePoint at ({self.x}, {self.y})'