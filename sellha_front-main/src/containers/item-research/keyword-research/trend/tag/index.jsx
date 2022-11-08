import React from 'react';
import styled from 'styled-components';

import { QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

export default function Index({ topTags }) {
  return (
    <Container>
      <TagTitleView>
        <span>상위 연관 태그</span>
        <QuestionCircleOutlined
          data-tip
          data-for="tooltip-tag"
          style={{
            color: '#646464',
            cursor: 'pointer',
          }}
        />
      </TagTitleView>
      <ReactTooltip
        className="tooltip-tag"
        id="tooltip-tag"
        place="right"
        effect="solid"
      >
        <span>
          관련 키워드 중 상위 10개의 해쉬태그 언급 횟수 순으로 보여줍니다.
        </span>
      </ReactTooltip>
      {topTags && <Tag topTags={topTags} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px 20px;
  margin-bottom: 15px;
  background: #ffffff;
  box-shadow: 1px 1px 2px 1.5px ${(props) => props.theme.colors.lightGray};
  /* box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 10%); */
  border-radius: 1em;
  user-select: none;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TagTitleView = styled.div`
  display: flex;
  align-items: center;
  /* min-width: 10em; */
  margin-right: 1em;

  span {
    font-size: 0.9em;
    font-weight: 600;
    margin-right: 0.25em;
  }
`;

function Tag({ topTags }) {
  if (topTags) {
    const tagList = topTags.map((tag) => (
      <TagItem key={tag[0]}># {tag[0]}</TagItem>
    ));

    return <TagView>{tagList}</TagView>;
  }
}

const TagView = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.span`
  margin: 0.25em 0;
  padding: 0.25em 0.5em;
  background-color: ${(props) => props.theme.colors.lineGray};
  border-radius: 0.25em;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8em;
  /* min-width: 60px; */
  /* background: rgba(235, 235, 235, 0.5); */

  :not(:last-child) {
    margin-right: 10px;
  }
`;
