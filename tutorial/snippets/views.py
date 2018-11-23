from snippets.models import Item, Store, Order, StripeUser
from snippets.serializers import ItemSerializer, StoreSerializer, OrderSerializer, UserSerializer, StripeUserSerializer
from rest_framework import viewsets, generics
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class StoreViewSet(viewsets.ModelViewSet):
	queryset = Store.objects.all()
	serializer_class = StoreSerializer

class OrderViewSet(viewsets.ModelViewSet):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class StripeUserViewSet(viewsets.ModelViewSet):
    queryset = StripeUser.objects.all()
    serializer_class = StripeUserSerializer


################# TUTORIAL CODE #################
# from snippets.models import Snippet
# from snippets.serializers import SnippetSerializer, UserSerializer
# from rest_framework import permissions
# from django.contrib.auth.models import User
# from snippets.permissions import IsOwnerOrReadOnly
# from rest_framework.response import Response
# from rest_framework.reverse import reverse
# from rest_framework import renderers
# from rest_framework.decorators import action

# class SnippetViewSet(viewsets.ModelViewSet):
#     """
#     This viewset automatically provides `list`, `create`, `retrieve`,
#     `update` and `destroy` actions.

#     Additionally we also provide an extra `highlight` action.
#     """
#     queryset = Snippet.objects.all()
#     serializer_class = SnippetSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,
#                           IsOwnerOrReadOnly,)

#     @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
#     def highlight(self, request, *args, **kwargs):
#         snippet = self.get_object()
#         return Response(snippet.highlighted)

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

# class UserViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     This viewset automatically provides `list` and `detail` actions.
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# @api_view(['GET'])
# def api_root(request, format=None):
#     return Response({
#         'users': reverse('user-list', request=request, format=format),
#         'snippets': reverse('snippet-list', request=request, format=format)
#     })




