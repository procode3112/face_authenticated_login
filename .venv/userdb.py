import mysql.connector
from mysql.connector import Error

def connect_to_database():
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='mydb',
                                             user='',
                                             password='')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()

            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)

            cursor.execute("SELECT username, password FROM users")
            data = cursor.fetchall()

            user = {}
            for username, password in data:
                user[username] = password

            return user

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def provide_photo():
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='mydb',
                                             user='sqluser',
                                             password='password')
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()

            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)

            cursor.execute("SELECT username, photo FROM users")
            data = cursor.fetchall()

            users = {}
            for username, photo in data:
                users[username] = photo
                
            return users

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

print(connect_to_database())
# print(provide_photo())
