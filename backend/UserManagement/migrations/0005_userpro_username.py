# Generated by Django 5.0.6 on 2024-06-02 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0004_userpro_token_access'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpro',
            name='username',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
