// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

const parcelsData = [
  { id: 1, status: 'Pending' },
  { id: 2, status: 'Delivered' },
  { id: 3, status: 'In Transit' },
];

const App = () => {
  const [parcels, setParcels] = useState(parcelsData);

  const [parcellist, setParcellist] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        // Assuming your Express server is running on http://localhost:5000
        const response = await axios.get('http://localhost:3000/api/parcels');
console.log (response.data)
        // Assuming the response data is an array of parcels
        setParcellist(response.data);
      } catch (error) {
        console.error('Error fetching parcels:', error);
        // Handle errors or set an error state
      }
    };

    fetchParcels();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="App">
      <h1>Parcel Tracking System</h1>
      <ul>
        {parcellist.map((parcel) => (
          <li key={parcel.id}>
            Parcel {parcel.id}: {parcel.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
