import React from 'react';
import styled from "styled-components";

const styles = {
    container: {
        position: 'fixed',
        bottom: '64px',  // 화면 하단 10% 위치
        left: '50%',    // 화면 가운데 정렬
        transform: 'translateX(-50%)',  // 중앙 정렬을 위한 변환
        backgroundColor: 'rgba(18, 18, 18, 0.70)', // 반투명 배경
        width: '752px',
        height: '120px',
        flexShrink: '0',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,  // 다른 요소 위에 표시
    },
};

const LineText = styled.p`
    margin: 0;
    color: #FFF;
    text-align: center;
    font-family: "East Sea Dokdo";
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 56px */
`;

const Line = ({ character, text }) => {
    return (
        <div style={styles.container}>
            <LineText>{text}</LineText>
        </div>
    );
};

export default Line;
