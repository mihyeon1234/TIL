import React, { useState } from 'react';
import styled from 'styled-components';
import HoneyIcon from 'assets/icon/honey.png';
import QuestionImage from 'assets/icon/question.png';
import ArrowIcon from 'assets/icon/arrow-up-wh.png';

const questionData = [
  {
    title: '셀하의 기능을 미리 체험해 볼 수 있나요?',
    content:
      '네, 셀하를 처음 이용하시는 꿀벌셀러분들을 대상으로 14일 무료체험 혜텍을 제공하고 있습니다. 14일동안 꿀벌셀러 기능을 마음껏 이용해보세요. 단, 체험기간 종료 후 미해지시 서비스가 자동으로 구독됩니다.',
  },
  {
    title: '한달만 구독할 수도 있나요?',
    content:
      '네, 가능합니다. 이용하실 상품의 구독하기 옆 30일권 버튼을 클릭해서 결제해주세요.',
  },
  {
    title: '구독권을 변경할 수 있나요?',
    content:
      '구독 페이지 내 "변경하기" 버튼을 통해 언제든 변경하실 수 있습니다.',
  },
  {
    title: '신용카드 매출전표를 받을 수 있나요?',
    content:
      '부가세법시행령 제57조 2항에 따라 결제대행업체를 통한 신용카드 매출전표를 발행한 경우에는, 사업자가 별도의 세금계산서를 교부할 수 없습니다. 따라서 신용카드 매출전표는 결제대행사를 통해 직접 확인해주세요. 일반카드는 KG이니시스 고객센터(1588-4954)로 카카오페이는 카카오페이 고객센터(1644-7405)로 토스는 토스 고객센터(1599-4905)로 연락 부탁드립니다.',
  },
  {
    title: '구독취소는 어떻게 하나요?',
    content:
      '자동결제 해지 예약은 내정보 또는 구독 페이지에서 처리하실 수 있습니다. 이후 절차는 카드사에서 주관하게 되며, 최대 7일까지 소요될 수 있습니다. 구독 무료 체험 기간 동안 취소시 요금이 결제되지 않습니다.',
  },
];
function Tip() {
  return (
    <TipView>
      <PayIcon alt="honey" src={HoneyIcon} />
      <ContentTitle>셀하를 알차게 이용하는 꿀팁 </ContentTitle>
      <TipSub>첫 번째, 14일 무료 체험으로 구독을 시작하세요. </TipSub>
      <TipSub>
        두 번째, 아이템 발굴부터 키워드 순위 알림까지 다 이용해보세요.
      </TipSub>
      <TipSub>세 번째, 언제 어디서든 셀하를 이용할 수 있어요.</TipSub>
    </TipView>
  );
}

function openItem(str, setQuestionItem) {
  if (str === 'open') {
    setQuestionItem(['up', 'close']);
  } else {
    setQuestionItem(['down', 'open']);
  }
}

function QuestionContent(text, sub) {
  const [questionItem, setQuestionItem] = useState(['up', 'close']);
  return (
    <QuestionItem
      data-type={questionItem[1]}
      onClick={() => openItem(questionItem[1], setQuestionItem)}
    >
      <div>
        <div>{text}</div>
        <QuestionIcon
          alt="arrow"
          data-type={questionItem[0]}
          onClick={() => () => openItem(questionItem[0], setQuestionItem)}
        />
      </div>
      <span>{sub}</span>
    </QuestionItem>
  );
}

function Question() {
  return (
    <QuestionView>
      <PayIcon alt="question" src={QuestionImage} />

      <ContentTitle>
        자주 묻는 질문
        <QuestionIcon alt="arrow" src={ArrowIcon} />
      </ContentTitle>
      {QuestionContent(questionData[0].title, questionData[0].content)}
      {QuestionContent(questionData[1].title, questionData[1].content)}
      {QuestionContent(questionData[2].title, questionData[2].content)}
      {QuestionContent(questionData[3].title, questionData[3].content)}
      {QuestionContent(questionData[4].title, questionData[4].content)}
    </QuestionView>
  );
}

function Index() {
  return (
    <Container>
      <Tip />
      <Question />
    </Container>
  );
}

export default Index;

const ColumnCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(ColumnCenter)`
  width: 100%;
  padding: 50px 0;
  margin: 30px 0;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`;

const QuestionView = styled(Column)`
  width: 65%;
  max-width: 850px;
  min-width: 340px;
`;

const TipView = styled(QuestionView)`
  margin-bottom: 80px;
`;

const PayIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const ContentTitle = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15px;
`;

const TipSub = styled.span`
  font-size: 16px;
  margin-bottom: 5px;
`;

const QuestionItem = styled(ColumnCenter)`
  width: 100%;
  margin-bottom: 15px;
  background-color: #ffda4f;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-size: 17px;
  color: #fff;
  padding: 15px 15px;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  & div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${(props) => props.theme.mobile} {
      font-size: 15px;
    }
  }

  &[data-type='open'] span {
    display: flex;
    align-items: center;
    background-color: #fff;
    color: #8c8c8c;
    width: 100%;
    border-radius: 10px;
    padding: 10px 15px;
    margin-top: 15px;
  }

  &[data-type='close'] span {
    display: none;
  }
`;

const QuestionIcon = styled.img`
  height: 12px;
  content: url(${ArrowIcon});

  &[data-type='down'] {
    transform: rotate(180deg);
  }
`;
