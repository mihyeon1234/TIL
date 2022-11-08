import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line no-unused-vars
function First({ setUploadForm }) {
  return (
    <Container>
      <SButton
        onClick={() =>
          setUploadForm((prev) => ({ ...prev, projectType: '중단 상태' }))
        }
      >
        중단 상태
      </SButton>
      <SButton
        onClick={() =>
          setUploadForm((prev) => ({ ...prev, projectType: '런칭 완료' }))
        }
      >
        런칭 완료
      </SButton>
    </Container>
  );
}

export default First;
const Container = styled.div`
  height: 350px;
  width: 500px;
  line-height: 350px;
`;
const SButton = styled(Button)`
  height: 120px;
  width: 120px;
  font-size: 1.1em;
  margin: 1em;
  border-radius: 20px;
  box-shadow: 3px 3px 10px 3px #ebebeb;
`;
