import React, { useState, useEffect } from 'react';
import 'aframe';
import 'aframe-extras';
import { Entity, Scene } from 'aframe-react';
import styled from 'styled-components';
import VoiceInput from './VoiceInput';
import LineText from '../ui/LineText';

// 로딩 화면 스타일
const LoadingScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-size: 24px;
`;
// 버튼 스타일
const Button = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2000;
  padding: 10px 20px;
  font-size: 16px;
`;

const VoiceContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80vw;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.3); /* 배경에만 투명도 적용 */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const InfoText = styled.p`
    width: 100px;
    position: absolute;
    top:30%;
    left:40%;
    margin: 0;
    text-align: center;
    font-size: 48px;
    font-family: "East Sea Dokdo";
    font-weight: bold;
    color: #fff;
    line-height: 140%;
    z-index: 100;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 0.5s ease;
`;
const InfoText2 = styled.p`
    width: 100%;
    position: absolute;
    top:25%;
    left:-6%;
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    line-height: 140%;
    z-index: 100;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 0.5s ease;
`;
const StoryApple = () => {
    const [loading, setLoading] = useState(true);  // 로딩 상태 관리
    const [modelsLoaded, setModelsLoaded] = useState(0);  // 로드된 모델 수
    const [playJump, setPlayJump] = useState(false);  // Jump 애니메이션 실행 상태
    const [volumeSize, setVolumeSize] = useState("");  // 로드된 모델 수
    const [wordText, setWordText] = useState("");  // 로드된 모델 수
    const [tigerOpacity, setTigerOpacity] = useState(false);  // 초기값: 투명 상태

    const [isTalk, setIsTalk] = useState(false);  // 
    const [isTouching, setIsTouching] = useState(false);  // 
    const totalModels = 3;  // 로드해야 할 전체 모델 수

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setIsVisible(true); // 3초 뒤에 opacity 1로 변경
            }, 2000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [loading]);

    useEffect(() => {
        if (tigerOpacity) {
            const timer = setTimeout(() => {
                setIsTalk(true)
            }, 4000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [tigerOpacity]);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setIsVisible2(true); // 3초 뒤에 opacity 1로 변경
            }, 4000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [loading]);

    useEffect(() => {
        if (wordText === "어흥") {
            setIsTouching(false)
            console.log("일단 여긴 됐는데")
        }
    }, [wordText]);

    useEffect(() => {
        const handleModelLoaded = () => {
            setModelsLoaded(prev => prev + 1);  // 모델이 로드될 때마다 로드된 모델 수 증가
        };

        const models = document.querySelectorAll('[gltf-model]');  // 모든 glTF 모델 선택
        models.forEach((model) => {
            model.addEventListener('model-loaded', handleModelLoaded);  // 모델이 로드되면 이벤트 발생
        });

        return () => {
            models.forEach((model) => {
                model.removeEventListener('model-loaded', handleModelLoaded);  // 클린업
            });
        };
    }, []);

    useEffect(() => {
        // 모든 모델이 로드되었을 때 로딩 상태 해제
        if (modelsLoaded === totalModels) {
            setLoading(false);
        }
    }, [modelsLoaded]);

    // Jump 애니메이션 실행 버튼 핸들러
    const triggerJumpAnimation = () => {
        setPlayJump(true);  // Jump 애니메이션 재생
    };
    const triggerBush = () => {
        setIsTouching(true);  // J

        setIsVisible(false)
        setIsVisible2(false)
    };

    return (
        <>
            {loading && (
                <LoadingScreen>로딩 중...</LoadingScreen>  // 로딩 화면
            )}
            {/* <InfoText onClick={triggerBush}>부스럭</InfoText> */}
            <InfoText isVisible={isVisible} onClick={triggerBush}>부스럭</InfoText>
            <InfoText2 isVisible={isVisible2}>무슨 소리가 나지않았나요? 터치해볼까요?</InfoText2>
            {isTouching && (
                <VoiceContent>
                    <VoiceInput setVolumeSize={setVolumeSize} setWordText={setWordText} anime={triggerJumpAnimation} setTiger={setTigerOpacity}></VoiceInput>
                </VoiceContent>
            )}
            {isTalk && (
                <LineText></LineText>
            )}

            <Scene
                shadow="type: pcfsoft" // 부드러운 그림자
                renderer="  antialias: true;
                toneMapping: ACESFilamic;
                exposure: 0.2"
                reflection="directionalLight: #sun;"
                xr-mode-ui="enabled: false"
                vr-mode-ui="enabled: false"  // VR 모드 UI 비활성화
                device-orientation-permission-ui="enabled: false"
            >

                {/* 배경 설정 */}
                <a-assets>
                    <img id="sky" src="./sky/evening-night.png" alt="Evening Night Sky" />
                </a-assets>

                {/* Sky 설정 */}
                <Entity
                    primitive="a-sky"
                    src="#sky"  // 이미지 참조
                    color="#444"
                    opacity="1"
                />

                {/* 빛 설정 */}

                {/* Point Light 1 */}
                <Entity
                    light={{
                        type: 'point',
                        color: '#ecd3a7',
                        intensity: 0.1,
                        distance: 100
                    }}
                    position="0 0 0"
                />

                {/* Point Light 2 */}
                <Entity
                    light={{
                        type: 'point',
                        color: '#ecd3a7',
                        intensity: 0.4,
                        distance: 200
                    }}
                    position="0 0 -40"
                />

                {/* 모델들 */}
                <Entity
                    gltf-model="url(/model/scene1/mother.glb)"
                    animation-mixer="clip: Idle; loop: repeat"  // Idle 애니메이션 반복 재생
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                />

                <Entity
                    gltf-model="url(/model/scene1/tiger_jump.glb)"
                    visible={tigerOpacity}
                    animation-mixer={`clip: Jump; loop: once; clampWhenFinished: true; ${playJump ? 'timeScale: 1' : 'timeScale: 0'}`}  // Jump 애니메이션을 한 번 재생
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                />
                {/* <Entity
                    gltf-model="url(/model/scene1/tiger_baby.glb)"
                    animation-mixer="clip: cuty_breath; loop: repeat;"  // Jump 애니메이션을 한 번 재생
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                /> */}
                <Entity
                    gltf-model="url(/model/scene1/ground_sc1.glb)"
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                />

                <Entity
                    camera
                    position="0 0 2"
                    look-controls="enabled: false; touchEnabled: false; magicWindowTrackingEnabled: false"  // 터치 및 자이로스코프 비활성화
                    wasd-controls="enabled: false"  // 키보드 이동 비활성화
                >
                    <Entity position="0 0 0" rotation="0 0 0" />
                </Entity>


                <Entity primitive="a-sky" color="#010422" />
            </Scene>
        </>
    );
};

export default StoryApple;
