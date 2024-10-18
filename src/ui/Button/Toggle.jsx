import React from 'react'
import styled from "styled-components";


const StyledButton = styled.div`
    width: ${(props) => props.width || "64px"};    
    height: ${(props) => props.height || "64px"};    
    display:flex;
    align-items: center;

    min-width: 64px;
    border: none;
    border-radius: 20px;
    background-color: #FEBB6C;
    box-shadow: -8px -8px 16px 0px #DEB95C inset, 0px -6px 48px 0px rgba(255, 222, 137, 0.40), 8px 8px 16px 0px #FFDE89 inset;
    transition: background-color 0.2s ease; /* 색 변화에 부드러운 전환 효과 */
`;
const ButtonText = styled.p`
    width: 100%;
    margin: 0;
    text-align: center;
    font-family: "East Sea Dokdo";
    font-size: 36px;
    color: #fff;
    line-height: 140%;
`;

function Toggle(props) {
    const { txt, height, width, onClick } = props;
    return (
        <StyledButton onClick={onClick} width={width} height={height}>
            <ButtonText>
                {txt || '버튼'}
            </ButtonText>
        </StyledButton>
    )
}

export default Toggle;
