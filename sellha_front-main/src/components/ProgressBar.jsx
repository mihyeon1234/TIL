import { useNProgress } from '@tanem/react-nprogress';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

const ProgressBar = ({ isAnimating, setTip }) => {
  const { isFinished, progress } = useNProgress({
    isAnimating,
    incrementDuration: 100,
  });

  useEffect(() => {
    if (progress >= 0 && progress < 0.3) setTip('아이템을 찾는 중');
    else if (progress >= 0.3 && progress < 0.45) setTip('아이템을 가져오는 중');
    else if (progress >= 0.45 && progress < 0.6) setTip('아이템을 씻는 중');
    else if (progress >= 0.6 && progress < 0.75)
      setTip('아이템을 깨끗하게 닦는 중');
    else if (progress >= 0.75 && progress < 0.9) setTip('아이템을 감상하는 중');
    else if (progress >= 0.9) setTip('아이템을 포장하는 중');
    else setTip('');
  }, [progress]);

  return (
    <Container isFinished={isFinished}>
      <Bar
        percent={progress.toFixed(1) * 100}
        status="active"
        showInfo={false}
        size="small"
        strokeWidth={3}
        strokeColor="#FFBC69"
        trailColor="#FFF4C3"
        strokeLinecap="butt"
      />
    </Container>
  );
};

const Container = styled.div`
  opacity: ${(props) => (props.isFinished ? 0 : 1)};
  pointer-events: none;
`;

const Bar = styled(Progress)`
  padding: 0 1.2em;
  position: relative;
  top: 80px;
  z-index: 9;
`;
export default ProgressBar;

export const IndicatorIcon = styled(LoadingOutlined)`
  font-size: 14px;
  color: #ffbc69;
`;

export const TipBox = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 14px;
  font-weight: 300;
  padding: 0 10px;
`;
