import React, { useState, useRef } from 'react';

const AudioVolumeMeter = () => {
  const [volumeLevel, setVolumeLevel] = useState(0); // 음성 크기 저장
  const [maxVolumeLevel, setMaxVolumeLevel] = useState(0); // 가장 큰 볼륨 기록
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);
  const audioStreamRef = useRef(null);
  const maxVolumeRef = useRef(0); // 가장 큰 볼륨을 저장하는 ref

  const startListening = async () => {
    try {
      // 음성 크기 측정용 Web Audio API 설정
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      mediaStreamSourceRef.current.connect(analyserRef.current);

      detectVolume();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopListening = () => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }


    setMaxVolumeLevel(maxVolumeRef.current); // 가장 큰 볼륨을 화면에 표시
  };

  const detectVolume = () => {
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkVolume = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const averageVolume = sum / dataArray.length;
      setVolumeLevel(Math.round(averageVolume)); // 음성 크기 저장
      // 현재 음성 크기가 가장 큰지 확인하고 갱신
      if (averageVolume > maxVolumeRef.current) {
        maxVolumeRef.current = Math.round(averageVolume);
      }

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        requestAnimationFrame(checkVolume); // 지속적으로 크기 측정
      }
    };

    checkVolume();
  };

  return (
    <div>
      <p>Microphone: {audioContextRef.current ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <p>Volume Level: {volumeLevel}</p>
      <p>Max Volume Level: {maxVolumeLevel}</p> {/* 가장 큰 볼륨 표시 */}
    </div>
  );
};

export default AudioVolumeMeter;
