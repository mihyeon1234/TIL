import React from 'react';
import styled from 'styled-components';

import { FolderOpenOutlined } from '@ant-design/icons';

// eslint-disable-next-line no-unused-vars
function Third({ files, setFiles }) {
  const handleUpload = async (e) => {
    setFiles([e.target.files[0]]);
  };

  return (
    <Container>
      <FolderOpenOutlined style={{ fontSize: '56px' }} />
      <FileName type="file" onChange={(e) => handleUpload(e)} />
      <div>
        {files.map((obj) => obj.name)}
        <br />* 하나의 파일로 압축해서 올려주세요.
      </div>
    </Container>
  );
}

export default Third;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 350px;
  width: 500px;
`;

const FileName = styled.input`
  text-align-last: center;
  margin-top: 2em;
`;
