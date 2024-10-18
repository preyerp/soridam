import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook

// Styled components
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #000;
`;

const FlexDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video.attrs({
    loop: false,
    autoPlay: false,  // 자동 재생을 false로 설정
    muted: false,
    playsInline: true,
})`
    width: 100%;
    height: 100%;
    cursor: none;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 24px;
  text-align: center;
`;

function SceneBlack() {
    const navigate = useNavigate();
    const [showOverlay, setShowOverlay] = useState(true); // 로딩 화면 상태 관리
    const [videoElement, setVideoElement] = useState(null);

    

    return (
        <PageWrapper>
            <Overlay>
                <p>시청해주셔서 감사합니다.</p>
                <p>정식발매때 만나요!</p>
                <p>많은 관심 부탁드립니다.</p>
            </Overlay>
        </PageWrapper>
    );
}

export default SceneBlack;
