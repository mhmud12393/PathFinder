from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'calculator', views.LinkStationViewSet, basename='calculator')

urlpatterns = [
    path('', include(router.urls)),
    path('calculate/<int:x>/<int:y>/', views.calculate_best_link_station, name='calculate'),
]