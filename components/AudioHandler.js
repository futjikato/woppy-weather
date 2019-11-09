import React, { useEffect, useState } from 'react';

const AudioHandler = ({ playNumber = '', enabled = false }) => {
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
  
  const playChar = c => {
    console.log('play char', c);
    switch(c) {
      case 'w':
        welcomeRef.current.play();
        break;

      case '0':
        zeroRef.current.play();
        break;

      case '1':
        oneRef.current.play();
        break;

      case '2':
        twoRef.current.play();
        break;

      case '3':
        threeRef.current.play();
        break;

      case '4':
        fourRef.current.play();
        break;

      case '5':
        fiveRef.current.play();
        break;

      case '6':
        sixRef.current.play();
        break;

      case '7':
        sevenRef.current.play();
        break;

      case '8':
        eightRef.current.play();
        break;

      case '9':
        nineRef.current.play();
        break;

      default:
        onLineEnd();
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

  const doInitAudio = () => {
    const audioContext = new AudioContext();

    let track = audioContext.createMediaElementSource(welcomeRef.current);
    track.connect(audioContext.destination);
    welcomeRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(zeroRef.current);
    track.connect(audioContext.destination);
    zeroRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(oneRef.current);
    track.connect(audioContext.destination);
    oneRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(twoRef.current);
    track.connect(audioContext.destination);
    twoRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(threeRef.current);
    track.connect(audioContext.destination);
    threeRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(fourRef.current);
    track.connect(audioContext.destination);
    fourRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(fiveRef.current);
    track.connect(audioContext.destination);
    fiveRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(sixRef.current);
    track.connect(audioContext.destination);
    sixRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(sevenRef.current);
    track.connect(audioContext.destination);
    sevenRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(eightRef.current);
    track.connect(audioContext.destination);
    eightRef.current.addEventListener('ended', onLineEnd);

    track = audioContext.createMediaElementSource(nineRef.current);
    track.connect(audioContext.destination);
    nineRef.current.addEventListener('ended', onLineEnd);
  };

  return <>
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
  </>;
};

export default AudioHandler;