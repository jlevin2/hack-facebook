import os
import sys
import psycopg2
import argparse
import time


TABLES = [
    "CREATE SCHEMA storage;",
    "CREATE TABLE storage.page_history (page_id VARCHAR(255), trigger_content VARCHAR(255), probability FLOAT);"
]

def buildDB():
    os.system('initdb -D ../database/ -U service -W')

# to start the system
def start():
    os.system('pg_ctl -D . -l ../database/logfile start')

def buildtables():
    conn_string = "host='localhost' dbname='postgres' user='service' password='PeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H'"

    conn = psycopg2.connect(conn_string)

    cursor = conn.cursor()

    for table in TABLES:
        cursor.execute(table)
    cursor.close()
    conn.close()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-c", "--command", help="ALL, INITIALIZE, SETUP, RUN",
                        action="store")
    args = parser.parse_args()

    if args.command.lower() == 'all':
        buildDB()
        time.sleep(0.5)
        start()
        time.sleep(0.5)
        buildtables()
    elif args.command.lower() == 'initialize':
        buildDB()
    elif args.command.lower() == 'setup':
        buildtables()
    elif args.command.lower() == 'run':
        start()


if __name__ == '__main__':
    main()