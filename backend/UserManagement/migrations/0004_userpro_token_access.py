# Generated by Django 5.0.6 on 2024-06-02 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserManagement', '0003_rename_userprofile_userpro'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpro',
            name='token_access',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]