import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { CloseOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import { setDeselectKeyword, unsetSelectKeyword } from '../../reducer';

const SelectBox = () => {
  const dispatch = useDispatch();
  const { selectKeywords } = useSelector((state) => state.productNaming);

  const onClickReset = () => {
    Swal.fire({
      text: '선택한 키워드가 전체 해제됩니다. 계속 진행하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: `확인`,
      denyButtonText: `닫기`,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      confirmButtonColor: '#FFC83A',
      denyButtonColor: '#D9D9D9',
      allowEnterKey: false,
    }).then(({ isConfirmed }) => isConfirmed && dispatch(unsetSelectKeyword()));
  };

  return (
    <Container>
      <TitleBox>
        <Title>선택 키워드 {selectKeywords.length}개</Title>
        {selectKeywords.length > 0 && (
          <ResetButton onClick={onClickReset}>전체 해제</ResetButton>
        )}
      </TitleBox>
      <ExampleText>키워드 (월간 검색수)</ExampleText>
      <ListBox>
        <TagsWrapper>
          {selectKeywords.length === 0 && (
            <NoSelectText>선택된 키워드가 없습니다.</NoSelectText>
          )}
          {selectKeywords.map((value) => (
            <SelectKeywordTag key={value.relKeyword}>
              {value.relKeyword} ({value.searchAmount.toLocaleString()})
              <DelIcon
                onClick={() => dispatch(setDeselectKeyword(value.relKeyword))}
              />
            </SelectKeywordTag>
          ))}
        </TagsWrapper>
      </ListBox>
    </Container>
  );
};

export default SelectBox;

const Container = styled.div`
  width: 30%;
  border-right: 2px solid ${({ theme }) => theme.colors.lineGray};
  padding-right: 8px;
`;

const Title = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
`;

const NoSelectText = styled.div`
  font-size: 0.8rem;
`;

const ListBox = styled.div`
  margin: 8px 0;
  height: 150px;
  overflow-y: auto;

  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    bottom: 0;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.089);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SelectKeywordTag = styled.span`
  display: flex;
  align-items: center;
  margin: 3px;
  padding: 2px 8px;
  border-radius: 0.2rem;
  height: fit-content;
  width: fit-content;
  font-size: 0.73rem;
  background-color: ${({ theme }) => theme.colors.lineGray};
`;

const DelIcon = styled(CloseOutlined)`
  margin-left: 0.25rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.65rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResetButton = styled.span`
  border-radius: 5px;
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  color: ${(props) => props.theme.colors.darkGray};
  :hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const ExampleText = styled.div`
  font-size: 0.65rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
