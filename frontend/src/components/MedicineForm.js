import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const MedicineForm = ({ editing, medicine, cancelEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editing) {
      setName(medicine.name);
      setPrice(medicine.price);
    }
  }, [editing, medicine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, price };
    if (editing) {
      await axios.put(`/medicines/${medicine.id}`, data);
      cancelEdit();
    } else {
      await axios.post('/medicines', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Medicine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">{editing ? 'Update Medicine' : 'Add Medicine'}</button>
      {editing && <button onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default MedicineForm;
