import { useNProgress } from '@tanem/react-nprogress';
import React, { useEffect } from 'react';

import styled from 'styled-components';
import { Progress } from 'antd';
import { useDispatch } from 'react-redux';
import { setProgress } from '../reducer';

const ProgressBar = ({ isAnimating }) => {
  const dispatch = useDispatch();
  const { isFinished, progress } = useNProgress({
    isAnimating,
  });

  useEffect(() => {
    dispatch(setProgress(progress));
  }, [progress]);

  return (
    <Container isFinished={isFinished}>
      <Bar
        percent={progress * 100}
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
