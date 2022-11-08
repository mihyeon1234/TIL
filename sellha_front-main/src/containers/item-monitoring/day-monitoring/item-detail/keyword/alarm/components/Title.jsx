import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';
import {
  DownOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

import { showAlert } from '../../utils';
import { setVisibleAlarm } from '../../reducer';

const Title = () => {
  const dispatch = useDispatch();
  const { selectItem } = useSelector((state) => state.monitoringDetail);
  const { visibleAlarm } = useSelector((state) => state.keywordMonitor);

  const checkAccess = (type) => {
    if (selectItem.member_id === -111) {
      return showAlert(
        `예시 상품은 ${type} 기능을 이용할 수 없습니다. <br/> 상품을 직접 등록하여 이용해 보세요!`,
      );
    }
    if (selectItem.is_delete === 1) {
      return showAlert(`삭제된 상품은 ${type} 기능을 이용할 수 없습니다.`);
    }
    return dispatch(setVisibleAlarm());
  };

  return (
    <AlarmHeader id="alarm" onClick={() => checkAccess('순위 알림')}>
      <AlarmTitleBox>
        <AlarmTitle visible={visibleAlarm.toString()}>순위 알림</AlarmTitle>
        <QuestionCircle data-tip data-for="tooltipAlarm" />
      </AlarmTitleBox>
      <PopButton visible={visibleAlarm.toString()}>
        {visibleAlarm && <UpOutlined />}
        {!visibleAlarm && <DownOutlined />}
      </PopButton>
      <ReactTooltip
        id="tooltipAlarm"
        className="tooltipCSS-keyword"
        place="right"
        effect="solid"
      >
        추적하고 있는 키워드 중에서 매일 순위 알림을 받을 키워드를 설정할 수
        있습니다.
      </ReactTooltip>
    </AlarmHeader>
  );
};

export default Title;

const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AlarmTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const AlarmTitle = styled.span`
  font-size: 1em;
  font-weight: 600;
  margin-left: 1.5em;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.orange};
`;

const PopButton = styled(Button)`
  border-color: transparent;
  box-shadow: none;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.darkGray
      : props.theme.colors.primary};
  margin-right: 1em;
  padding: 0.15em 0.5em;
  height: 1.95em;
  :hover {
    border-color: transparent;
  }
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;
