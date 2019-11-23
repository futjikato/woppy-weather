import React, { useEffect, useState } from 'react';

const AudioHandler = ({ playNumber = '', enabled = false, audioContext = null }) => {
  const welcomeRef = React.createRef();
  const zeroRef = React.createRef();
  const oneRef = React.createRef();
  const twoRef = React.createRef();
  const threeRef = React.createRef();
  const fourRef = React.createRef();
  const fiveRef = React.createRef();
  const sixRef = React.createRef();
  const sevenRef = React.createRef();
  const eightRef = React.createRef();
  const nineRef = React.createRef();
  const [ playQueue, setPlayQueue ] = useState([]);
  const [ init, setInit ] = useState(false);
  const [ playing, setPlaying ] = useState(false);
  const [ gain, setGain ] = useState(0.8);
  const [ gainNode, setGainNode ] = useState();
  
  const playChar = async c => {
    try {
      switch(c) {
        case 'w':
          await welcomeRef.current.play();
          break;

        case '0':
          await zeroRef.current.play();
          break;

        case '1':
          await oneRef.current.play();
          break;

        case '2':
          await twoRef.current.play();
          break;

        case '3':
          await threeRef.current.play();
          break;

        case '4':
          await fourRef.current.play();
          break;

        case '5':
          await fiveRef.current.play();
          break;

        case '6':
          await sixRef.current.play();
          break;

        case '7':
          await sevenRef.current.play();
          break;

        case '8':
          await eightRef.current.play();
          break;

        case '9':
          await nineRef.current.play();
          break;

        default:
          onLineEnd();
      }
    } catch (e) {
      console.error('prop on ios and web audio is a bitch', e);
    }
  };

  const onLineEnd = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (enabled && playNumber !== '') {
      if (!init) {
        doInitAudio();
        setInit(true);
      }
      setPlayQueue([...playQueue, 'w', ...playNumber.split('')]);
    }
  }, [ playNumber ]);

  useEffect(() => {
    if (playQueue.length > 0 && !playing) {
      setPlaying(true);
      playChar(playQueue[0]);
      setPlayQueue([...playQueue.slice(1)]);
    }
  }, [ playQueue, playing ]);

  useEffect(() => {
    if (gainNode) {
      gainNode.gain.value = gain;
    }
  }, [gain]);

  const doInitAudio = () => {
    if (!audioContext) {
      return;
    }

    const newGainNode = audioContext.createGain();
    newGainNode.gain.value = gain;
    newGainNode.connect(audioContext.destination);
    setGainNode(newGainNode);

    let track = audioContext.createMediaElementSource(welcomeRef.current);
    track.connect(newGainNode);
    welcomeRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(zeroRef.current);
    track.connect(newGainNode);
    zeroRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(oneRef.current);
    track.connect(newGainNode);
    oneRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(twoRef.current);
    track.connect(newGainNode);
    twoRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(threeRef.current);
    track.connect(newGainNode);
    threeRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(fourRef.current);
    track.connect(newGainNode);
    fourRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(fiveRef.current);
    track.connect(newGainNode);
    fiveRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(sixRef.current);
    track.connect(newGainNode);
    sixRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(sevenRef.current);
    track.connect(newGainNode);
    sevenRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(eightRef.current);
    track.connect(newGainNode);
    eightRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(nineRef.current);
    track.connect(newGainNode);
    nineRef.current.addEventListener('ended', onLineEnd);
  };

  return <>
    <div className="vol-container">
      <label htmlFor="vol" className="vol-label">Volume:</label>
      <input 
        className="vol-slider"
        type="range"
        id="vol"
        min="0"
        max="1.2"
        value={gain}
        step="0.01"
        onChange={e => setGain(parseFloat(e.currentTarget.value))}
      />
    </div>
    <audio src="/audio/activated.mp3" ref={welcomeRef} />
    <audio src="/audio/zero_nothing.mp3" ref={zeroRef} />
    <audio src="/audio/one.mp3" ref={oneRef} />
    <audio src="/audio/two.mp3" ref={twoRef} />
    <audio src="/audio/three.mp3" ref={threeRef} />
    <audio src="/audio/four.mp3" ref={fourRef} />
    <audio src="/audio/five.mp3" ref={fiveRef} />
    <audio src="/audio/six.mp3" ref={sixRef} />
    <audio src="/audio/seven_nw.mp3" ref={sevenRef} />
    <audio src="/audio/eight_nw.mp3" ref={eightRef} />
    <audio src="/audio/nnnnine_nw.mp3" ref={nineRef} />
    <style jsx>{`
      .vol-container {
        display: flex;
        align-items: center;
      }
      .vol-label {
        padding-right: .5rem;
      }
      .vol-slider {
        width: 50%;
      }
    `}</style>
  </>;
};

export default AudioHandler;