#!/bin/bash

# until pg_isready -h $PostgreSQL -eq 0;
#     do
#         echo "waiting for PostgreSQL connection!"
#     done
sleep 12
echo "PostgreSQL is now running!"
echo "Starting Django server...."

# python manage.py makemigrations
# python manage.py migrate

python manage.py runserver 0.0.0.0:8001


