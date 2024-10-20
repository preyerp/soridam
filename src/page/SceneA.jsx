import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import GuideModal from '../ui/GuideModal';
import TextLine from '../ui/TextLine'; // TextLine 컴포넌트 임포트
import Scene1 from '../components/scene/Scene1';
import Scene1End from '../components/scene/Scene1End';

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
  z-index: 6;
  font-size: 24px;
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
    z-index: 5;
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
    z-index: 5;
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: opacity 0.5s ease;
`;
const SceneA = () => {
    const [showModal, setShowModal] = useState(true);
    const [modelUrl, setModelUrl] = useState(null);
    const [animation, setAnimation] = useState(null);
    const [isTextLineVisible, setIsTextLineVisible] = useState(false); // TextLine의 표시 여부 상태

    const [loading, setLoading] = useState(true);  // 로딩 상태 관리
    const [modelsLoaded, setModelsLoaded] = useState(0);  // 로드된 모델 수
    const totalModels = 4;  // 로드해야 할 전체 모델 수

    const [tigerOpacity, setTigerOpacity] = useState(false);  // 초기값: 투명 상태
    const [tigerOpacity2, setTigerOpacity2] = useState(false);  // 초기값: 투명 상태

    const [playJump, setPlayJump] = useState(false);  // Jump 애니메이션 실행 상태

    const [isVisible, setIsVisible] = useState(false);  // 부스럭
    const [isVisible2, setIsVisible2] = useState(false);    // 부스럭 안내문구
    const [isTouching, setIsTouching] = useState(false);  // 부스럭 터치했는지

    const [volumeLevel, setVolumeLevel] = useState(0); // 음성 크기 저장
    const [maxVolumeLevel, setMaxVolumeLevel] = useState(0); // 가장 큰 볼륨 기록


    const [showScene1, setShowScene1] = useState(true);
    const [showScene1End, setShowScene1End] = useState(false);  // 마지막영상

    useEffect(() => {
        if (!loading && !showScene1) {
            const timer = setTimeout(() => {
                setIsVisible(true); // 3초 뒤에 opacity 1로 변경
            }, 2000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [loading, showScene1]);

    useEffect(() => {
        if (!loading && !showScene1) {
            const timer = setTimeout(() => {
                setIsVisible2(true); // 3초 뒤에 opacity 1로 변경
            }, 4000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [loading, showScene1]);

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
        setIsTouching(true);  // 

        setIsVisible(false)
        setIsVisible2(false)
    };

    useEffect(() => {
        // 대사창이 나온상태면 소리비교해서 호랑이 출력

        if (isTextLineVisible) {
            if (maxVolumeLevel > 40) {
                setTigerOpacity(true)
                triggerJumpAnimation();
                console.log("큰 호랑이 등장");
                console.log("playJump:", playJump);

            } else {
                setTigerOpacity2(true)
                console.log("작은 호랑이 등장");
            }
        }
    }, [isTextLineVisible]);


    const handleVideoEnd = () => {
        setShowScene1(false); // 비디오가 끝나면 Scene1을 제거
    };

    // 대사 배열 정의
    const scene1Texts = [
        "어흥! 떡하나 주면 안 잡아먹지!",
        "(호랑이는 떡을 모두 먹고 어멈까지 잡아먹었다.)"
    ];

    return (
        <>
            {showScene1 && <Scene1 onVideoEnd={handleVideoEnd} />}
            {loading && (
                <LoadingScreen>로딩 중...</LoadingScreen>  // 로딩 화면
            )}
            <InfoText isVisible={isVisible} onClick={triggerBush}>부스럭</InfoText>
            <InfoText2 isVisible={isVisible2}>무슨 소리가 나지않았나요? 터치해볼까요?</InfoText2>
            <Scene
                shadow="type: pcfsoft"
                renderer="antialias: true; toneMapping: ACESFilamic; exposure: 0.2"
                reflection="directionalLight: #sun;"
                xr-mode-ui="enabled: false"
                device-orientation-permission-ui="enabled: false"
            >
                <a-assets>
                    <img id="sky" src="/sky/evening-night.png" alt="Evening Night Sky" />
                </a-assets>

                <Entity
                    primitive="a-sky"
                    src="#sky"
                    color="#fff"
                    opacity="1"
                />

                <Entity
                    light={{
                        type: 'point',
                        color: '#ecd3a7',
                        intensity: 0.1,
                        distance: 100
                    }}
                    position="0 0 0"
                />

                <Entity
                    light={{
                        type: 'point',
                        color: '#ecd3a7',
                        intensity: 0.4,
                        distance: 200
                    }}
                    position="0 0 -40"
                />

                <Entity
                    gltf-model="url(/model/scene1/mother.glb)"
                    animation-mixer="clip: Idle; loop: repeat"  // Idle 애니메이션 반복 재생
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                />

                <Entity
                    gltf-model="url(/model/scene1/ground_sc1.glb)"
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
                <Entity
                    gltf-model="url(/model/scene1/tiger_baby.glb)"
                    visible={tigerOpacity2}
                    animation-mixer="clip: cuty_breath; loop: repeat;"  // 애니메이션을반복 재생
                    position={{ x: 0, y: 0, z: 0 }}
                    scale={{ x: 1, y: 1, z: 1 }}
                    rotation={{ x: 0, y: 0, z: 0 }}
                />

                <Entity
                    camera
                    position="0 0 2"
                    look-controls="enabled: false; touchEnabled: false; magicWindowTrackingEnabled: false; mouseEnabled: false; pointerLockEnabled: false"  // 모든 컨트롤 비활성화
                    wasd-controls="enabled: false"
                >
                    <Entity position="0 0 0" rotation="0 0 0" />
                </Entity>
            </Scene>

            {isTouching && (
                <GuideModal
                    setMaxVolumeLevel={setMaxVolumeLevel}
                    setVolumeLevel={setVolumeLevel}
                    maxVolumeLevel={maxVolumeLevel}
                    volumeLevel={volumeLevel}
                    setIsTouching={setIsTouching}
                    setIsTextLineVisible={setIsTextLineVisible}
                />
            )}

            {/* 모달이 닫힌 후 TextLine 컴포넌트를 표시 */}
            {isTextLineVisible && <TextLine texts={scene1Texts} showVideo={setShowScene1End} />}

            {showScene1End && <Scene1End />}

        </>
    );
};

export default SceneA;