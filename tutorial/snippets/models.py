from django.db import models
from datetime import datetime

# POST SAVE imports
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Auth token generation imports
from django.contrib.auth.models import User

class Store(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.name

class Item(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    store = models.ForeignKey('Store', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title

class Order(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    orderer = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='orderer', null=True, blank=True)
    deliverer = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='deliverer', null=True, blank=True)
    store = models.ForeignKey('Store', on_delete=models.CASCADE)
    deliv_lat = models.DecimalField(max_digits=9, decimal_places=6)
    deliv_lng = models.DecimalField(max_digits=9, decimal_places=6)
    items = models.ManyToManyField(
        Item, 
        through='OrderItem',
        through_fields=('order', 'item'),
        blank=True
    )

    @property
    def orderTotal(self):
        total = 0
        for item in self.items.all():
            total += item.price
            
        return total

class OrderItem(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    count = models.IntegerField(default=1)
    order = models.ForeignKey(Order, blank=True, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, blank=True, on_delete=models.CASCADE)

class StripeUser(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    stripe_account_id = models.CharField(max_length=100)

################# TUTORIAL CODE #################
# from pygments.lexers import get_all_lexers
# from pygments.styles import get_all_styles
# from pygments.lexers import get_lexer_by_name
# from pygments.formatters.html import HtmlFormatter
# from pygments import highlight

# LEXERS = [item for item in get_all_lexers() if item[1]]
# LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
# STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

# class Snippet(models.Model):
#     created = models.DateTimeField(auto_now_add=True)
#     title = models.CharField(max_length=100, blank=True, default='')
#     code = models.TextField()
#     linenos = models.BooleanField(default=False)
#     language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
#     style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)
#     owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)
#     highlighted = models.TextField()

#     class Meta:
#         ordering = ('created',)

#     def save(self, *args, **kwargs):
#         lexer = get_lexer_by_name(self.language)
#         linenos = 'table' if self.linenos else False
#         options = {'title': self.title} if self.title else {}
#         formatter = HtmlFormatter(style=self.style, linenos=linenos,
#             full=True, **options)
#         self.highlighted = highlight(self.code, lexer, formatter)
#         super(Snippet, self).save(*args, **kwargs)



