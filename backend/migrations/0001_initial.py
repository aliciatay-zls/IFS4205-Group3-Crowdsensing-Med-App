# Generated by Django 4.1 on 2022-09-10 11:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('userid', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('hashedpw', models.CharField(max_length=50)),
                ('salt', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('nric', models.CharField(max_length=9)),
                ('contact', models.CharField(max_length=8)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('emailverified', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('userid', models.OneToOneField(db_column='userid', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalStaff',
            fields=[
                ('userid', models.OneToOneField(db_column='userid', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('userid', models.OneToOneField(db_column='userid', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Researcher',
            fields=[
                ('userid', models.OneToOneField(db_column='userid', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HealthRecords',
            fields=[
                ('userid', models.OneToOneField(db_column='userid', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='backend.patient')),
                ('dateofbirth', models.DateField()),
                ('height', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('bloodtype', models.CharField(max_length=3)),
                ('allergies', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Examinations',
            fields=[
                ('sessionid', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('prescription', models.CharField(max_length=50)),
                ('sessiontime', models.DateTimeField(auto_now_add=True)),
                ('code', models.OneToOneField(db_column='code', on_delete=django.db.models.deletion.CASCADE, to='backend.diagnosis')),
                ('doctorid', models.OneToOneField(db_column='doctorid', on_delete=django.db.models.deletion.CASCADE, to='backend.doctor')),
                ('patientid', models.OneToOneField(db_column='patientid', on_delete=django.db.models.deletion.CASCADE, to='backend.patient')),
            ],
        ),
    ]