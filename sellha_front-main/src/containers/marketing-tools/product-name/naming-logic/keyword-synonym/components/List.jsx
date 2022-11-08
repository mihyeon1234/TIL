import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { CloseOutlined } from '@ant-design/icons';
import {
  deleteSynonymKeyword,
  resetSynonymKeyword,
} from 'containers/marketing-tools/product-name/reducer';

const List = () => {
  const dispatch = useDispatch();

  const { synoKeywords, synoResult } = useSelector(
    (state) => state.productNaming,
  );

  return (
    <ListContainer
      loading={synoResult.indexOf('default') < 0 ? 'true' : 'false'}
    >
      <ListTitleDiv>
        <TitleText>키워드 목록 {synoKeywords.length}개</TitleText>
        <ClearButton
          onClick={() => {
            dispatch(resetSynonymKeyword());
          }}
        >
          전체 삭제
        </ClearButton>
      </ListTitleDiv>
      <TagDiv>
        {synoKeywords.map((keyword) => (
          <SaveKeywordTag key={keyword}>
            {keyword}
            <DelIcon
              onClick={() => dispatch(deleteSynonymKeyword(keyword.trim()))}
            />
          </SaveKeywordTag>
        ))}
      </TagDiv>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  margin: ${({ loading }) =>
    loading === 'true' ? '1rem 0 1.2rem 0' : '1.2rem 0 1rem 0'};
  transform: ${({ loading }) =>
    loading === 'true' ? 'translate(0, 5px)' : 'translate(0, -5px)'};
  transition: transform 800ms cubic-bezier(0.3, 0, 0.2, 1);
`;

const ListTitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const SaveKeywordTag = styled.span`
  display: flex;
  width: fit-content;
  align-items: center;
  margin: 3px;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.colors.lineGray};
  border-radius: 0.2rem;
  height: fit-content;
  font-size: 0.73rem;
  background-color: ${({ theme }) => theme.colors.lineGray};
  cursor: ${({ keyword }) => (keyword === 'category' ? 'pointer' : 'auto')};
`;

const ClearButton = styled.span`
  font-size: 0.75rem;
  margin-right: 0.25rem;
  color: ${(props) => props.theme.colors.darkGray};
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const DelIcon = styled(CloseOutlined)`
  margin-left: 0.25rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.65rem;
`;
