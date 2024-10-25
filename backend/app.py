# from flask import Flask, request, jsonify, session
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS
# from flask import send_from_directory
# app = Flask(__name__)
# CORS(app, supports_credentials=True)  # CORS now supports credentials for session management

# # Database configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///herbal_remedies.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'your_secret_key_here'
# app.config['SESSION_COOKIE_HTTPONLY'] = False  # Allow the session cookie to be used

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)
# migrate = Migrate(app, db)

# # User Model
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password = db.Column(db.String(120), nullable=False)

# # Medicine Model
# class Medicine(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     image_url = db.Column(db.String(255), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     prescription = db.Column(db.String(100), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

# # Cart Model
# class Cart(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     medicine_id = db.Column(db.Integer, db.ForeignKey('medicine.id'), nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# # Routes for Authentication
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()

#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'error': 'Missing username or password'}), 400

#     user = User.query.filter_by(username=data['username']).first()
#     if user:
#         return jsonify({'error': 'User already exists'}), 400

#     hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     new_user = User(username=data['username'], password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({'message': 'User created successfully!'}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()

#     if not data or 'username' not in data or 'password' not in data:
#         return jsonify({'error': 'Missing username or password'}), 400

#     user = User.query.filter_by(username=data['username']).first()
#     if not user or not bcrypt.check_password_hash(user.password, data['password']):
#         return jsonify({'error': 'Invalid username or password'}), 401

#     session['user_id'] = user.id
#     return jsonify({'message': 'Logged in successfully!', 'user': user.username}), 200

# @app.route('/logout', methods=['POST'])
# def logout():
#     session.pop('user_id', None)
#     return jsonify({'message': 'Logged out successfully!'}), 200
# @app.route('/')
# def serve():
#     return send_from_directory('path/to/build', 'index.html')

# @app.route('/<path:path>')
# def static_proxy(path):
#     return send_from_directory('path/to/build', path)
# # Routes for CRUD operations on Medicines
# @app.route('/medicines', methods=['GET'])
# def get_medicines():
#     medicines = Medicine.query.all()
#     medicines_list = [{'id': m.id, 'name': m.name, 'image_url': m.image_url, 'description': m.description, 'prescription': m.prescription} for m in medicines]
#     return jsonify(medicines_list), 200

# @app.route('/medicines', methods=['POST'])
# def add_medicine():
#     data = request.get_json()
#     new_medicine = Medicine(
#         name=data['name'],
#         image_url=data['image_url'],
#         description=data['description'],
#         prescription=data['prescription']
#     )
#     db.session.add(new_medicine)
#     db.session.commit()
#     return jsonify({"message": "Medicine added successfully!"}), 201

# @app.route('/medicines/<int:id>', methods=['PUT'])
# def update_medicine(id):
#     medicine = Medicine.query.get(id)
#     if not medicine:
#         return jsonify({'error': 'Medicine not found'}), 404

#     data = request.get_json()
#     medicine.name = data['name']
#     medicine.image_url = data['image_url']
#     medicine.description = data['description']
#     medicine.prescription = data['prescription']
#     db.session.commit()

#     return jsonify({'message': 'Medicine updated successfully!'}), 200

# @app.route('/medicines/<int:id>', methods=['DELETE'])
# def delete_medicine(id):
#     medicine = Medicine.query.get(id)
#     if not medicine:
#         return jsonify({'error': 'Medicine not found'}), 404

#     db.session.delete(medicine)
#     db.session.commit()

#     return jsonify({'message': 'Medicine deleted successfully!'}), 200

# # Route for adding medicine to the cart
# @app.route('/cart', methods=['POST'])
# def add_to_cart():
#     data = request.get_json()
#     if 'user_id' not in session:
#         return jsonify({'error': 'User not logged in'}), 401
    
#     new_cart_item = Cart(medicine_id=data['medicine_id'], user_id=session['user_id'])
#     db.session.add(new_cart_item)
#     db.session.commit()

#     return jsonify({'message': 'Medicine added to cart successfully!'}), 201

# # Route to view cart
# @app.route('/cart', methods=['GET'])
# def view_cart():
#     if 'user_id' not in session:
#         return jsonify({'error': 'User not logged in'}), 401

#     cart_items = Cart.query.filter_by(user_id=session['user_id']).all()
#     cart_list = [{'medicine_id': item.medicine_id} for item in cart_items]
#     return jsonify(cart_list), 200

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask import send_from_directory

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS with credentials support

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://app_db_y6fy_user:xYI98iDydxtIX7zv4y3PGPDj4hHxGLGz@dpg-csdv9hbv2p9s73b25bj0-a.oregon-postgres.render.com/herbal_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SESSION_COOKIE_HTTPONLY'] = True  # Ensures cookies are only sent via HTTP
app.config['SESSION_COOKIE_SAMESITE'] = 'None'  # Allows cross-site cookies for CORS

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Medicine Model
class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    prescription = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

# Cart Model
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicine.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Authentication Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({'error': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Missing username or password'}), 400

    user = User.query.filter_by(username=data['username']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401

    session['user_id'] = user.id
    return jsonify({'message': 'Logged in successfully!', 'user': user.username}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully!'}), 200

# CRUD for Medicines
@app.route('/medicines', methods=['GET'])
def get_medicines():
    medicines = Medicine.query.all()
    medicines_list = [{'id': m.id, 'name': m.name, 'image_url': m.image_url, 'description': m.description, 'prescription': m.prescription} for m in medicines]
    return jsonify(medicines_list), 200

@app.route('/medicines', methods=['POST'])
def add_medicine():
    data = request.get_json()
    new_medicine = Medicine(
        name=data['name'],
        image_url=data['image_url'],
        description=data['description'],
        prescription=data['prescription']
    )
    db.session.add(new_medicine)
    db.session.commit()
    return jsonify({"message": "Medicine added successfully!"}), 201

# Additional Routes...

if __name__ == '__main__':
    app.run(debug=True)
