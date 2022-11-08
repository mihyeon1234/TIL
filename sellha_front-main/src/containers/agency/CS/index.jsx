import React, { useEffect } from 'react';
// >>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
import styled from 'styled-components';
import cs01 from 'assets/images/cs_01.png';
import cs02 from 'assets/images/cs_02.png';
import cs03 from 'assets/images/cs_03.png';
import cs04 from 'assets/images/cs_04.png';
import ReactTooltip from 'react-tooltip';

function Index() {
  useEffect(() => {
    document.title = `셀링하니`;
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  }, []);

  return (
    <Container>
      <FirstSection>
        <span className="first01">업무 중 맥이 끊기는 각종 문의</span>
        <span className="first02">수시로 확인해야 하는 다양한 인입 채널</span>
        <span className="first03">반복적이고 단순한 업무에 에너지 분산 등</span>
        <span className="first04">.</span>
        <span className="first04">.</span>
        <span className="first04">.</span>
        <span className="first05">셀러님들!</span>
        <span className="first06">
          CS는 전문가에게 맡기고
          <br />
          <span className="stress">핵심 업무</span>에 집중하세요
        </span>
        <div className="first07"> </div>
        <span className="first08">
          체계적인 전문 상담으로
          <br />
          고객 응대 걱정을 덜어드립니다
        </span>
      </FirstSection>
      <SecondSection>
        <ServicePoint>
          <div className="line"> </div>
          <span>SERVICE POINT 1</span>
          <div className="line"> </div>
        </ServicePoint>
        <BigTitle>이런 분께 추천합니다</BigTitle>
        <RecommandCase>
          <Case>
            <span>01</span>
            <span>1인 기업이라 도움이 필요한 분</span>
          </Case>
        </RecommandCase>
        <RecommandCase>
          <Case>
            <span>02</span>
            <span>CS 처리가 원활하지 못한 분</span>
          </Case>
        </RecommandCase>
        <RecommandCase>
          <Case>
            <span>03</span>
            <span>인원충원이 필요한 분</span>
          </Case>
        </RecommandCase>
        <RecommandCase>
          <Case>
            <span>04</span>
            <span>프로세스가 잡혀있지 않은 분</span>
          </Case>
        </RecommandCase>
        <RecommandCase>
          <Case>
            <span>05</span>
            <span>특정 기간 특정 시간에만 필요한 분</span>
          </Case>
        </RecommandCase>
      </SecondSection>
      <ThirdSection>
        <ServicePoint>
          <div className="line"> </div>
          <span>SERVICE POINT 2</span>
          <div className="line"> </div>
        </ServicePoint>
        <BigTitle>기대 효과</BigTitle>
        <Expectations>
          <Expectation style={{ gridArea: 'a' }}>
            <span className="title">유연한 운용</span>
            <span className="content">
              전문인력을 필요에
              <br />
              따라 운용 가능
            </span>
          </Expectation>
          <Expectation style={{ gridArea: 'b' }}>
            <span className="title">체계적인 응대</span>
            <span className="content">
              오랜 시간 쌓아온 CS
              <br />
              노하우와 체계를 이용
            </span>
          </Expectation>
          <Expectation style={{ gridArea: 'c' }}>
            <span className="title">빠른 대응</span>
            <span className="content">
              상담사의 상시 대기로
              <br />
              신속한 대응 가능
            </span>
          </Expectation>
          <Expectation style={{ gridArea: 'd' }}>
            <span className="title">효율성 증대</span>
            <span className="content">
              전문 상담원을 통한
              <br />
              서비스 품질 수준 보장
            </span>
          </Expectation>
        </Expectations>
      </ThirdSection>
      <FourthSection>
        <ServicePoint>
          <div className="line"> </div>
          <span>SERVICE POINT 3</span>
          <div className="line"> </div>
        </ServicePoint>
        <BigTitle>업무 범위</BigTitle>
        <Ranges>
          <Range>
            <img src={cs01} alt="csIMG01" />
            <span>
              고객센터로 인입된 인바운드
              <br />
              통화 요청하는 아웃바운드
              <br />
              품절·반품·입고 아웃콜
              <br />
              이외 기타 전화 업무
            </span>
          </Range>
          <Range>
            <img src={cs02} alt="csIMG02" />
            <span>
              쇼핑몰 게시판 문의
              <br />
              매크로 or 수기 게시판 응대
              <br />
              문자 문의
              <br />
              교환 및 반품 접수
            </span>
          </Range>
          <Range>
            <img src={cs03} alt="csIMG03" />
            <span>
              카카오톡 판매자 채널
              <br />
              네이버 톡톡문의
              <br />
              실시간 응대로 상담 진행
            </span>
          </Range>
        </Ranges>
      </FourthSection>
      <FifthSection>
        <ServicePoint>
          <div className="line"> </div>
          <span>SERVICE POINT 4</span>
          <div className="line"> </div>
        </ServicePoint>
        <BigTitle>업무 절차</BigTitle>
        <img src={cs04} alt="csIMG04" />
        <div className="tri light"> </div>
        <div className="tri medium"> </div>
        <div className="tri"> </div>
        <Process>
          <span>01</span>
          <span>콜 인입 시 상담원 고객정보 확인</span>
        </Process>
        <div className="tri"> </div>
        <Process>
          <span>02</span>
          <span>고객 주문 정보 확인</span>
        </Process>
        <div className="tri"> </div>
        <Process>
          <span>03</span>
          <span>쇼핑몰의 CS 정책에 따라 신속 정확한 응대</span>
        </Process>
        <div className="tri"> </div>
        <Process>
          <span>04</span>
          <span>요청사항 처리 및 상담 이력 작성</span>
        </Process>
        <div className="tri"> </div>
        <Process>
          <span>05</span>
          <span>상담내역 데이터 제공</span>
        </Process>
      </FifthSection>
      <SixthSection>
        <span>
          내 상황에 맞는 상세한
          <br />
          견적을 알고싶다면?
        </span>
      </SixthSection>
      <RequestButton
        type="button"
        value="문의하러 가기"
        // onClick={() => {
        //   window.open('https://forms.gle/mGeijzFL9KccAbRJ7');
        // }}
        data-tip
        data-for="tooltip-service"
      />
      <ReactTooltip
        id="tooltip-service"
        className="tooltip-service"
        place="top"
        effect="solid"
        backgroundColor="lightgray"
        textColor="#000000"
      >
        🐝 서비스 준비 중입니다
      </ReactTooltip>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 60%;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
    }
  }
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;

  @media ${(props) => props.theme.mobile} {
    margin-top: 2em;
  }

  .first01 {
    color: #c7c7c7;
    font-weight: bold;
    font-size: 1.45em;
    line-height: 1.8em;
    @media ${(props) => props.theme.mobile} {
      font-size: 0.95em;
    }
  }
  .first02 {
    color: #b1b1b1;
    font-weight: bold;
    font-size: 1.6em;
    line-height: 1.65em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1em;
    }
  }
  .first03 {
    color: #828282;
    font-weight: bold;
    font-size: 1.8em;
    margin-bottom: 0.5em;
    line-height: 1.7em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
    }
  }
  .first04 {
    color: #b1b1b1;
    font-weight: bold;
    font-size: 2em;
    line-height: 1em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.5em;
    }
  }
  .first05 {
    margin-top: 0.8em;
    color: #a5a5a5;
    font-size: 2.75em;
    line-height: 1.5em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.45em;
      line-height: 1.65em;
    }
  }
  .first06 {
    color: #a0a0a0;
    font-weight: bold;
    font-size: 3em;
    line-height: 1.45em;
    text-align: center;
    @media ${(props) => props.theme.mobile} {
      line-height: 1.5em;
      font-size: 1.6em;
    }
  }

  .stress {
    color: #5c5c5c;
  }
  .first07 {
    width: 50%;
    border: 1px solid #cccccc;
    margin: 3.5em 0;
    @media ${(props) => props.theme.mobile} {
      width: 50%;
      margin: 2.5em 0;
    }
  }
  .first08 {
    text-align: center;
    color: #a5a5a5;
    font-size: 1.85em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      line-height: 1.75em;
    }
  }
`;

const SecondSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }
`;

const ThirdSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }
`;

const FourthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }
`;

const FifthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5em;

  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
  }

  img {
    width: 650px;
    margin: -3.5em 0 -3em;
    @media ${(props) => props.theme.mobile} {
      width: 300px;
      margin: -1em 0 0.5em;
    }
  }

  .tri {
    width: 0px;
    height: 0px;
    border-top: 18px solid #828282;
    border-bottom: 18px solid none;
    border-right: 18px solid transparent;
    border-left: 18px solid transparent;
    margin: 0.85em 0;
    @media ${(props) => props.theme.mobile} {
      border-top: 12px solid #828282;
      border-bottom: 12px solid none;
      border-right: 12px solid transparent;
      border-left: 12px solid transparent;
      margin: 0.65em 0;
    }
  }

  .tri.light {
    border-top: 12px solid #e1e1e1;
  }

  .tri.medium {
    border-top: 12px solid #b9b9b9;
  }
`;

const SixthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
  font-size: 2.8em;
  font-weight: bold;
  color: #5c5c5c;
  line-height: 1.5em;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.65em;
  }
`;

const ServicePoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2em;
  color: #cccccc;
  margin-top: 5em;
  line-height: 1.85em;

  @media ${(props) => props.theme.mobile} {
    font-size: 1em;
  }

  .line {
    width: 190px;
    border: 1px solid #dedede;
    @media ${(props) => props.theme.mobile} {
      width: 150px;
    }
  }
`;

const BigTitle = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  color: #5c5c5c;
  margin: 0.85em 0 1em;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.65em;
  }
`;

const RecommandCase = styled.div`
  padding: 1.5em 3.5em;
  border-radius: 50em;
  margin: 0.75em 0;
  width: 100%;

  &:nth-child(2n-1) {
    background-color: #f6f6f6;
  }
  &:nth-child(2n) {
    border: 1px solid rgba(217, 217, 217, 0.6);
  }

  @media ${(props) => props.theme.mobile} {
    padding: 1em;
  }
`;

const Case = styled.div`
  font-size: 1.65em;
  color: #707070;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.1em;
  }

  span:first-child {
    margin-right: 20px;
    font-weight: bold;
    @media ${(props) => props.theme.mobile} {
      margin-right: 10px;
    }
  }
`;

const Expectations = styled.div`
  display: grid;
  grid-template-areas:
    'a b'
    'd c';

  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const Expectation = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 4.5em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 145px;
    justify-content: center;
  }

  .title {
    color: #707070;
    font-weight: bold;
    font-size: 1.8em;
    margin-bottom: 0.5em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.3em;
    }
  }

  .content {
    color: #b1b1b1;
    font-size: 1.35em;
    line-height: 1.5em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.15em;
    }
  }

  :nth-child(2n-1) {
    background-color: #f6f6f6;
  }
`;

const Ranges = styled.div`
  margin-top: -3em;
`;

const Range = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    margin: 0.5em 0;
  }

  :nth-child(2) {
    flex-direction: row-reverse;

    @media ${(props) => props.theme.mobile} {
      flex-direction: column;
    }
  }

  img {
    width: 160px;
    margin: 1em;
    @media ${(props) => props.theme.mobile} {
      width: 85px;
      margin: 0.5em;

      &:first-child {
        margin-top: 2.5em;
      }
    }
  }

  span {
    margin: 2em;
    font-size: 1.5em;
    color: #707070;

    @media ${(props) => props.theme.mobile} {
      margin: 1em;
      font-size: 1.1em;
      text-align: center;
    }
  }
`;

const Process = styled.div`
  background-color: #f6f6f6;
  width: 600px;
  height: 80px;
  display: flex;
  align-items: center;
  margin: 0.5em 0;
  font-weight: bold;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 60px;
    justify-content: center;
  }

  span:nth-child(1) {
    font-size: 2em;
    color: #cfcfcf;
    margin: 0 1.4em;
    @media ${(props) => props.theme.mobile} {
      /* font-size: 1.1em; */
      /* margin: 0 0.8em; */
      display: none;
    }
  }
  span:nth-child(2) {
    color: #707070;
    display: flex;
    font-size: 1.6em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
    }
  }
`;

const RequestButton = styled.input`
  margin: 2em 0;
  font-weight: bolder;
  border-radius: 50px;
  padding: 0.7em 2em;
  background-color: #fcb436;
  color: white;
  cursor: pointer;
  font-size: 1.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
  }
`;
