import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import EditTitle from './components/Title';
import KeywordInput from './components/Input';
import KeywordList from './components/List';

function index({ asyncRakingTable }) {
  const { visibleEdit } = useSelector((state) => state.keywordMonitor);

  return (
    <EditWrapper visible={visibleEdit.toString()}>
      <EditTitle />
      <EditBox visible={visibleEdit.toString()}>
        <KeywordInput />
        <KeywordList asyncRakingTable={asyncRakingTable} />
      </EditBox>
    </EditWrapper>
  );
}

export default index;

const EditWrapper = styled.section`
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.visible === 'false'
        ? props.theme.colors.lightGray
        : props.theme.colors.primary};
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  margin-bottom: 1.5em;
  :hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
    > div > div > span:nth-child(1),
    > div > button {
      color: ${(props) => props.theme.colors.orange};
    }
  }
`;

const EditBox = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  min-height: 24em;
  padding: 0 1.5em;
  margin-bottom: 1rem;
  .teamTooltip {
    border-radius: 1.25em;
    font-size: 0.8em;
    padding: 0.6em 1em;
  }
`;
