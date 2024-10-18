import React, { useState } from 'react';
import Toggle from './Toggle';

const BlackToggle = (props) => {
    // 현재 아이콘의 상태를 관리하기 위한 useState
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    return (
        <Toggle
            {...props}  
            color="#fefefe"
            backColor="#161A1E"
            shadow="-8px -8px 16px 0px #101216 inset, 0px -6px 48px 0px rgba(62, 62, 62, 0.40), 8px 8px 16px 0px #1A1E1F inset"
            pressedColor="#161A1E"
            pressedBackColor="#fefefe"
            pressedShadow="-8px -8px 16px 0px #CFDAE5 inset, 0px -6px 48px 0px rgba(206, 218, 229, 0.25), 8px 8px 16px 0px #E7E7E7 inset"
            onMouseDown={handleMouseDown} // 마우스 다운 이벤트 추가
            onMouseUp={handleMouseUp} // 마우스 업 이벤트 추가
        >
            <i 
                className={`fas fa-question`} 
                style={{ color: isPressed ? "#000000" : "#FFFFFF", transition: 'color 0.3s' }} // 클릭 시 색상 변경
            ></i>
        </Toggle>
    );
};

export default BlackToggle;
