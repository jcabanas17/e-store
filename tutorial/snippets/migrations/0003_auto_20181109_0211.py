# Generated by Django 2.1.3 on 2018-11-09 02:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0002_item'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='snippet',
            name='owner',
        ),
        migrations.DeleteModel(
            name='Snippet',
        ),
    ]