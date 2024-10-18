import React, { useState, useEffect, useRef, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from "styled-components";


// import data from "../../data.json"   // 더이상 안씀
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const VoiceButton = styled.div`
    width: ${(props) => props.width || "64px"};    
    height: ${(props) => props.height || "64px"};    
    display:flex;
    align-items: center;
    position: absolute;
    bottom: 5%;
    right: 5%;

    min-width: 64px;
    border: none;
    border-radius: 20px;
    background-color: #FEBB6C;
    box-shadow: -8px -8px 16px 0px #DEB95C inset, 0px -6px 48px 0px rgba(255, 222, 137, 0.40), 8px 8px 16px 0px #FFDE89 inset;
    transition: background-color 0.2s ease; /* 색 변화에 부드러운 전환 효과 */
`;
const VoiceButtonText = styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    font-family: "East Sea Dokdo";
    font-size: 36px;
    color: #fff;
    line-height: 140%;
`;
const Help = styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    font-family: "East Sea Dokdo";
    font-size: 86px;
    color: #fff;
    line-height: 140%;
`;
const InfoText = styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    font-size: 24px;
    font-weight: ${props => props.weight || 'lighter'};
    color: #fff;
    line-height: 140%;
    margin-top: ${props => props.margintop || '0'};
    margin-bottom: ${props => props.marginbottom || '0'};
`;
function VoiceInput({ setVolumeSize, setWordText, anime, setTiger }) {

    const navigate = useNavigate();

    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [volume, setVolume] = useState(0);
    const [isTouching, setIsTouching] = useState(false);
    const [isStart, setIsStart] = useState(false);
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

    useEffect(() => {
        // volume 값이 변할 때만 상태 업데이트
        if (volume.toFixed(2) >= 35) {
            setVolumeSize(volume.toFixed(2));
        } else {
            setVolumeSize(volume.toFixed(2));
        }

        setVolumeSize(volume.toFixed(2));
        if (transcript === "어흥") {
            const timer = setTimeout(() => {
                setWordText(transcript);
                setTiger(true);
                anime();
            }, 2000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        } else {
            setWordText(transcript);
        }

    }, [transcript]);  // 의존성 배열에 값 추가

    console.log("volume")
    console.log(volume)
    console.log("transcript")
    console.log(transcript)

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
        setIsStart(true);
        if (isListeningRef.current) {
            stopListening();
            isListeningRef.current = false; // 인식 상태 해제
        }
        console.log("volume")
        console.log(volume)
        if (transcript == "어흥") { // 만약 입력된 사용자의 음성이 어흥이라면
            // setTimeout(() => {
            //     navigate('/tigerOn')
            // }, 2000); // 2초 후 다음장면으로 넘어감
        }
    };

    console.log("wordText====================")
    console.log(transcript)
    console.log(transcript === "어흥")

    return (
        <Wrapper>
            <InfoText margintop={"40px"} marginbottom={"90px"} weight={"bold"}>도움말</InfoText>
            <InfoText marginbottom={"5px"}>부스럭대는 소리를 따라가니</InfoText>
            <InfoText marginbottom={"5px"}>무서운 호랑이 한 마리가 길을 턱 막아서며</InfoText>
            <Help>어흥!</Help>
            <InfoText marginbottom={"10px"}>버튼을 누르는동안 녹음이 시작됩니다.</InfoText>
            <InfoText marginbottom={"40px"}>호랑이처럼 우렁차게 소리내어 볼까요!</InfoText>
            {isTouching && (
                <InfoText marginbottom={"40px"}>소리를 입력받는중...</InfoText>
            )}
            {isStart && transcript !== "어흥" ? (
                <>
                    <InfoText marginbottom={"10px"}>다시한번 버튼을 누르며 소리내볼까요?</InfoText>
                </>
            ) : (
                <>
                </>
            )}
            <Help>{transcript}</Help>
            <VoiceButton
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                width={"200px"}
                height={"100px"}
                style={{ backgroundColor: isTouching ? 'lightgreen' : 'lightcoral' }}
            >
                <VoiceButtonText>
                    소리 입력
                </VoiceButtonText>
            </VoiceButton>
        </Wrapper>
        // <Frame>

        // </Frame>
    );
}

export default VoiceInput;