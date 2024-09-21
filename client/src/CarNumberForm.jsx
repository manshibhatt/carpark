import React, { useState } from 'react';
import axios from 'axios'; // Optional: For handling form submission via API
import { Link } from 'react-router-dom';

const CarNumberForm = () => {
  // State to manage the car number input
  const [carNumber, setCarNumber] = useState('');
  const [loading, setLoading] = useState(false); // Optional: For showing loading state
  const [error, setError] = useState(null); // Optional: For showing error messages

  // Handle form input change
  const handleChange = (event) => {
    setCarNumber(event.target.value);   
  };


  return (
    <div>
      <h2>Enter Car Number</h2>
      <form>
        <div>
          <label htmlFor="carNumber">Car Number:</label>
          <input
            type="text"
            id="carNumber"
            value={carNumber}
            onChange={handleChange}
            required
          />
        </div>
        <Link to={`/pay/${carNumber}`}>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        </Link>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CarNumberForm;
