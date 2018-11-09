from django.urls import path, include
from rest_framework.routers import DefaultRouter
from snippets import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'items', views.ItemViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

################# TUTORIAL CODE #################
# router.register(r'snippets', views.SnippetViewSet)
# router.register(r'users', views.UserViewSet)
################# TUTORIAL CODE #################

