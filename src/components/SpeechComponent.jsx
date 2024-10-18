import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechComponent = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [volume, setVolume] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const scriptProcessorRef = useRef(null);
  const maxVolumeRef = useRef(0);
  const isListeningRef = useRef(false); // 인식 상태를 추적하는 추가적인 ref

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("This browser does not support speech recognition. Please use a different browser.");
    }
  }, []);

  const startListening = async () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    analyserRef.current = audioContextRef.current.createAnalyser();
    scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(2048, 1, 1);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(audioContextRef.current.destination);

      scriptProcessorRef.current.onaudioprocess = () => {
        const dataArray = new Uint8Array(analyserRef.current.fftSize);
        analyserRef.current.getByteTimeDomainData(dataArray);

        let max = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const value = Math.abs(dataArray[i] - 128);
          if (value > max) {
            max = value;
          }
        }
        maxVolumeRef.current = Math.max(maxVolumeRef.current, max);
        setVolume(maxVolumeRef.current);
      };
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setVolume(maxVolumeRef.current);
    maxVolumeRef.current = 0;
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsTouching(true);
    if (isListeningRef.current) {
      stopListening(); // 이전 인식 세션이 있다면 종료
    }
    setVolume(0); // 볼륨 초기화
    maxVolumeRef.current = 0; // 최대 볼륨 초기화
    startListening();
    isListeningRef.current = true; // 인식 상태 설정
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsTouching(false);
    if (isListeningRef.current) {
      stopListening();
      isListeningRef.current = false; // 인식 상태 해제
    }
  };

  return (
    <div>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ width: '100%', height: '200px', backgroundColor: isTouching ? 'lightgreen' : 'lightcoral', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <p>Touch and hold to speak</p>
      </div>
      <p>Result: {transcript}</p>
      <p>Max Volume: {volume.toFixed(2)}</p>
    </div>
  );
};

export default SpeechComponent;
