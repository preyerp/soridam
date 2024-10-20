import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import SceneTemp from './components/scene/SceneTemp';
import Scene2 from './components/scene/Scene2';
import SceneBlack from './components/scene/SceneBlack';
import SceneA from './page/SceneA';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter basename={process.env.PUBLIC_URL}>

    <Routes>
      {/* <Route index element={<VoiceInput />} /> */}
      <Route index element={<SceneTemp />} />
      <Route path="sceneA" element={<SceneA />} />
      <Route path="scene2" element={<Scene2 />} />
      <Route path="sceneblack" element={<SceneBlack />} />
      {/* <Route path="tigerOn" element={<MyScene />} /> */}
      
    </Routes>

  </BrowserRouter>
);


