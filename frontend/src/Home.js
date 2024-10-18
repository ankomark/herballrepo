// Home.js
import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [medicine, setMedicine] = useState({ name: '', description: '' });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit medicine logic
    console.log('Medicine added:', medicine);
    setMedicine({ name: '', description: '' });
    toggleForm(); // Close the form
  };

  return (
    <div className="home">
      <button className="create-btn" onClick={toggleForm}>
        {showForm ? 'Cancel' : 'Create'}
      </button>

      {showForm && (
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicine.name}
              onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={medicine.description}
              onChange={(e) => setMedicine({ ...medicine, description: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
