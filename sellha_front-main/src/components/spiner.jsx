import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';
import { useNProgress } from '@tanem/react-nprogress';

function index({ loading, info }) {
  const { progress } = useNProgress({
    isAnimating: loading,
    incrementDuration: 10,
  });

  return (
    <ProgressDiv>
      <Progress
        type="circle"
        width={50}
        strokeColor={{
          '0%': '#FFBC69',
          '100%': '#FFF4C3',
        }}
        showInfo={false}
        strokeWidth={20}
        percent={progress.toFixed(1) * 100}
      />
      <span>{info || '가져오는 중...'}</span>
    </ProgressDiv>
  );
}

export default index;

const ProgressDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  width: 100;
  color: ${(props) => props.theme.colors.orange};

  span {
    margin-top: 15px;
  }
`;
