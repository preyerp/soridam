import React from 'react';
import styled from 'styled-components';
import Toggle from '../../ui/Button/Toggle'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    height: 100vh;
    background-color: #121212;
`;

const MainImg = styled.img`
    
`;

const SceneMain = () => {
    return (
        <Container>
            <MainImg src={process.env.PUBLIC_URL + "../image/" + "logo_white.png"}/>
            <Toggle 
                title="시작하기"
                color="#ffffff"
                backColor="#FEBB6C" // 토마토색 배경
                shadow="-8px -8px 16px 0px #DEB95C inset, -12px -12px 48px 0px rgba(255, 222, 137, 0.40), 8px 8px 16px 0px #FFDE89 inset"
            />
        </Container>
    );
};

export default SceneMain;