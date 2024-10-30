Herbal Remedy System Backend
## Overview
The Herbal Remedy System Backend is built using Flask and serves as the API for managing herbal medicine information, user authentication, and shopping cart functionalities. This backend connects to a PostgreSQL database and provides endpoints for users to interact with the system.

## Features
User Authentication: Secure signup, login, and logout functionalities.
CRUD Operations: Create, read, update, and delete operations for herbal medicines.
Cart Management: Add and view medicines in a user's cart.
CORS Support: Cross-Origin Resource Sharing is enabled to allow requests from different origins.

## Technologies Used
Flask: Python web framework for building the API.
Flask-SQLAlchemy: ORM for database management.
Flask-Migrate: Database migration tool.
Flask-Bcrypt: Password hashing for secure user authentication.
PostgreSQL: Database for storing user and medicine information.
CORS: Middleware for handling cross-origin requests.

## Live Demo
You can view the live system here: https://herballrepo-3.onrender.com

Getting Started

## Prerequisites
Python 3.7 or higher
PostgreSQL
pip (Python package installer)

## Installation
Clone the repository:
git clone https://github.com/yourusername/herbalremedybackend.git
cd herbalremedybackend

Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install the dependencies:
pip install -r requirements.txt

Set up the database:
Update the database URI in app.py with your PostgreSQL credentials.

Run the migrations:
flask db init
flask db migrate
flask db upgrade

Start the server:
flask run
Open your browser or API client (like Postman) and navigate to http://localhost:5000 to interact with the API.

## API Endpoints
Authentication
POST /signup: Create a new user.
POST /login: Authenticate a user and start a session.
POST /logout: End the user session.

Medicines
GET /medicines: Retrieve a list of all medicines.
POST /medicines: Add a new medicine.
PUT /medicines/int:id: Update an existing medicine by ID.
DELETE /medicines/int:id: Delete a medicine by ID.

Contributing
Contributions are welcome! Feel free to submit a pull request or report any issues.