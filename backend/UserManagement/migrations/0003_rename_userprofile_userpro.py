# Generated by Django 5.0.6 on 2024-06-02 16:15

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0002_match'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserProfile',
            new_name='UserPro',
        ),
    ]
