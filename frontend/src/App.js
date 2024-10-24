// // Add the updated App.js with added features like About, Contact, and Footer

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import './App.css';

// // About Page Component
// function About() {
//   return (
//     <div>
//       <h2>About Herbal Remedy System</h2>
//       <p>We provide the best herbal remedies for various ailments. All our medicines are natural and carefully sourced.</p>
//     </div>
//   );
// }

// // Contact Page Component
// function Contact() {
//   return (
//     <div>
//       <h2>Contact Us</h2>
//       <p>Email: info@herbalremedysystem.com</p>
//       <p>Phone: +123 456 7890</p>
//     </div>
//   );
// }

// // Footer Component
// function Footer() {
//   return (
//     <footer>
//       <p>&copy; 2024 Herbal Remedy System. All rights reserved.</p>
//     </footer>
//   );
// }

// // Main App Component
// function App() {
//   const [username, setUsername] = useState(''); // For Sign Up and Login
//   const [password, setPassword] = useState(''); // For Sign Up and Login
//   const [message, setMessage] = useState('');
//   const [medicines, setMedicines] = useState([]);
//   const [newMedicine, setNewMedicine] = useState({ name: '', image_url: '', description: '', prescription: '' });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [editMedicine, setEditMedicine] = useState(null);
//   const [cartItems, setCartItems] = useState([]); // Updated to store cart items

//   // State for Sign Up and Login forms
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   // State to toggle the Create Medicine form
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   useEffect(() => {
//     fetchMedicines();
//     // Fetch cart items from localStorage on load
//     loadCartFromLocalStorage();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/medicines');
//       setMedicines(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadCartFromLocalStorage = () => {
//     const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(savedCart);
//   };

//   const signup = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/signup', { username, password });
//       setMessage('User created successfully');
//       setShowSignUp(false); // Hide the sign-up form after successful sign-up
//     } catch (error) {
//       setMessage('Error creating user');
//     }
//   };

//   const login = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/login', { username, password });
//       setMessage('Logged in successfully');
//       setIsLoggedIn(true);
//       setShowLogin(false); // Hide the login form after successful login
//     } catch (error) {
//       setMessage('Invalid credentials');
//     }
//   };

//   const addMedicine = async (e) => {
//     e.preventDefault();
//     if (editMedicine) {
//       await axios.put(`http://localhost:5000/medicines/${editMedicine.id}`, newMedicine);
//       setMessage('Medicine updated successfully!');
//       setEditMedicine(null);
//     } else {
//       await axios.post('http://localhost:5000/medicines', newMedicine);
//       setMessage('Medicine added successfully!');
//     }
//     fetchMedicines();
//     setNewMedicine({ name: '', image_url: '', description: '', prescription: '' });
//     setShowCreateForm(false); // Hide form after submission
//   };

//   const deleteMedicine = async (id) => {
//     await axios.delete(`http://localhost:5000/medicines/${id}`);
//     setMessage('Medicine deleted successfully!');
//     fetchMedicines();
//   };

//   const editMedicineForm = (medicine) => {
//     setNewMedicine(medicine);
//     setEditMedicine(medicine);
//     setShowCreateForm(true);  // Show the form in edit mode
//   };

//   // Function to handle adding a medicine to the cart
//   const addToCart = (medicine) => {
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Check if the item is already in the cart
//     const existingItem = cart.find(item => item.id === medicine.id);

//     if (existingItem) {
//       // If already exists, increase the quantity
//       existingItem.quantity += 1;
//     } else {
//       // Add new item with a quantity of 1
//       cart.push({ ...medicine, quantity: 1 });
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     setCartItems(cart);
//     setMessage('Medicine added to cart');
//   };

//   // Toggle the create medicine form
//   const toggleCreateForm = () => {
//     setShowCreateForm(!showCreateForm);
//     setEditMedicine(null); // Reset the form for creating a new medicine
//   };

//   // Toggle the Sign Up form
//   const toggleSignUpForm = () => {
//     setShowSignUp(!showSignUp);
//   };

//   // Toggle the Login form
//   const toggleLoginForm = () => {
//     setShowLogin(!showLogin);
//   };

//   return (
//     <Router>
//       <div>
//         <nav className="navbar">
//           <h1>Herbal Remedy System</h1>
//           <div className="navbar-links">
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
//             <Link to="/contact">Contact</Link>
//             <button onClick={toggleSignUpForm}>Sign Up</button>
//             <button onClick={toggleLoginForm}>Login</button>
//           </div>
//         </nav>

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div className="container">
//                 {message && <p>{message}</p>}

//                 {/* Toggle Create Medicine Button */}
//                 {isLoggedIn && (
//                   <button onClick={toggleCreateForm} className="create-btn">
//                     <span>+</span> {/* Icon for Create */}
//                   </button>
//                 )}

//                 {/* Medicine Creation Form */}
//                 {showCreateForm && (
//                   <form onSubmit={addMedicine} className="medicine-form">
//                     <h2>{editMedicine ? 'Edit Medicine' : 'Create Medicine'}</h2>
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       value={newMedicine.name}
//                       onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
//                       required
//                     />
//                     <input
//                       type="text"
//                       placeholder="Image URL"
//                       value={newMedicine.image_url}
//                       onChange={(e) => setNewMedicine({ ...newMedicine, image_url: e.target.value })}
//                       required
//                     />
//                     <textarea
//                       placeholder="Description"
//                       value={newMedicine.description}
//                       onChange={(e) => setNewMedicine({ ...newMedicine, description: e.target.value })}
//                       required
//                     ></textarea>
//                     <input
//                       type="text"
//                       placeholder="Prescription"
//                       value={newMedicine.prescription}
//                       onChange={(e) => setNewMedicine({ ...newMedicine, prescription: e.target.value })}
//                       required
//                     />
//                     <button type="submit">{editMedicine ? 'Update' : 'Add'} Herbs</button>
//                   </form>
//                 )}

//                 {/* Medicines List and CRUD Operations */}
//                 {isLoggedIn && (
//                   <div className="medicine-list">
//                     {medicines.map((medicine) => (
//                       <div key={medicine.id} className="medicine-card">
//                         <h2>{medicine.name}</h2>
//                         <img src={medicine.image_url} alt={medicine.name} />
//                         <p>{medicine.description}</p>
//                         <p>
//                           <strong>Prescription:</strong> {medicine.prescription}
//                         </p>
//                         <button onClick={() => editMedicineForm(medicine)}>Edit</button>
//                         <button onClick={() => deleteMedicine(medicine.id)}>Delete</button>
//                         <button onClick={() => addToCart(medicine)}>Add to Cart</button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Sign Up Form */}
//                 {showSignUp && (
//                   <form onSubmit={signup} className="auth-form">
//                     <h2>Sign Up</h2>
//                     <input
//                       type="text"
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <button type="submit">Sign Up</button>
//                   </form>
//                 )}

//                 {/* Login Form */}
//                 {showLogin && (
//                   <form onSubmit={login} className="auth-form">
//                     <h2>Login</h2>
//                     <input
//                       type="text"
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <button type="submit">Login</button>
//                   </form>
//                 )}
//               </div>
//             }
//           />

//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

// About Page Component
function About() {
  return (
    <div>
      <h2>About Herbal Remedy System</h2>
      <p>We provide the best herbal remedies for various ailments. All our medicines are natural and carefully sourced.</p>
    </div>
  );
}

// Contact Page Component
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

// Footer Component
function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Herbal Remedy System. All rights reserved.</p>
    </footer>
  );
}

// Main App Component
function App() {
  const [username, setUsername] = useState(''); // For Sign Up and Login
  const [password, setPassword] = useState(''); // For Sign Up and Login
  const [message, setMessage] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', image_url: '', description: '', prescription: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editMedicine, setEditMedicine] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Updated to store cart items

  // State for Sign Up and Login forms
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // State to toggle the Create Medicine form
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMedicines();
    // Fetch cart items from localStorage on load
    loadCartFromLocalStorage();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/medicines');
      setMedicines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCartFromLocalStorage = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
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

  // Function to handle adding a medicine to the cart
  const addToCart = (medicine) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === medicine.id);

    if (existingItem) {
      // If already exists, increase the quantity
      existingItem.quantity += 1;
    } else {
      // Add new item with a quantity of 1
      cart.push({ ...medicine, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
    setMessage('Medicine added to cart');
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
                    <button type="submit">{editMedicine ? 'Update' : 'Add'} Herbs</button>
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
                        <button onClick={() => addToCart(medicine)}>add to favorite</button>
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

export default App;495374