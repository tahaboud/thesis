# Generated by Django 3.2.3 on 2021-09-09 20:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('Assets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='supplier',
            name='added_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.account'),
        ),
    ]
