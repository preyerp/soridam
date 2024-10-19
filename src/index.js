import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import VoiceInput from './components/VoiceInput';
import MyScene from './components/MyScene';
import SpeechComponent from './components/SpeechComponent';
import StoryApple from './components/StoryApple';
import SceneMain from './components/scene/SceneMain';
import SceneTemp from './components/scene/SceneTemp';
import Scene1 from './components/scene/Scene1';
import Scene2 from './components/scene/Scene2';
import SceneBlack from './components/scene/SceneBlack';
import SpeechRecognitionComponent from './components/SpeechRecognitionComponent';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename={process.env.PUBLIC_URL}>

    <Routes>
      {/* <Route index element={<VoiceInput />} /> */}
      <Route index element={<StoryApple />} />
      <Route path="scene1" element={<Scene1 />} />
      <Route path="scene2" element={<Scene2 />} />
      <Route path="sceneblack" element={<SceneBlack />} />
      <Route path="apple" element={<StoryApple />} />
      {/* <Route path="tigerOn" element={<MyScene />} /> */}
      
    </Routes>

  </BrowserRouter>
);

// 서비스 워커 등록
serviceWorkerRegistration.register();

