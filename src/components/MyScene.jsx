// src/components/MyScene.js
import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'aframe-extras';
import { Entity, Scene } from 'aframe-react';

const MyScene = () => {

    return (
        <Scene>
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/tiger.glb"
                position="5 5 0"
                rotation="0 45 0"
                scale="5 5 5"
            />

            <Entity
                primitive="a-gltf-model"
                src="/models/scene4_tiger.glb"
                position="10 5 0"
                rotation="0 45 0"
                scale="5 5 5"
            /> */}
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/scene4bg.glb"
                position="0 5 0"
                rotation="0 45 0"
                scale="5 5 5"
            /> */}
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/scene2_tiger.glb"
                position="15 -50 0"
                rotation="0 45 0"
                scale="5 5 5"
                animation-mixer="clip: *; loop: repeat; timeScale: 1"
            />
            <Entity
                primitive="a-gltf-model"
                src="/models/CHICKEN.glb"
                position="10 -10 -40"
                rotation="0 10 0"
                scale="50 50 50"
                animation-mixer="clip: bunnyhop; loop: repeat; timeScale: 1"
            /> */}
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/tiger_head.glb"
                position="0 0 -40"
                rotation="0 10 0"
                scale="20 20 20"
            /> */}
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/tiger4jok.glb"
                position="10 50 -150"
                rotation="0 10 0"
                scale="20 20 20"
            /> */}
            <Entity
                primitive="a-gltf-model"
                src="/models/mount.glb"
                position="-10 -40 -150"
                rotation="0 80 0"
                scale="7 7 7"
            />
            <Entity
                primitive="a-gltf-model"
                src="/models/tree.glb"
                position="-60 -30 -140"
                rotation="0 20 0"
                scale="5 5 5"
            />
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/tiger_danger.glb"
                position="40 40 -130"
                rotation="0 -25 0"
                scale="20 20 20"
            /> */}
            <Entity
                primitive="a-gltf-model"
                src="/models/tiger_org.glb"
                position="40 -60 -130"
                rotation="0 -25 0"
                scale="20 20 20"
                animation-mixer="clip: Breath; loop: repeat; timeScale: 1"
            />
            {/* <Entity
                primitive="a-gltf-model"
                src="/models/tiger_stand.glb"
                position="-60 30 -140"
                rotation="0 20 0"
                scale="20 20 20"
            /> */}
            
            {/* <Entity
                gltf-model="#animatedModel"
                animation-mixer="clip: run01"
                position="10 -10 -40"
                rotation="0 10 0"
                scale="50 50 50"
            />
            <a-assets>
                <a-asset-item id="animatedModel" src="/models/CHICKEN.glb"></a-asset-item>
            </a-assets> */}
            
            {/* 카메라 엔티티 */}
            <Entity camera position="0 1.6 0">
                {/* look-controls 컴포넌트를 제거하여 시점을 고정 */}
                <Entity position="0 0 0" rotation="0 0 0" />
            </Entity>

            <Entity primitive="a-sky" color="#010422" />
        </Scene>
    );
};

export default MyScene;
