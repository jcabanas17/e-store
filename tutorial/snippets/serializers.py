from rest_framework import serializers
from snippets.models import Item, Store, Order, StripeUser
from django.contrib.auth.models import User

class ItemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Item
        fields = ('url', 'id', 'created', 'title', 'price', 'store')

class StoreSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Store
        fields = ('url', 'id', 'created', 'name', 'lat', 'lng')

class OrderSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Order
        fields = ('url', 'id', 'created', 'orderer', 'deliverer', 'store', 'deliv_lat', 'deliv_lng')

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'password')

class StripeUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = StripeUser
        fields = ('url', 'id', 'created', 'user', 'stripe_account_id')


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