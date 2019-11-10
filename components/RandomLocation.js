import React, { useState } from 'react';

const RandomLocation = ({ onUpdate = () => {} }) => {
  const [isWorking, setWorking] = useState(false);
  const [displayError, setError] = useState('');
  
  const onActivate = async () => {
    setWorking(true);
    setError('');

    try {
      const locationBody = await fetch('/api/_location');
      const location = await locationBody.json();
      onUpdate(location);
    } catch (e) {
      console.error(e);
      setError('Error loading US postal code database :(');
    }
    
    setWorking(false);
  };

  return (
    <>
      {isWorking ? <button>Working ...</button> : <button onClick={onActivate}>Activate</button>}
      {displayError !== '' && <p className="error">{displayError}</p>}
      <style jsx>{`
        button {
          display: block;
          width: 100%;
          padding: 1rem 0;
          text-transform: uppercase;
        }
        .hint {
          font-size: .85rem;
        }
        .error {
          color: red;
          dont-weight: bold;
        }
      `}</style>
    </>
  );
};

export default RandomLocation;