import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
const fadeInOut = keyframes`
    0%, 100% {
        opacity: 0.7; /* 완전 불투명 */
    }
    50% {
        opacity: 0.4; /* 완전 투명 */
    }
`;

// 모달 스타일 정의
const ModalContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.70);
    color: #fff;
    padding: 64px 80px;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: flex; /* Flexbox 사용 */
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 수평 가운데 정렬 */
    justify-content: center; /* 수직 가운데 정렬 */
`;

const Title = styled.div`
    font-size: 24px;
    margin-bottom: 40px;
    font-weight: 700;
`;

const DialogueContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.90);
    padding: 14px;
    border-radius: 8px;
    margin: 0;
    box-shadow: 
        -8px -8px 16px 0px #CFDAE5 inset, 
        0px -6px 48px 0px rgba(206, 218, 229, 0.25), 
        8px 8px 16px 0px #E7E7E7 inset;
`;

const Dialogue = styled.div`
    font-family: 'East Sea Dokdo', cursive;
    font-size: 32px;
    color: #161A1E;
    margin: 0;
`;

const Instruction = styled.div`
    font-size: 20px;
    margin-top: 40px;
    animation: ${fadeInOut} 3s ease-in-out infinite; /* 애니메이션 적용 */
`;

// 스타일링된 버튼
const StyledButton = styled.button`
    padding: 14px;
    min-width: 64px;
    max-height: 64px;
    font-size: 36px;
    font-family: "East Sea Dokdo";
    border: none;
    border-radius: 20px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.backColor};
    box-shadow: ${(props) => props.shadow};
    line-height: 140%;
    transition: background-color 0.2s ease;
    display: ${(props) => props.display};
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 가운데 정렬 */
    cursor: pointer; /* 커서 포인터로 변경 */
    margin-top: 40px; /* 버튼과 다른 요소 사이의 간격 */
`;
// 스타일링된 버튼
const StyledButton2 = styled.button`
    padding: 14px;
    min-width: 64px;
    max-height: 64px;
    font-size: 36px;
    font-family: "East Sea Dokdo";
    border: none;
    border-radius: 20px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.backColor};
    box-shadow: ${(props) => props.shadow};
    line-height: 140%;
    transition: background-color 0.2s ease;
    display: ${(props) => props.display};
    justify-content: center;
    align-items: center;
    text-align: center; /* 텍스트 가운데 정렬 */
    cursor: pointer; /* 커서 포인터로 변경 */
    margin-top: 40px; /* 버튼과 다른 요소 사이의 간격 */
`;

// "듣고 있어요..." 메시지 스타일
const ListeningMessage = styled.div`
    font-size: 20px;
    margin-top: 40px;
    color: #FEBB6C; /* 버튼 색상과 동일하게 설정 */
`;

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

const GuideModal = ({ setMaxVolumeLevel, setVolumeLevel, maxVolumeLevel, volumeLevel, setIsTouching, setIsTextLineVisible }) => {
    const [isListening, setIsListening] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const mediaStreamSourceRef = useRef(null);
    const audioStreamRef = useRef(null);
    const maxVolumeRef = useRef(0); // 가장 큰 볼륨을 저장하는 ref

    const [volumeHistory, setVolumeHistory] = useState(Array(30).fill(0)); // 막대들의 높이 저장

    useEffect(() => {
        if (volumeLevel > 0) {
            setVolumeHistory((prevHistory) => {
                const newHistory = [...prevHistory.slice(1), volumeLevel]; // 가장 왼쪽 막대 제거, 오른쪽에 새 막대 추가
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
            setIsListening(true);
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

        setIsListening(false);
        setMaxVolumeLevel(maxVolumeRef.current); // 가장 큰 볼륨을 화면에 표시

        const timer = setTimeout(() => {
            setIsTouching(false); // 3초 뒤에 opacity 1로 변경
            setIsTextLineVisible(true)
        }, 2000);
        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
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

    // // 소리 감지 시작
    // const handleButtonClick = () => {
    //     setIsListening(true); // "듣고 있어요..." 상태로 변경
    //     onStartAudio(); // 음성 인식 시작

    //     // 소리 감지가 끝나는 시점을 정해줍니다. 
    //     // 예시로 4초 후에 모달을 닫도록 설정하였습니다.
    //     setTimeout(() => {
    //         setIsListening(false); // 듣는 상태 해제
    //         onClose(); // 모달 닫기
    //     }, 4000);
    // };

    // // 버튼 누르고 있을 때
    // const handleMouseDown = () => {
    //     setIsPressed(true);
    //     handleButtonClick(); // 음성 인식 시작 함수 실행
    // };

    // // 버튼에서 손을 떼었을 때
    // const handleMouseUp = () => {
    //     setIsPressed(false);
    // };

    return (
        <ModalContainer>
            <Title>도움말</Title>
            <DialogueContainer>
                <Dialogue>어흥! 떡하나 주면 안 잡아먹지!</Dialogue>
            </DialogueContainer>
            {isListening ? (
                <ListeningMessage >듣고 있어요...</ListeningMessage>
            ) : (
                <Instruction>호랑이처럼 우렁차게 소리내어 볼까요!</Instruction>
            )}
            {/* "듣고 있어요..." 메시지가 나타날 때 버튼 숨기기 */}
            {isListening ? (
                <StyledButton
                    onClick={stopListening}
                    color={"#FEBB6C"}
                    backColor={"#fefefe"}
                    display={isListening ? "flex" : "none"}
                    shadow={"-8px -8px 16px 0px #F6E5B9 inset, 0px -6px 48px 0px rgba(255, 249, 233, 0.40), 8px 8px 16px 0px #FFF1CC inset"}
                >
                    <img
                        src="/image/puaseIcon.png"  // 이미지 경로를 여기에 추가하세요
                        alt="멈춤"
                        style={{ width: '36px', height: 'auto' }} // 이미지 크기 조절
                    />
                </StyledButton>
            ) : (
                <StyledButton
                    onClick={startListening}
                    color={"#fefefe"}
                    backColor={"#FEBB6C"}
                    display={isListening ? "none" : "flex"}
                    shadow={"-8px -8px 16px 0px #DEB95C inset, 0px -6px 48px 0px rgba(255, 222, 137, 0.40), 8px 8px 16px 0px #FFDE89 inset"}
                >
                    <img
                        src="/image/Sound Icon.png"  // 이미지 경로를 여기에 추가하세요
                        alt="시작하기"
                        style={{ width: '36px', height: 'auto' }} // 이미지 크기 조절
                    />
                </StyledButton>
            )}
            {/* <p>Volume Level: {volumeLevel}</p>
            <p>Max Volume Level: {maxVolumeLevel}</p> */}

            <Container>
                <GuideLine />
                {volumeHistory.map((level, index) => (
                    <Bar key={index} style={{ height: `${(level / 100) * 100}%` }} />
                ))}
            </Container>
        </ModalContainer>
    );
};

export default GuideModal;