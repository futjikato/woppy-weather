import React, { useState, useEffect } from 'react';
import RobotFrame from '../components/RobotFrame';
import RandomLocation from '../components/RandomLocation';
import WeatherDisplay from '../components/WeatherDisplay';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicCityDetails = dynamic(
  () => import('../components/CityDetails'),
  { ssr: false }
);

const DynamicAudioHandler = dynamic(
  () => import('../components/AudioHandler'),
  { ssr: false }
);

const IndexPage = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [pn, setPlayNumber] = useState('');
  const [enableAudio, setEnableAudio] = useState(false);

  useEffect(() => {
    if (currentLocation && currentLocation.zip) {
      setPlayNumber(currentLocation.zip);
    }
  }, [ currentLocation ])

  return (
    <div className="bg">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
      </Head>
      <div className="container">
        <RobotFrame>
          <RandomLocation onUpdate={setCurrentLocation} />
          {enableAudio && <DynamicAudioHandler playNumber={pn} enabled={true} />}
          <div>
            <label>Use audio</label>
            <input type="checkbox" checked={enableAudio} onChange={e => setEnableAudio(e.currentTarget.checked)} />
          </div>
          <DynamicCityDetails location={currentLocation} />
          <WeatherDisplay location={currentLocation} />
        </RobotFrame>
      </div>
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <style jsx>{`
        .container {
          width: 100vw;
          max-width: 479px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;