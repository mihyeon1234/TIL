import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

import SelectBox from './components/SelectBox';
import MemoBox from './components/MemoBox';
import SaveBox from './components/SaveBox';
import { resetNamingTool, setVisibleTool } from '../reducer';

const Index = () => {
  const dispatch = useDispatch();
  const { visibleBox, visibleTool } = useSelector(
    (state) => state.productNaming,
  );

  useEffect(() => dispatch(resetNamingTool()), []);

  return (
    <Container
      visible={visibleBox.toString()}
      visibleTool={visibleTool.toString()}
    >
      <HeaderDiv>
        <HeaderText>상품명 최적화 도구</HeaderText>
        <ButtonDiv onClick={() => dispatch(setVisibleTool())}>
          {visibleTool ? (
            <ButtonText>닫기</ButtonText>
          ) : (
            <ButtonText>열기</ButtonText>
          )}
          {visibleTool ? <DownIcon /> : <UpIcon />}
        </ButtonDiv>
      </HeaderDiv>
      <FunctionDiv>
        <SelectBox />
        <MemoBox />
        <SaveBox />
      </FunctionDiv>
    </Container>
  );
};

export default Index;

const Container = styled.div`
  width: 75%;
  height: 248px;
  display: ${({ visible }) => (visible === 'true' ? 'block' : 'none')};

  position: fixed;
  bottom: 0;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 6px 1px ${({ theme }) => theme.colors.lightGray};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1.5em;

  transform: ${(props) =>
    props.visibleTool === 'true' ? `0` : `translateY(86%)`};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0;

  .ant-input-affix-wrapper > input.ant-input {
    padding: 0;
    border: none;
    outline: none;
    background: #f6f6f6;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1.5em 1.5em 0 0;
  background-color: ${({ theme }) => theme.colors.primary}; /* #268cdd; */
`;

const FunctionDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1.2rem;
  gap: 10px;
`;

const HeaderText = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 0.78rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const UpIcon = styled(UpOutlined)`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const DownIcon = styled(DownOutlined)`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.darkGray};
`;
