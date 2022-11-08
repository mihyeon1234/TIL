import React from 'react';

import styled from 'styled-components';

import KeywordCombi from './keyword-combi';
import KeywordSynonym from './keyword-synonym';

export default function Index() {
  return (
    <Container>
      <KeywordCombi />
      <KeywordSynonym />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
`;
