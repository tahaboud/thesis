# Generated by Django 3.2.3 on 2021-09-26 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Assets', '0008_alter_supplier_full_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tools',
            name='comment',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]