import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import kakaoLogo from 'assets/icon/alarm_kakao.png';
import AlarmTitle from './components/Title';
import AlarmSelect from './components/Select';

function index() {
  const { visibleAlarm } = useSelector((state) => state.keywordMonitor);

  return (
    <AlarmWrapper visible={visibleAlarm.toString()}>
      <AlarmTitle />
      <AlarmBox visible={visibleAlarm.toString()}>
        <InfoBox>
          <InfoIcon src={kakaoLogo} alt="kakao" />
          <InfoTitle>
            매일 오전 8시 30분 이후에 카카오톡 메시지로 순위를 알려 드립니다.
          </InfoTitle>
        </InfoBox>
        <AlarmSelect />
      </AlarmBox>
    </AlarmWrapper>
  );
}

export default index;
const AlarmWrapper = styled.section`
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

const AlarmBox = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
  min-height: 10rem;
  padding: 0 1.5em;
  margin-bottom: 1rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.img`
  height: 13px;
  border-radius: 3px;
`;

const InfoTitle = styled.span`
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;
