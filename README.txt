#Creating ENVIROMENT by 
python -m venv venv

#Activizing ENVIROMENT
venv/scripts/activate

#Updating PIP by
python -m pip install --upgrade pip

#Installing FRAMEWORK
pip install django

#Creating PROJECT
django-admin startproject store_project

#Move to the PROJECT
cd store_project

#Creating APP
python manage.py startapp store

#Connect Base DATA and creating HELPING
python manage.py migrate

#Run SERVER
python manage.py runserver

#Stop SERVER
Ctrl+C

#Change DATABASE
python manage.py makemigrations
python manage.py migrate

#Creating ADMIN 
python manage.py createsuperuser

#Working IMAGES
pip install pillow