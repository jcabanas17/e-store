# Generated by Django 2.1.3 on 2018-11-09 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
