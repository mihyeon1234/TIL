import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingImage05 from 'assets/images/landing05.png';
import LandingImage06 from 'assets/images/landing06.png';
import LandingImage07 from 'assets/images/landing07.png';
import Test from '../slider/index';

const menuInfoData = [
  {
    title: ['아직도 경쟁강도만 보고', '키워드를 찾으시나요?'],
    tabText: '아이템 발굴 & 분석',
    color: '#f1bead',
    content: [
      {
        title: '세부 카테고리 분석',
        content: [
          '총 3400여개가 넘는 네이버쇼핑의',
          '세부 카테고리를 분석했습니다.',
          '어떤 시장에 진입할 지 고민이라면',
          '한번 이용해보세요.',
        ],
      },
      {
        title: '인공지능 분석',
        content: [
          '빅데이터 기반 인공지능으로',
          '키워드별 성장성, 계절성, 브랜드',
          '점유율을 분석했습니다.',
        ],
      },
      {
        title: '매력도',
        content: [
          '실제 이커머스 기업에서 사용하는',
          '내부 알고리즘을 바탕으로',
          '매력도를 산정해드립니다.',
        ],
      },
      {
        title: '키워드 기록',
        content: [
          '셀러에게 시간은 금이죠.',
          '불필요한 시간을 낭비하지 않도록',
          '이미 본 키워드에 대해 기록을',
          '남길 수 있습니다.',
        ],
      },
    ],
  },
  {
    title: ['까다로운 아이템 소싱,', '셀하에 맡겨만 주세요'],
    tabText: '아이템 소싱',
    color: '#baaed4',
    content: [
      {
        title: '물건을 어디서 구할 지 막막할 때',
        content: [
          '원하는 상품만 있다면',
          '전세계 어디든 최적의 공장을 연결해드립니다.',
          '거래가 낯선 분들을 위해 숙련된 전문 인력이 대신',
          '협상이나 계약을 해드립니다.',
        ],
      },
    ],
  },
  {
    title: ['시선을 사로 잡기 위해', '마케팅은 필수죠'],
    tabText: '마케팅 도구',
    color: '#76bcc6',
    content: [
      {
        title: '상위 노출의 비법, 궁금하신가요?',
        content: [
          '아무리 좋은 상품이라도',
          '사람들이 모르면 소용없습니다.',
          '데이터 분석을 통해',
          '최적의 상품명을 찾아드립니다.',
        ],
      },
    ],
  },
  {
    title: ['키워드 하락을 방지하는', '신속한 대응 방법'],
    tabText: '아이템 모니터링',
    color: '#90aec6',
    content: [
      {
        title: '실시간으로 모니터링 하세요',
        content: [
          '즉각적인 대응을 위해 모니터링 기능을',
          '제공해드립니다. 키워드 순위와 리뷰를',
          '실시간으로 확인하세요.',
          '알람을 설정하면 매일 아침마다 카톡으로',
          '편리하게 받아볼 수 있습니다.',
        ],
      },
    ],
  },
];

function Title({ select }) {
  const item = menuInfoData[select].title.map((data) => (
    <span key={data}>{data}</span>
  ));

  return <TitleView>{item}</TitleView>;
}

function TabItem({ select, setSelect, setSubSelect }) {
  const item = menuInfoData.map((data, index) => (
    <Tab
      key={data.tabText}
      type="button"
      value={data.tabText}
      color={data.color}
      data-select={select === index}
      onClick={() => {
        setSelect(index);
        setSubSelect(0);
      }}
    />
  ));

  return <TabView>{item}</TabView>;
}

function Content({ select, subSelect }) {
  const item = menuInfoData[select].content[subSelect].content.map((data) => (
    <span key={data}>{data}</span>
  ));
  return (
    <div>
      <span>{menuInfoData[select].content[subSelect].title}</span>
      {item}
    </div>
  );
}

function Index() {
  const [select, setSelect] = useState(0);
  const [subSelect, setSubSelect] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <Container>
      <FunctionView
        data-aos="fade-up"
        data-aos-offset="400"
        data-aos-easing="ease-out"
      >
        <Title select={select} />
        <TabItem
          select={select}
          setSelect={setSelect}
          setSubSelect={setSubSelect}
        />
        <ContentView>
          <Content select={select} subSelect={subSelect} />
          {select === 0 && <Test setSubSelect={setSubSelect} />}
          {select > 0 && select < 2 && (
            <img alt="description" src={LandingImage05} />
          )}
          {select > 1 && select < 3 && (
            <img alt="description" src={LandingImage06} />
          )}
          {select > 2 && <img alt="description" src={LandingImage07} />}
        </ContentView>
      </FunctionView>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  padding: 100px 0;
  background-color: #404040;
  width: 100%;
`;

const FunctionView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TitleView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;

  > span {
    font-size: 38px;
    font-weight: bold;
    color: #ffffff;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
    }
  }
`;

const TabView = styled.div`
  width: 62%;
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
  }
`;

const Tab = styled.input`
  width: 190px;
  height: 60px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${(props) => props.color};
  color: #ffffff;
  font-size: 17px;
  @media ${(props) => props.theme.mobile} {
    width: 25%;
    font-size: 0.7em;
    word-break: keep-all;
    white-space: pre-wrap;
  }

  &[data-select='true'] {
    background-color: #ffffff;
    color: #000000;
    font-weight: bold;

    &:focus {
      background-color: #ffffff;
      color: #000000;
      font-weight: bold;

      &:hover {
        background-color: #ffffff;
        color: #000000;
        opacity: 1;
        cursor: default;
      }
    }
  }

  &[type='button']:hover {
    background-color: ${(props) => props.color};
    opacity: 0.7;
  }
`;

const ContentView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 62%;
  height: 450px;
  padding: 0 70px;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: unset;
    padding: 5%;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media ${(props) => props.theme.mobile} {
      :not(:last-child) {
        margin-bottom: 30px;
      }
    }

    span {
      :first-child {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 30px;
        @media ${(props) => props.theme.mobile} {
          font-size: 1.3em;
        }
      }

      :not(:first-child) {
        font-size: 21px;
        @media ${(props) => props.theme.mobile} {
          font-size: 0.8em;
        }
      }
    }
  }

  > img {
    margin-top: 100px;
    width: 400px;
    max-height: 300px;
    @media ${(props) => props.theme.mobile} {
      width: 100%;
      height: 200px;
    }
  }
`;
