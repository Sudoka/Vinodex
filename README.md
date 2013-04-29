Running the server
------------------

You should run the server in a virtualenv. This can be done like so:

    pip install virtualenv
    virtualenv venv

Then, you should install the requirements for the project:

    pip install -r requirements.txt

Finally, you can run the server like so:

    cd wine
    python manage.py runserver
	
Group Credentials
------------------

These are the shared group credentials, our gmail/aws account information is the same

    UN: cse110s.wtf@gmail.com
    PW: cse110s@WTF

Database Setup
---------------

We require a Postgresql database with the postgis extension installed.

On OS X `postgis` can be installed by running the commands:

    brew install postgis
    initdb /usr/local/var/postgres

After creating your database, run

    CREATE EXTENSION postgis;

on the database.

Finally, you can run the migrations:

    python wine/manage.py syncdb
    python wine/manage.py migrate wine

Linting
-------

To lint your code:

    ./lint

**Note:** You may need to run this command to make this file executable:

    chmod a+x lint
