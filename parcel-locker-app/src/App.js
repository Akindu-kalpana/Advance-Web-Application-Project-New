
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const Locker = ({ id, status, onClick }) => {
  const lockerColor = status === 'available' ? 'green' : 'red';
  const statusText = status === 'available' ? 'Available' : 'Not Available';

  return (
    <div className={`locker ${lockerColor}`} onClick={() => onClick(id)}>
      {id}
      <div className="status-indicator">{statusText}</div>
    </div>
  );
};

const App = () => {
  const initialLockers = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, status: 'available' }));
  const [lockers, setLockers] = useState(initialLockers);
  const [generateInterval, setGenerateInterval] = useState(null);

  const handleLockerClick = (id) => {
    setLockers((prevLockers) =>
      prevLockers.map((locker) =>
        locker.id === id ? { ...locker, status: locker.status === 'available' ? 'not available' : 'available' } : locker
      )
    );
  };

  const handleRandomGeneration = () => {
    const randomLockerId = Math.floor(Math.random() * lockers.length) + 1;
    handleLockerClick(randomLockerId);
  };

  const startRandomGeneration = (interval) => {
    setGenerateInterval(setInterval(handleRandomGeneration, interval));
  };

  const stopRandomGeneration = useCallback(() => {
    clearInterval(generateInterval);
    setGenerateInterval(null);
  }, [generateInterval]);

  useEffect(() => {
    return () => {
      if (generateInterval) {
        stopRandomGeneration();
      }
    };
  }, [generateInterval, stopRandomGeneration]);

  return (
    <div className="App">
      <h1>Parcel Locker System</h1>
      <div className="lockers-container">
        {lockers.map((locker) => (
          <Locker key={locker.id} id={locker.id} status={locker.status} onClick={handleLockerClick} />
        ))}
      </div>
      <div>
        <button onClick={() => startRandomGeneration(2000)}>Start Random Generation</button>
        <button onClick={stopRandomGeneration}>Stop Random Generation</button>
      </div>
    </div>
  );
};

export default App;

