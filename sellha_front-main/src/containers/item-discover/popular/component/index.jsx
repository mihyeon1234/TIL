import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

export function getAntonymText(rowText) {
  switch (rowText) {
    case '매우높음':
      return { text: '매우나쁨', type: 'bad' };
    case '높음':
      return { text: '나쁨', type: 'bad' };
    case '보통':
      return { text: '보통', type: 'normal' };
    case '낮음':
      return { text: '좋음', type: 'good' };
    case '매우낮음':
      return { text: '매우좋음', type: 'good' };
    default:
      return { text: '-', type: '' };
  }
}

export function getSynonymText(rowText) {
  switch (rowText) {
    case '매우높음':
      return { text: '매우좋음', type: 'good' };
    case '높음':
      return { text: '좋음', type: 'good' };
    case '보통':
      return { text: '보통', type: 'normal' };
    case '낮음':
      return { text: '나쁨', type: 'bad' };
    case '매우낮음':
      return { text: '매우나쁨', type: 'bad' };
    default:
      return { text: '-', type: '' };
  }
}

export function getCompeteTagText(text) {
  const compete = parseFloat(text.toString().replace(',', ''));

  let competeText = '';
  if (compete >= 70.8) {
    competeText = getAntonymText('매우높음');
  } else if (compete < 70.8 && compete >= 10.4) {
    competeText = getAntonymText('높음');
  } else if (compete < 10.4 && compete >= 0.5) {
    competeText = getAntonymText('보통');
  } else if (compete < 0.5 && compete >= 0.05) {
    competeText = getAntonymText('낮음');
  } else if (compete < 0.05 && compete >= 0) {
    competeText = getAntonymText('매우낮음');
  }

  return competeText;
}

export function getSearchAmountTagText(amount) {
  let tagText = '';
  if (amount >= 20000) {
    tagText = '대형';
  } else if (amount < 20000 && amount >= 5000) {
    tagText = '중형';
  } else if (amount < 5000) {
    tagText = '소형';
  }

  return tagText;
}

export function getMallRatioTagText(data) {
  let ratioText = '';
  if (data >= 80) {
    ratioText = getAntonymText('매우높음');
  } else if (data < 80 && data >= 60) {
    ratioText = getAntonymText('높음');
  } else if (data < 60 && data >= 40) {
    ratioText = getAntonymText('보통');
  } else if (data < 40 && data >= 20) {
    ratioText = getAntonymText('낮음');
  } else if (data < 20) {
    ratioText = getAntonymText('매우낮음');
  }

  return ratioText;
}

export function DiscoverTooltip({ tooltipId, totalCount }) {
  return (
    <TooltipContainer
      id={tooltipId}
      place="top"
      effect="solid"
      backgroundColor="white"
      border
      borderColor="#ebebeb"
      textColor="#7F7F7F"
    >
      <TooltipText>
        전체 카테고리 {totalCount?.toLocaleString()}개 기준으로,
      </TooltipText>
      <TooltipText>비율이 낮을수록 경쟁이 낮은 카테고리입니다.</TooltipText>
    </TooltipContainer>
  );
}

const TooltipContainer = styled(ReactTooltip)`
  width: 24em;
  border-radius: 1em !important;
  z-index: 999 !important;
`;

const TooltipText = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
`;
