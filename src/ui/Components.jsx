import React from 'react';
import styled from "styled-components";

import Toggle from './Button/Toggle';
import BlackToggle from './Button/BlackToggle';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    height: 100vh;
    background-color: #121212;
`;

const Components = () => {
    return (
        <Container>
            <Toggle 
                children="시작하기"
                color="#ffffff"
                backColor="#FEBB6C" 
                shadow="-8px -8px 16px 0px #DEB95C inset, -12px -12px 48px 0px rgba(255, 222, 137, 0.40), 8px 8px 16px 0px #FFDE89 inset"
                pressedColor="#FEBB6C"
                pressedBackColor="#ffffff"
                pressedShadow="-8px -8px 16px 0px #F6E5B9 inset, 0px -6px 48px 0px rgba(255, 249, 233, 0.40), 8px 8px 16px 0px #FFF1CC inset"
            />
            <BlackToggle />
        </Container>
    );
};

export default Components;
