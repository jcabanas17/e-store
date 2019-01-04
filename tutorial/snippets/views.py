from snippets.models import Item, Store, Order, StripeUser, OrderItem
from snippets.serializers import ItemSerializer, StoreSerializer, OrderSerializer, OrderItemSerializer, UserSerializer, StripeUserSerializer
from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from django.http import JsonResponse, HttpResponse

from snippets.permissions import IsAdminUserOrReadOnly
from django.utils import timezone

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = (permissions.IsAuthenticated, IsAdminUserOrReadOnly)

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    # permission_classes = (permissions.IsAuthenticated, IsAdminUserOrReadOnly)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = (permissions.IsAuthenticated, )

    def create(self, request):
        print(request.data)

        store = None
        if request.data['store'] != None:
            storeId = int(request.data['store'][:-1].split('stores/')[1])
            store = Store.objects.get(id=storeId)

        orderer = None
        if request.data['orderer'] != None: 
            ordererId = int(request.data['orderer'][:-1].split('users/')[1])
            orderer = User.objects.get(id=ordererId)

        deliverer = None
        if request.data['deliverer'] != None: 
            print(request.data['deliverer'])
            delivererId = int(request.data['deliverer'][:-1].split('users/')[1])
            deliverer = User.objects.get(id=delivererId)

        order = Order.objects.create(
            orderer = orderer,
            deliverer = deliverer,
            store = store,
            deliv_lat = request.data['deliv_lat'],
            deliv_lng = request.data['deliv_lng'],
        )

        for orderitem in request.data['items']:
            count = orderitem['count']
            item = orderitem['item']
            if item != None:
                itemId = int(item[:-1].split('items/')[1])
                itemInstance = Item.objects.get(id=itemId)
            orderItemIstance = OrderItem.objects.create(count=count, item=itemInstance, order=order)
            order.save()

        return JsonResponse({'success': 'true'}, status=201)

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (permissions.IsAuthenticated,)
    def create(self, request):
        print(request.data)
        try:
            is_staff = False
            if 'is_staff' in request.data and request.data['is_staff'] == 'true':
                is_staff = True

            user = User.objects.create_user(username=request.data['username'], password=request.data['password'], is_staff=is_staff)

        except Exception as e:
            return JsonResponse({'success': 'false', 'error': str(e)}, status=400)

        return JsonResponse({'success': 'true'}, status=201)

class StripeUserViewSet(viewsets.ModelViewSet):
    queryset = StripeUser.objects.all()
    serializer_class = StripeUserSerializer
    # permission_classes = (permissions.IsAuthenticated,)

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




