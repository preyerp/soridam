import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook

// Styled Components
const Container = styled.div`
    margin: 0;
    font-family: "East Sea Dokdo", sans-serif;
    background-color: #121212; /* 배경색 추가 */
`;

const LineWrap = styled.div`
    position: fixed;
    bottom: 40px;
    left: 50%; /* 화면 가운데 정렬 */
    transform: translateX(-50%); /* 중앙 정렬을 위한 변환 */
    background-color: #161A1E; /* 반투명 배경 */
    width: 752px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 20px;
    display: flex;
    justify-content: space-between; /* 양 옆으로 공간 분배 */
    align-items: center;
    z-index: 100; /* 다른 요소 위에 표시 */
    box-shadow: 
        -8px -8px 16px 0px #101216 inset, 
        0px -6px 48px 0px rgba(62, 62, 62, 0.20), 
        8px 8px 16px 0px #1A1E1F inset; /* 그림자 스타일 추가 */
    padding: 0 24px; /* 양 옆으로 24px 패딩 추가 */
`;

const LineText = styled.p`
    margin: 0;
    color: #FFF;
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    flex-grow: 1;
`;

const ToggleButton = styled.div`
    padding: 14px;
    max-height: 78px;
    background-color: #FEBB6C;
    color: #ffffff;
    font-size: 36px;
    line-height: 140%;
    font-family: 'East Sea Dokdo';
    text-align: center;
    line-height: 60px;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 
        -8px -8px 16px 0px #DEB95C inset, 
        -12px -12px 48px 0px rgba(255, 222, 137, 0.40), 
        8px 8px 16px 0px #FFDE89 inset;
    transition: all 0.3s ease;
    position: fixed;
    right: 40px;
    bottom: 40px;
    visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
    z-index: 100; /* 다른 요소 위에 표시 */

    &:active {
        background-color: #ffffff;
        color: #FEBB6C;
        box-shadow: 
            -8px -8px 16px 0px #F6E5B9 inset, 
            0px -6px 48px 0px rgba(255, 239, 233, 0.40), 
            8px 8px 16px 0px #FFF1CC inset;
    }
`;

const ImageContainer = styled.div`
    width: 36px;
    height: 36px;
    visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
    cursor: ${({ hidden }) => (hidden ? 'default' : 'pointer')};

    img {
        width: 100%;
        height: 100%;
    }
`;

// TextLine Component
const TextLine = ({ texts, showVideo }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 텍스트의 인덱스

    const updateUI = (newIndex) => {
        setCurrentIndex(newIndex);
    };

    const handleClick = () => {
        if (currentIndex < texts.length - 1) {
            updateUI(currentIndex + 1);
        }
        if (showVideo) {
            const timer = setTimeout(() => {
                showVideo(true);
            }, 3000);
            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    };

    return (
        <Container>
            <LineWrap>
                <ImageContainer
                    hidden={currentIndex === 0}
                    onClick={() => currentIndex > 0 && updateUI(currentIndex - 1)}
                >
                    <img src="/image/Before Icon.png" alt="Left Icon" />
                </ImageContainer>

                <LineText>
                    {texts[currentIndex]}
                </LineText>

                <ImageContainer
                    hidden={currentIndex === texts.length - 1}
                    onClick={handleClick}
                >
                    <img src="/image/Next Icon.png" alt="Right Icon" />
                </ImageContainer>
            </LineWrap>

            {/* 버튼은 마지막 텍스트일 때만 나타남 */}
            <ToggleButton
                show={currentIndex === texts.length - 1}
                id="toggle-button"
                onClick={() => { navigate('/scene2'); }}
            >
                다음으로
            </ToggleButton>
        </Container>
    );
};

export default TextLine;