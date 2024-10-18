import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from "styled-components";

import Line from '../ui/Line';

const StoryApple = () => {
    const sceneRef = useRef();
    const mixerRef = useRef(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.2;
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneRef.current.appendChild(renderer.domElement);

        // OrbitControls (마우스로 카메라를 회전시킬 수 있는 기능)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);  // 카메라가 위쪽의 특정 위치를 바라보도록 설정
        controls.enableDamping = true;

        // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        // scene.add(ambientLight);

        // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // directionalLight.position.set(5, 10, 7.5);
        // scene.add(directionalLight);
//=============================================================
        // const spotLight = new THREE.SpotLight(0xffffff, 1.5);
        // spotLight.position.set(10, 20, 10);
        // scene.add(spotLight);

        // 배경 추가
        // const textureLoader = new THREE.TextureLoader();
        // textureLoader.load(process.env.PUBLIC_URL + '/sky/evening-night.png', (texture) => {
        //     const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
        //     const skyMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        //     const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        //     scene.add(sky);
        // });

        const ambientLight = new THREE.AmbientLight(0xbebebe, 1.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xf4f4f4, 0.5);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true; // 그림자 설정
        scene.add(directionalLight);        

        // 따뜻한 노란색 빛 추가
        const warmLight = new THREE.DirectionalLight(0xffd700, 0.7); // 따뜻한 노란색 라이트
        warmLight.position.set(-5, 3, -7); // 라이트 위치 조정
        scene.add(warmLight);

        // 배경 추가
        const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
        const skyMaterial = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color(0x000022), // 어두운 밤 색상 설정
            side: THREE.BackSide,
            transparent: true, // 투명도 사용 설정
            opacity: 0.5 // 투명도 설정 (0은 완전 투명, 1은 불투명)
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        scene.add(sky);

        // 모델 로드 함수
        const loadModel = (url) => {
            return new Promise((resolve, reject) => {
                const loader = new GLTFLoader();
                loader.load(url, (gltf) => {
                    resolve(gltf);
                }, undefined, (error) => {
                    reject(error);
                });
            });
        };

        // 모든 모델을 로드하는 프라미스 배열
        const modelPromises = [
            loadModel(process.env.PUBLIC_URL + '/model/scene1/ground_sc1.glb'),  // 땅 모델
            loadModel(process.env.PUBLIC_URL + '/model/scene1/mother.glb'),
            loadModel(process.env.PUBLIC_URL + '/model/scene1/tiger_jump.glb')    // 애니메이션 모델
        ];

        // 모든 모델이 로드되면 실행
        Promise.all(modelPromises).then((models) => {
            // 모델 추가 (모델 로드 순서에 맞춰서 씬에 추가)
            models.forEach((gltf) => {
                const model = gltf.scene;
                scene.add(model);
            });

            // 로딩 상태를 false로 변경하여 로딩 화면을 숨김
            setLoading(false);

            // 원하는 시점에 애니메이션 실행
            const tigerModel = models[2].scene; // 애니메이션 모델
            const mixer = new THREE.AnimationMixer(tigerModel);
            mixerRef.current = mixer;

            // 애니메이션 클립 실행
            const animationName = 'Jump';
            const clip = THREE.AnimationClip.findByName(models[2].animations, animationName);
            if (clip) {
                const action = mixer.clipAction(clip);
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.timeScale = 0.7;
                action.play();
            } else {
                console.error(`애니메이션 "${animationName}"을 찾을 수 없습니다.`);
            }
        }).catch((error) => {
            console.error('모델 로드 중 오류 발생: ', error);
        });

        // 애니메이션 루프 시작
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            if (mixerRef.current) {
                mixerRef.current.update(delta);
            }

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (sceneRef.current) {
                sceneRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div>
            {loading && (
                <div className="loading-screen" style={loadingScreenStyle}>
                    <p>Loading...</p> {/* 로딩 화면 */}
                </div>
            )}
            <div ref={sceneRef} />
            <Line text="어흥! 떡 하나 주면 안 잡아먹지!" />
        </div>
    );
};

// 로딩 화면 스타일 설정
const loadingScreenStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
};

export default StoryApple;
