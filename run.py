from flask import Flask, flash, redirect, render_template, request, url_for ,session,jsonify,json,Blueprint
from flask_socketio import SocketIO,send,emit,join_room
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
from werkzeug.security import generate_password_hash, check_password_hash
import datetime, math
from functools import wraps
from datetime import date, timedelta
from flask_cors import CORS
import json
from models.database import *
from models.login import login
from models.evacuation_centers import evacuation_centers


from flask_uploads import UploadSet, configure_uploads, IMAGES

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','tif','tiff'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)
CORS(app,resources={r"/*":{"origins":"*"}})
IMAGE_FOLDER = os.path.join('static', 'image')
app.secret_key = '&^##*($top_secret&&#(@(@":f'
app.config['UPLOADED_PHOTOS_DEST'] = 'static/image'
app.config['UPLOAD_FOLDER'] = IMAGE_FOLDER
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)

app.register_blueprint(login,url_prefix="/")
app.register_blueprint(evacuation_centers,url_prefix="/")


socketio = SocketIO(app,cors_allowed_origins="*")
user_private = {}

@socketio.on('saved_evac_data',namespace='/save_evac')
def receive_message_from_user(message):
	try:
		print(message, "This is a socket IO")
		sel_count = "select * from tbl_evacuation_centers where evac_status = 0"
		data = pyread(sel_count)
		emit('saved_evac_data_callback', data,broadcast=True)
	except Exception as e:
		prnt_R(e)
		raise e

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/login')
def login():
	return render_template('login.html')

@app.route('/admin_management')
def admin_management():
	if 'index' in session:
		ses_user=session['sessioned_user'];
		ses_token=session['sessioned_token'];
		return render_template('admin_user/admin_management.html',ses_token=ses_token,ses_user=ses_user)
	else:
		return render_template('login.html')

@app.route('/evacuation_centers')
def evacuation_centers():
	if 'index' in session:
		ses_user=session['sessioned_user'];
		ses_token=session['sessioned_token'];
		return render_template('admin_user/evacuation_centers.html',ses_token=ses_token,ses_user=ses_user)
	else:
		return render_template('login.html')


@app.route('/logout')
def logout():
	if 'index' in session:	
		prnt_G("welcome")
		ses_token=session['sessioned_token'];
		del_q = "delete from tbl_token where token = '"+str(ses_token)+"'"
		crud_p(del_q)
		session.clear()
		return render_template('login.html',ses_token=ses_token)
	else:
		print("You're not in session")
		return render_template('login.html')




if __name__ == "__main__":
    # socketio.run(app,ssl_context=('cert.pem', 'key.pem'),debug=True,port=1200,host='0.0.0.0')
	socketio.run(app,debug=True,port=5000,host='0.0.0.0',)