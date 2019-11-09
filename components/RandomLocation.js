import React, { useState } from 'react';
import Papa from 'papaparse';

const RandomLocation = ({ onUpdate = () => {} }) => {
  const [isWorking, setWorking] = useState(false);
  const [locationData, setLocationData] = useState();
  const [displayError, setError] = useState('');
  
  const onActivate = async () => {
    setWorking(true);
    setError('');

    let data = [];
    if (!locationData) {
      try {
        const csvBody = await fetch('/uszips.csv');
        const csvTxt = await csvBody.text();
        const postaldata = Papa.parse(csvTxt, {
          delimiter: ',',
          header: true,
        });
        if (postaldata.errors.length > 0) {
          console.error(postaldata.errors);
          setError('Error reading US postal code database :(');
          setWorking(false);
          return;
        }
        setLocationData(postaldata.data);
        data = postaldata.data;
      } catch (e) {
        console.error(e);
        setError('Error loading US postal code database :(');
        setWorking(false);
        return;
      }
    } else {
      data = locationData;
    }

    const r = Math.floor(Math.random() * data.length);
    onUpdate(data[r]);
    setWorking(false);
  };

  return (
    <>
      {!locationData && <p className="hint">
        Yo. Pressing the button below will start a 5.2MB download with postal codes.<br />
        Just letting you know.
      </p>}
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