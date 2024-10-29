import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

function About() {
  return (
    <div>
      <h2>About Herbal Remedy System</h2>
      <p>We provide the best herbal remedies for various ailments. All our medicines are natural and carefully sourced.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>Email: info@herbalremedysystem.com</p>
      <p>Phone: +123 456 7890</p>
      <h3>Follow Us</h3>
      <div className="social-media-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="path/to/facebook-icon.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="path/to/twitter-icon.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="path/to/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="path/to/linkedin-icon.png" alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Herbal Remedy System. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', image_url: '', description: '', prescription: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('https://herballrepo-2.onrender.com/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines", error);
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://herballrepo-2.onrender.com/signup', { username, password });
      setMessage('User created successfully');
      setShowSignUp(false);
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://herballrepo-2.onrender.com/login', { username, password });
      setMessage('Logged in successfully');
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      setMessage('Invalid credentials');
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();
    if (editMedicine) {
      await axios.put(`https://herballrepo-2.onrender.com/medicines/${editMedicine.id}`, newMedicine);
      setMessage('Medicine updated successfully!');
      setEditMedicine(null);
    } else {
      await axios.post('https://herballrepo-2.onrender.com/medicines', newMedicine);
      setMessage('Medicine added successfully!');
    }
    fetchMedicines();
    setNewMedicine({ name: '', image_url: '', description: '', prescription: '' });
    setShowCreateForm(false);
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`https://herballrepo-2.onrender.com/medicines/${id}`);
      setMessage('Medicine deleted successfully!');
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine", error);
    }
  };

  const editMedicineForm = (medicine) => {
    setNewMedicine(medicine);
    setEditMedicine(medicine);
    setShowCreateForm(true);
  };

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setEditMedicine(null);
  };

  const toggleSignUpForm = () => {
    setShowSignUp(!showSignUp);
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>Herbal Remedy System</h1>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <button onClick={toggleSignUpForm}>Sign Up</button>
            <button onClick={toggleLoginForm}>Login</button>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                {message && <p>{message}</p>}

                {isLoggedIn && (
                  <button onClick={toggleCreateForm} className="create-btn">
                    <span>+</span>
                  </button>
                )}

                {showCreateForm && (
                  <form onSubmit={addMedicine} className="medicine-form">
                    <h2>{editMedicine ? 'Edit Medicine' : 'Create Medicine'}</h2>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newMedicine.name}
                      onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      name="image_url"
                      placeholder="Image URL"
                      value={newMedicine.image_url}
                      onChange={(e) => setNewMedicine({ ...newMedicine, image_url: e.target.value })}
                      required
                    />
                    <textarea
                      placeholder="Description"
                      name="description"
                      value={newMedicine.description}
                      onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
                      required
                    ></textarea>
                    <input
                      type="text"
                      name="prescription"
                      placeholder="Prescription"
                      value={newMedicine.prescription}
                      onChange={(e) => setNewMedicine({ ...newMedicine, prescription: e.target.value })}
                      required
                    />
                    <button type="submit">{editMedicine ? 'Update' : 'Add'} Herbs</button>
                  </form>
                )}

                {isLoggedIn && (
                  <div className="medicine-list">
                    {medicines.map((medicine) => (
                      <div key={medicine.id} className="medicine-card">
                        <h2>{medicine.name}</h2>
                        <img src={medicine.image_url} alt={medicine.name} />
                        <p>{medicine.description}</p>
                        <p>
                          <strong>Can be used by:</strong> {medicine.prescription}
                        </p>
                        <button onClick={() => editMedicineForm(medicine)}>Edit</button>
                        <button onClick={() => deleteMedicine(medicine.id)}>Delete</button>
                      </div>
                    ))}
                  </div>
                )}

                {showSignUp && (
                  <form onSubmit={signup} className="auth-form">
                    <h2>Sign Up</h2>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit">Sign Up</button>
                  </form>
                )}

                {showLogin && (
                  <form onSubmit={login} className="auth-form">
                    <h2>Login</h2>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="submit">Login</button>
                  </form>
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
