import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import {
  DownOutlined,
  QuestionCircleOutlined,
  UpOutlined,
} from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../utils';
import { setVisibleEdit } from '../../reducer';

const Title = () => {
  const dispatch = useDispatch();
  const { visibleEdit } = useSelector((state) => state.keywordMonitor);
  const { selectItem } = useSelector((state) => state.monitoringDetail);

  const checkAccess = (type) => {
    if (selectItem.member_id === -111) {
      return showAlert(
        `예시 상품은 ${type} 기능을 이용할 수 없습니다. <br/> 상품을 직접 등록하여 이용해 보세요!`,
      );
    }
    if (selectItem.is_delete === 1) {
      return showAlert(`삭제된 상품은 ${type} 기능을 이용할 수 없습니다.`);
    }
    return dispatch(setVisibleEdit());
  };

  return (
    <EditHeader onClick={() => checkAccess('키워드 추가/편집')}>
      <EditTitleBox>
        <EditTitle visible={visibleEdit?.toString()}>
          키워드 추가/편집
          <QuestionCircle data-tip data-for="tooltipEdit" />
        </EditTitle>
      </EditTitleBox>
      <PopButton visible={visibleEdit?.toString()}>
        {visibleEdit && <UpOutlined />}
        {!visibleEdit && <DownOutlined />}
      </PopButton>
      <ReactTooltip
        id="tooltipEdit"
        className="tooltipCSS-keyword"
        place="right"
        effect="solid"
      >
        추적할 키워드를 추가하거나 편집할 수 있습니다.
        <br />
        등록된 팀이 있다면, 팀 키워드에 어떤 키워드들이 있는지 확인해보세요.
      </ReactTooltip>
    </EditHeader>
  );
};

export default Title;

const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const EditTitleBox = styled.div`
  display: flex;
  margin: 0.85em 0;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const EditTitle = styled.span`
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
