from rest_framework import serializers
from snippets.models import Item, Store, Order, OrderItem, StripeUser
from django.contrib.auth.models import User

class StoreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Store
        fields = '__all__'

class ItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'

class OrderItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = OrderItem
        fields = ('created', 'count', 'order', 'item')

class OrderSerializer(serializers.HyperlinkedModelSerializer):

    items = OrderItemSerializer(source='orderitem_set', many=True)

    class Meta:
        model = Order
        fields = ('url', 'created', 'orderer', 'deliverer', 'store', 'deliv_lat', 'deliv_lng', 'items')


class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'password', 'is_staff')

class StripeUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = StripeUser
        fields = '__all__'


################# TUTORIAL CODE #################
# from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES
# from django.contrib.auth.models import User

# class SnippetSerializer(serializers.HyperlinkedModelSerializer):
#     owner = serializers.ReadOnlyField(source='owner.username')
#     highlight = serializers.HyperlinkedIdentityField(view_name='snippet-highlight', format='html')

#     class Meta:
#         model = Snippet
#         fields = ('url', 'id', 'highlight', 'owner',
#                   'title', 'code', 'linenos', 'language', 'style')


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     snippets = serializers.HyperlinkedRelatedField(many=True, view_name='snippet-detail', read_only=True)

#     class Meta:
#         model = User
#         fields = ('url', 'id', 'username', 'snippets')