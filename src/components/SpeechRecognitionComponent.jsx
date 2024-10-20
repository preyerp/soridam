import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  width: 210px;
  height: 50px;
  overflow: hidden;
  background-color: black;
  position: relative;
`;

// 가이드 선 스타일
const GuideLine = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: red;
  top: 50%; /* volumeLevel 50에 해당하는 위치 */
  z-index: 1;
  opacity: 0.5;
`;

const Bar = styled.div`
  width: 5px;
  background-color: #FEBB6C;
  margin: 0 1px;
`;

const AudioVolumeMeter = () => {
  const [volumeLevel, setVolumeLevel] = useState(0); // 음성 크기 저장
  const [volumeHistory, setVolumeHistory] = useState(Array(30).fill(0)); // 막대들의 높이 저장
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);
  const audioStreamRef = useRef(null);

  useEffect(() => {
    if (volumeLevel > 0) {
      setVolumeHistory((prevHistory) => {
        const newHistory = [...prevHistory.slice(1), volumeLevel]; // 가장 왼쪽 막대 제거, 오른쪽에 새 막대 추가
        console.log(newHistory[29])
        return newHistory;
      });
    }
  }, [volumeLevel]);

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
  };

  const detectVolume = () => {
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkVolume = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const averageVolume = sum / dataArray.length;
      setVolumeLevel(Math.round(averageVolume)); // 음성 크기 저장

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
      <Container>
        <GuideLine />
        {volumeHistory.map((level, index) => (
          <Bar key={index} style={{ height: `${(level / 100) * 100}%` }} />
        ))}
      </Container>
    </div>
  );
};

export default AudioVolumeMeter;
