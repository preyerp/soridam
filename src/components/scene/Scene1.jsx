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
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-size: 24px;
  text-align: center;
`;

function Scene1() {
    const navigate = useNavigate();
    const [showOverlay, setShowOverlay] = useState(true); // 로딩 화면 상태 관리
    const [videoElement, setVideoElement] = useState(null);

    useEffect(() => {
        if (videoElement) {
            // 비디오 재생이 완료되면 페이지 이동
            videoElement.onended = () => {
                navigate('/apple'); // 재생이 완료되면 다음 페이지로 이동
            };
        }
    }, [videoElement, navigate]);

    const handleTouch = () => {
        // 터치 이벤트가 발생하면 로딩 화면을 숨기고 비디오 재생
        setShowOverlay(false); // 로딩 화면을 숨김
        if (videoElement) {
            videoElement.play();  // 비디오 재생 시작
        }
    };

    return (
        <PageWrapper>
            {showOverlay && (
                <Overlay onClick={handleTouch}>
                    <p>화면을 터치해서 이야기 진행하기</p>
                </Overlay>
            )}

            <FlexDiv>
                <Video
                    src="/video/scene1_intro.mp4"
                    ref={(video) => setVideoElement(video)}  // 비디오 엘리먼트를 state에 저장
                />
            </FlexDiv>
        </PageWrapper>
    );
}

export default Scene1;
