import React from 'react';
import styled from 'styled-components';

export default function Intro({ pageInfo }) {
  if (!pageInfo) {
    return <></>;
  }

  return (
    <Container>
      <TitleDiv>{pageInfo.title}</TitleDiv>
      <ContentDiv>
        {pageInfo.contents.map((content) => (
          <ContentSpan key={content}>{content}</ContentSpan>
        ))}
      </ContentDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffda4f;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TitleDiv = styled.div`
  margin-top: 0.5em;

  font-weight: 600;
  font-size: 1.2em;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5em;

  font-size: 0.85em;
  font-weight: 500;
`;

const ContentSpan = styled.span``;
