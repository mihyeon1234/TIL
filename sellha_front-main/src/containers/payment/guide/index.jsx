import React from 'react';
import styled from 'styled-components';
import CheckCircle from 'assets/images/check-circle.png';

function getTextTd(text, rowSpan) {
  return <td rowSpan={rowSpan}>{text}</td>;
}

function getSpanTd(text, label, type) {
  return (
    <td data-type={type}>
      {text} <span type={type}>{label}</span>
    </td>
  );
}

function CheckCircleTd() {
  return (
    <td>
      <img alt="check" src={CheckCircle} />
    </td>
  );
}

function GuideTableHead() {
  return (
    <GuideThead>
      <tr>
        {getTextTd('멤버십별 이용 안내')}
        {getTextTd('')}
        {getTextTd('가입셀러')}
        {getTextTd('꿀벌셀러')}
        {getTextTd('중벌셀러')}
        {getTextTd('왕벌셀러')}
      </tr>
    </GuideThead>
  );
}

function Index() {
  return (
    <Container>
      <GuideTable>
        <GuideTableHead />
        <tbody>
          <tr>
            {getTextTd('아이템 발굴')}
            {getSpanTd('키워드 인기 차트', '엑셀', 'ex')}
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
          </tr>
          <tr>
            {getTextTd('')}
            {getSpanTd('카테고리 인기 차트', '엑셀', 'ex')}
            {getTextTd('')}
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
          </tr>
          <tr>
            {getTextTd('')}
            {getTextTd('트렌드 차트')}
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
          </tr>
          <tr />
          <tr>
            {getTextTd('아이템 분석')}
            {getTextTd('키워드 분석/트렌드 피드 플랫폼 수')}
            {getTextTd('2개')}
            {getTextTd('4개')}
            {getTextTd('4개')}
            {getTextTd('무제한')}
          </tr>
          <tr>
            {getTextTd('')}
            {getSpanTd('키워드 기록', '팀공유', 'sh')}
            {getTextTd('')}
            {getTextTd('20개')}
            {getTextTd('50개')}
            {getTextTd('무제한')}
          </tr>
          <tr />
          <tr>
            {getTextTd('아이템 소싱')}
            {getTextTd('소싱 서비스 상담')}
            {getTextTd('')}
            {getTextTd('')}
            {getTextTd('')}
            {getTextTd('1회', 2)}
          </tr>
          <tr>
            {getTextTd('')}
            {getTextTd('계약 서비스')}
            {getTextTd('')}
            {getTextTd('')}
            {getTextTd('')}
          </tr>
          <tr />
          <tr>
            {getTextTd('마케팅 도구')}
            {getSpanTd('상품명 분석 / 카드 등록 개수', '엑셀', 'ex')}
            {getTextTd('2개')}
            {getTextTd('3개')}
            {getTextTd('5개')}
            {getTextTd('무제한')}
          </tr>
          <tr>
            {getTextTd('')}
            {getSpanTd('콘텐츠 분석', '예정', 'disabled')}
            {getTextTd('')}
            {getTextTd('')}
            {getTextTd('')}
            {getTextTd('')}
          </tr>
          <tr />
          <tr>
            {getTextTd('아이템 모니터링')}
            {getTextTd('상품 등록 개수')}
            {getTextTd('')}
            {getTextTd('20개')}
            {getTextTd('40개')}
            {getTextTd('무제한')}
          </tr>
          <tr>
            {getTextTd('')}
            {getTextTd('키워드 모니터링 / 키워드 등록 개수')}
            {getTextTd('')}
            {getTextTd('100개')}
            {getTextTd('200개')}
            {getTextTd('무제한')}
          </tr>
          <tr>
            {getTextTd('')}
            {getTextTd('키워드 모니터링 / 순위 알림 등록 개수')}
            {getTextTd('')}
            {getTextTd('5개')}
            {getTextTd('30개')}
            {getTextTd('100개')}
          </tr>
          <tr>
            {getTextTd('')}
            {getSpanTd('키워드 모니터링 / 팀 키워드', '팀 공유', 'sh')}
            {getTextTd('')}
            {getTextTd('')}
            <CheckCircleTd />
            <CheckCircleTd />
          </tr>
          <tr>
            {getTextTd('')}
            {getSpanTd('키워드 모니터링 / 팀 노트', '팀 공유', 'sh')}
            {getTextTd('')}
            <CheckCircleTd />
            <CheckCircleTd />
            <CheckCircleTd />
          </tr>
          <tr>
            {getTextTd('')}
            {getTextTd('리뷰 모니터링 / 리뷰 알림 등록 개수')}
            {getTextTd('')}
            {getTextTd('3개')}
            {getTextTd('5개')}
            {getTextTd('무제한')}
          </tr>
        </tbody>
      </GuideTable>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  margin-top: 50px;
  border: 1px solid #ebebeb;
  box-shadow: 0px 1px 10px rgb(0 0 0 / 15%);
  border-radius: 30px;
  overflow-y: auto;
  @media ${(props) => props.theme.mobile} {
    width: 95%;
    min-width: unset;
  }
`;

const GuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 30px 0;
  min-width: 850px;

  thead tr {
    height: 50px;
  }

  tbody tr {
    height: 35px;
  }

  thead td {
    font-weight: bold;
    font-size: 1em;
  }

  td {
    &:nth-child(1) {
      text-indent: 45px;
    }
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      text-align: center;
    }
    &:nth-child(6) {
      text-align: center;
      padding-right: 45px;
    }

    &[data-type='disabled'] {
      color: #bdbdbd;
    }
  }

  td span {
    font-size: 9pt;
    padding: 0 5px;
    border-radius: 5px;
    margin-left: 5px;
  }
  td span[type='ex'] {
    border: 1px solid rgba(0, 174, 0, 0.6);
    color: rgba(0, 174, 0, 0.6);
  }
  td span[type='sh'] {
    border: 1px solid rgba(45, 84, 184, 0.6);
    color: rgba(45, 84, 184, 0.6);
  }
  td span[type='disabled'] {
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
  }
`;

const GuideThead = styled.thead`
  border-bottom: 1px solid #ebebeb;
`;
