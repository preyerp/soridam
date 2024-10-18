import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import Toggle from '../../ui/Button/Toggle';

// Styled components
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #000;
`;
const SnowflakeIcon = styled.img`
  width: 40%;
  height: auto;
  object-fit: cover;
`;
const FlexDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


function SceneTemp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [randomName, setRandomName] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [hoveredImage, setHoveredImage] = useState({ visible: false, x: 0, y: 0, src: '' });
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [hoveredId, setHoveredId] = useState(null); // 현재 호버된 StudentName의 ID 저장



    return (
        <PageWrapper>
            <FlexDiv>
                <SnowflakeIcon src={`/image/logo_white.png`} />
                <Toggle txt={"시작하기"} width={"112px"} height={"78px"} onClick={() => { navigate('/scene1'); }}></Toggle>
            </FlexDiv>

        </PageWrapper>
    );
}

export default SceneTemp;
