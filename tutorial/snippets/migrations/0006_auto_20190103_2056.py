# Generated by Django 2.1.3 on 2019-01-03 20:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0005_remove_orderitem_created'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='item',
            options={},
        ),
        migrations.AlterModelOptions(
            name='store',
            options={},
        ),
        migrations.AddField(
            model_name='orderitem',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
