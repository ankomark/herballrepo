import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState(''); // For Sign Up and Login
  const [password, setPassword] = useState(''); // For Sign Up and Login
  const [message, setMessage] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', image_url: '', description: '', prescription: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // State for Sign Up and Login forms
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // State to toggle the Create Medicine form
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMedicines();
    if (isLoggedIn) fetchCart();
  }, [isLoggedIn]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { username, password });
      setMessage('User created successfully');
      setShowSignUp(false); // Hide the sign-up form after successful sign-up
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', { username, password });
      setMessage('Logged in successfully');
      setIsLoggedIn(true);
      setShowLogin(false); // Hide the login form after successful login
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();
    if (editMedicine) {
      await axios.put(`http://localhost:5000/medicines/${editMedicine.id}`, newMedicine);
      setMessage('Medicine updated successfully!');
      setEditMedicine(null);
    } else {
      await axios.post('http://localhost:5000/medicines', newMedicine);
      setMessage('Medicine added successfully!');
    }
    fetchMedicines();
    setNewMedicine({ name: '', image_url: '', description: '', prescription: '' });
    setShowCreateForm(false); // Hide form after submission
  };

  const deleteMedicine = async (id) => {
    await axios.delete(`http://localhost:5000/medicines/${id}`);
    setMessage('Medicine deleted successfully!');
    fetchMedicines();
  };

  const editMedicineForm = (medicine) => {
    setNewMedicine(medicine);
    setEditMedicine(medicine);
    setShowCreateForm(true);  // Show the form in edit mode
  };

  const addToCart = async (medicineId) => {
    await axios.post('http://localhost:5000/cart', { medicine_id: medicineId });
    setMessage('Medicine added to cart!');
    fetchCart();
  };

  // Toggle the create medicine form
  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditMedicine(null); // Reset the form for creating a new medicine
  };

  // Toggle the Sign Up form
  const toggleSignUpForm = () => {
    setShowSignUp(!showSignUp);
  };

  // Toggle the Login form
  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Herbal Remedy System</h1>
        <div className="navbar-links">
          <button onClick={toggleSignUpForm}>Sign Up</button>
          <button onClick={toggleLoginForm}>Login</button>
        </div>
      </nav>

      <div className="container">
        {message && <p>{message}</p>}

        {/* Toggle Create Medicine Button */}
        {isLoggedIn && (
          <button onClick={toggleCreateForm} className="create-btn">
            <span>+</span> {/* Icon for Create */}
          </button>
        )}

        {/* Medicine Creation Form */}
        {showCreateForm && (
          <form onSubmit={addMedicine} className="medicine-form">
            <h2>{editMedicine ? 'Edit Medicine' : 'Create Medicine'}</h2>
            <input
              type="text"
              placeholder="Name"
              value={newMedicine.name}
              onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newMedicine.image_url}
              onChange={(e) => setNewMedicine({ ...newMedicine, image_url: e.target.value })}
              required
            />
            <textarea
              placeholder="Description"
              value={newMedicine.description}
              onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Prescription"
              value={newMedicine.prescription}
              onChange={(e) => setNewMedicine({ ...newMedicine, prescription: e.target.value })}
              required
            />
            <button type="submit">{editMedicine ? 'Update' : 'Add'} Medicine</button>
          </form>
        )}

        {/* Medicines List and CRUD Operations */}
        {isLoggedIn && (
          <div className="medicine-list">
            {medicines.map((medicine) => (
              <div key={medicine.id} className="medicine-card">
                <h2>{medicine.name}</h2>
                <img src={medicine.image_url} alt={medicine.name} />
                <p>{medicine.description}</p>
                <p>
                  <strong>Prescription:</strong> {medicine.prescription}
                </p>
                <button onClick={() => editMedicineForm(medicine)}>Edit</button>
                <button onClick={() => deleteMedicine(medicine.id)}>Delete</button>
                <button onClick={() => addToCart(medicine.id)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}

        {/* Sign Up Form */}
        {showSignUp && (
          <form onSubmit={signup} className="auth-form">
            <h2>Sign Up</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}

        {/* Login Form */}
        {showLogin && (
          <form onSubmit={login} className="auth-form">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
