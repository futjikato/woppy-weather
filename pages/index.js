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
  const [audioContext, setAudioContext] = useState();

  const toggleEnableAudio = e => {
    if (!audioContext) {
      let newAudioContext;
      if (typeof AudioContext === 'function') {
        newAudioContext = new AudioContext();
      } else if (typeof window.webkitAudioContext === 'function') {
        newAudioContext = new window.webkitAudioContext();
      } else {
        console.log('unable to create audio context');
        return;
      }

      const buffer = newAudioContext.createBuffer(1, 1, 22050);
			const source = newAudioContext.createBufferSource();
			source.buffer = buffer;
			// Connect to output (speakers)
			source.connect(newAudioContext.destination);
			// Play sound
			if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}

      setAudioContext(newAudioContext); 
    }

    setEnableAudio(e.currentTarget.checked);
  };

  useEffect(() => {
    if (currentLocation && currentLocation.zip) {
      setPlayNumber(currentLocation.zip);
    }
  }, [ currentLocation ])

  return (
    <div className="bg">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
        <title>Woppy's weather webpage</title>
      </Head>
      <div className="container">
        <RobotFrame>
          <RandomLocation onUpdate={setCurrentLocation} />
          {enableAudio && <DynamicAudioHandler playNumber={pn} enabled={true} audioContext={audioContext} />}
          <div>
            <label htmlFor="enable_audio">Use audio</label>
            <input type="checkbox" id="enable_audio" checked={enableAudio} onChange={toggleEnableAudio} />
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