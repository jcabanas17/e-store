# Generated by Django 2.1.3 on 2018-11-25 20:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0006_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='stripeuser',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='deliverer',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='deliverer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderer',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='orderer', to=settings.AUTH_USER_MODEL),
        ),
    ]
