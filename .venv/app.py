import cv2
import userdb
import face_recognition
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  

api = Api(app)

# Define user data (for demonstration)
usernpass = userdb.connect_to_database()
usernfaceid = userdb.provide_photo()

def authenticate(username, password):
    if username in usernpass and usernpass[username] == password:
        return True
    return False

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        # Authenticate the user
        if(authenticate(username, password) == False):
            return {"message": "Authentication failed"}, 401
        
        image_name = usernfaceid.get(username)
        if image_name is None:
            return {"message": "Image not found for user"}, 401

        image_path = f"C:/Users/pande/Desktop/my-login-app/images/{image_name}"

        # Initialize the webcam
        cap = cv2.VideoCapture(0)

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            face_locations = face_recognition.face_locations(frame)
            if len(face_locations) > 0:
                face_encoding = face_recognition.face_encodings(frame, face_locations)[0]

                # Compare the encoding with encodings of authorized users
                known_face_image = face_recognition.load_image_file(image_path)
                authorized_face_encoding = face_recognition.face_encodings(known_face_image)[0]

                matches = face_recognition.compare_faces([authorized_face_encoding], face_encoding)

                if any(matches):
                        cap.release()  # Release the webcam
                        cv2.destroyAllWindows()
                        return {"message": "Welcome User", "user": username}

            # Display the frame (you can remove or replace this part as needed)
            cv2.imshow('Webcam', frame)
            if cv2.waitKey(1) == ord('q'):
                break

        cap.release()  # Release the webcam
        cv2.destroyAllWindows()
        return {"message": "Facial recognition failed"}, 401

api.add_resource(Login, "/login")

if __name__ == "__main__":
    app.run(debug=True)
