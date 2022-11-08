import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { deleteSaveMemo } from '../../reducer';

const SaveBox = () => {
  const dispatch = useDispatch();
  const { saveMemos } = useSelector((state) => state.productNaming);

  return (
    <Container>
      <Title>상품명 저장소</Title>
      <MemoBox>
        {saveMemos.length === 0 && (
          <MemoList>
            <MemoItemText>후보 상품명을 저장해 주세요.</MemoItemText>
          </MemoList>
        )}
        {saveMemos.map((memo, index) => (
          <MemoList key={memo}>
            <MemoNumberText>{index + 1}.</MemoNumberText>
            <MemoItemBox>
              <MemoItemText>{memo}</MemoItemText>
              <ButtonBox>
                <CopyButton
                  data-tip
                  data-for="tooltip-copy"
                  data-event="click focus"
                >
                  복사
                </CopyButton>
                <ReactTooltip
                  id="tooltip-copy"
                  className="tooltip-copy"
                  place="top"
                  effect="solid"
                  afterShow={() => {
                    navigator.clipboard.writeText(memo);
                    setTimeout(ReactTooltip.hide, 1300);
                  }}
                >
                  복사 완료!
                </ReactTooltip>
                <DeleteButton onClick={() => dispatch(deleteSaveMemo(index))}>
                  삭제
                </DeleteButton>
              </ButtonBox>
            </MemoItemBox>
          </MemoList>
        ))}
      </MemoBox>
    </Container>
  );
};

export default SaveBox;

const Container = styled.div`
  width: 30%;
  .tooltip-copy {
    padding: 4px 8px;
    font-weight: 300;
    font-size: 0.7rem;
    border-radius: 1rem;
  }
`;

const Title = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
`;

const MemoBox = styled.div`
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

const MemoList = styled.div`
  display: flex;
  align-items: baseline;
  margin: 5px 1px;
`;

const MemoNumberText = styled.span`
  font-size: 0.82rem;
`;

const MemoItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 0.25rem;
`;

const MemoItemText = styled.span`
  font-size: 0.82rem;
  width: 66%;
  line-height: 1.25;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
  width: 25%;
`;

const ButtonStyle = styled.span`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  font-size: 0.7rem;
  cursor: pointer;
  width: 30px;
  padding: 1px 3px;
  :hover {
    font-weight: 600;
  }
`;

const DeleteButton = styled(ButtonStyle)``;

const CopyButton = styled(ButtonStyle)``;
