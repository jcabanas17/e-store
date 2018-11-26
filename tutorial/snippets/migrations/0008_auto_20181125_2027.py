# Generated by Django 2.1.3 on 2018-11-25 20:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0007_auto_20181125_2022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='deliverer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='deliverer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='order',
            name='orderer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='orderer', to=settings.AUTH_USER_MODEL),
        ),
    ]
