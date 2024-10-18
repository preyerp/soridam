import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.70);
    color: #fff;
    padding: 80px;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 400px;
`;

const Title = styled.div`
    font-size: 24px;
    margin-bottom: 40px;
    font-weight: 700;
`;

const DialogueContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.90);
    padding: 14px;
    border-radius: 8px;
    margin: 0;
    box-shadow: 
        -8px -8px 16px 0px #CFDAE5 inset, 
        0px -6px 48px 0px rgba(206, 218, 229, 0.25), 
        8px 8px 16px 0px #E7E7E7 inset;
`;

const Dialogue = styled.div`
    font-family: 'East Sea Dokdo', cursive;
    font-size: 32px;
    color: #161A1E;
    margin: 0;
`;

const Instruction = styled.div`
    font-size: 20px;
    margin-top: 40px;
`;

const Modal = () => {
    return (
        <ModalContainer>
            <Title>도움말</Title>
            <DialogueContainer>
                <Dialogue>어흥! 떡하나 주면 안 잡아먹지!</Dialogue>
            </DialogueContainer>
            <Instruction>호랑이처럼 우렁차게 소리내어 볼까요!</Instruction>
        </ModalContainer>
    );
};

export default Modal;