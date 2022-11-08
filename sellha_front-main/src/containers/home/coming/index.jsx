import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const hoverText = 'coming soon';
const serviceText = [
  [
    { text: '상품 소싱', type: 'service', link: 'sourcing' },
    { text: '상세 페이지', type: 'service', link: 'fullpage' },
    { text: 'CS 관리', type: 'service', link: 'cs' },
    { text: '물류 및 배송', type: 'service', link: 'logistics' },
  ],
  [
    { text: '마케팅', type: 'coming' },
    { text: '세무, 통관', type: 'coming' },
    { text: '노무', type: 'coming' },
  ],
  [
    { text: '법정분쟁', type: 'coming' },
    { text: '지적재산권', type: 'coming' },
    { text: '브랜드 개발', type: 'coming' },
    { text: '촬영 대행', type: 'coming' },
  ],
];

function ServiceItem() {
  return serviceText.map((data) => (
    <div key={data[0].text}>
      {data.map((item) => (
        <ServiceSquare
          key={item.text}
          data-type={item.type}
          onClick={() => {
            if (item.type === 'service') window.location.href = `/${item.link}`;
          }}
          onMouseEnter={(e) => {
            if (item.type === 'coming') {
              e.target.innerText = hoverText;
            }
          }}
          onMouseLeave={(e) => {
            if (item.type === 'coming') {
              e.target.innerText = item.text;
            }
          }}
        >
          {item.text}
        </ServiceSquare>
      ))}
    </div>
  ));
}

function Index() {
  useEffect(() => {
    AOS.init({ duration: 4000 });
    ServiceItem();
  }, []);
  return (
    <Container>
      <Content
        data-aos="fade-up"
        data-aos-offset="300"
        data-aos-easing="ease-out"
      >
        <TitleView>
          <span>혼자 다 할 필요 없습니다.</span>
          <span>셀하에 맡기세요.</span>
        </TitleView>
        <ContentView>
          <ServiceItem />
        </ContentView>
      </Content>
    </Container>
  );
}

export default Index;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f2df;
`;

const Container = styled(CenterColumn)`
  width: 100%;
  padding: 100px 0;
`;

const Content = styled.div`
  > span {
    color: #b4b4b4;
    background-color: #f6eed9;
    font-size: 15px;
    font-weight: bold;
  }
`;

const TitleView = styled(CenterColumn)`
  span {
    font-size: 36px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.8em;
    }
  }
`;

const ContentView = styled(CenterColumn)`
  margin-top: 80px;
  div {
    display: flex;
    flex-direction: row;

    :not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

const ServiceSquare = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 50px;
  font-size: 20px;
  border-radius: 50px;
  background-color: #f6eed9;
  color: #858585;

  @media ${(props) => props.theme.mobile} {
    width: 70px;
    height: 30px;
    font-size: 0.7em;
  }

  :not(:last-child) {
    margin-right: 70px;
    @media ${(props) => props.theme.mobile} {
      margin-right: 10px;
    }
  }

  &:hover {
    cursor: pointer;
    color: #ffffff;
  }

  &[data-type='coming']:hover {
    background-color: #787562;
    cursor: default;
  }

  &[data-type='service'] {
    background: linear-gradient(
      to right,
      rgba(153, 112, 0, 0.2),
      rgba(248, 239, 222)
    );
    color: #000000;
  }

  &[data-type='service']:hover {
    background: linear-gradient(
      to right,
      ${(props) => props.color},
      ${(props) => props.color}
    );
    color: #ffffff;
  }
`;
