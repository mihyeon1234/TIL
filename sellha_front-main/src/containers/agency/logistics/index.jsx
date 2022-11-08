import React, { useEffect } from 'react';
// >>>>>>>>>>>>>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import styled from 'styled-components';
import logistics01 from 'assets/images/3pl_01.png';
import logistics02 from 'assets/images/3pl_02.png';
import logistics03 from 'assets/images/3pl_03.png';

import colosseumLogistics01 from 'assets/images/icon_3PL_01.png';
import colosseumLogistics02 from 'assets/images/icon_3PL_02.png';
import colosseumLogistics03 from 'assets/images/icon_3PL_03.png';
import colosseumLogistics04 from 'assets/images/icon_3PL_04.png';
import colosseumLogo from 'assets/icon/colosseum_logo.png';
import sellhaColosseumLogo from 'assets/icon/sellha_colosseum_logo.png';

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
        <BigText>다음 체크 리스트를 확인해보세요</BigText>
        <CheckList>
          <span className="checkTitle">CHECK LIST</span>
          <div className="line">
            <img src={logistics03} alt="3plIMG03" />
            <span>포장과 배송을 직접 하느라 시간이 부족한가요?</span>
          </div>
          <div className="line">
            <img src={logistics03} alt="3plIMG03" />
            <span>배송 관련 컴플레인 때문에 스트레스 받으시나요?</span>
          </div>
          <div className="line">
            <img src={logistics03} alt="3plIMG03" />
            <span>쌓아놓은 물건을 둘 곳이 없어 곤란하신가요?</span>
          </div>
          <div className="line">
            <img src={logistics03} alt="3plIMG03" />
            <span>매일 재고를 파악하느라 시간을 허비하고 계신가요?</span>
          </div>
        </CheckList>
        <BigText>여기에 하나라도 해당되시나요?</BigText>
        <BigText>그렇다면 끝까지 읽어주세요!</BigText>
        <div className="dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
        <BigText>지금까지 물류 때문에 골아프셨죠?</BigText>
        <BigText>이제 더 이상 고민할 필요 없어요</BigText>
        <br />
        <br />
        <BigText>
          1인·소규모 창업자를 위한
          <br />
          <span className="highlight">최적화된 물류 시스템</span>이 있으니까요
        </BigText>
        <img className="logic" src={logistics01} alt="logistics01" />
      </FirstSection>
      <SecondSection>
        <Pros>
          <span className="title">합리적인 비용</span>
          <span className="content">
            보관·사용한 만큼
            <br />
            비용 청구
          </span>
        </Pros>
        <Pros>
          <span className="title">다품종소량</span>
          <span className="content">
            다양한 제품군과
            <br />
            적은 보관도 가능
          </span>
        </Pros>
        <Pros>
          <span className="title">담당자 배정</span>
          <span className="content">
            모든 물류업무를
            <br />
            담당자가 일괄 처리
          </span>
        </Pros>
        <Pros>
          <span className="title">임가공</span>
          <span className="content">
            스티커, 세트포장 등<br />
            다양한 작업 가능
          </span>
        </Pros>
        <Pros>
          <span className="title">쇼핑몰 연동</span>
          <span className="content">
            쇼핑몰 API를 통한
            <br />
            주문수집 및 송장 처리
          </span>
        </Pros>
        <Pros>
          <span className="title">물량 제한없음</span>
          <span className="content">
            하루 1건 출고라도
            <br />
            서비스 제공
          </span>
        </Pros>
      </SecondSection>
      <ThirdSection>
        <BigText>진행과정은 이렇습니다</BigText>
        <ProcessContainer>
          <ProcessLine>
            <Process>
              <span className="title">상담 & 계약</span>
              <span className="content">
                상담 후 견적
                <br />및 계약 체결
              </span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">입고</span>
              <span className="content">
                입고 처리 및<br />
                입고현황 전달
              </span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">보관</span>
              <span className="content">
                SKU별 보관,
                <br />
                재고관리
              </span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">발주</span>
              <span className="content">출고 요청</span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">출고 작업</span>
              <span className="content">상품 검수, 포장</span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">배송</span>
              <span className="content">
                운송장 전달 및<br />
                택배사 이동
              </span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">CS 관리</span>
              <span className="content">
                교환/반품 등<br />
                고객 클레임 처리
              </span>
            </Process>
            <Arrow> </Arrow>
            <Process>
              <span className="title">정산</span>
              <span className="content">
                월 정산서 청구 및<br />
                세금계산서 발행
              </span>
            </Process>
          </ProcessLine>
        </ProcessContainer>
      </ThirdSection>
      <FourthSection>
        <BigText>이런 효과를 기대할 수 있어요</BigText>
        <Expectations>
          <Expectation>
            <div className="circle">
              <span>
                효율성
                <br />
                향상
              </span>
            </div>
            <div className="dotline"> </div>
            <div className="smallCircle"> </div>
            <span className="explaination">
              업무 분담을 통해 최소 비용으로 최대 효과 창출
            </span>
          </Expectation>
          <Expectation>
            <div className="circle">
              <span>
                전문성
                <br />
                확보
              </span>
            </div>
            <div className="dotline"> </div>
            <div className="smallCircle"> </div>
            <span className="explaination">
              전문인력 확보와 물류업무 축소로 핵심역량에 집중 가능
            </span>
          </Expectation>
          <Expectation>
            <div className="circle">
              <span>
                고객만족
                <br />
                향상
              </span>
            </div>
            <div className="dotline"> </div>
            <div className="smallCircle"> </div>
            <span className="explaination">
              체계적인 시스템으로 배송품질 향상을 통한 고객 만족도 재고
            </span>
          </Expectation>
        </Expectations>
      </FourthSection>
      <FifthSection>
        <BigText>물류센터 현황</BigText>
        <span>
          효율적인 물류서비스에 최적화된 입지조건과 상품별 전문 설비를 갖춘
          400평 규모의 물류센터를 운영합니다
        </span>
        <span>위치 : 부산광역시 남구 북항로 132 308호</span>
        <img src={logistics02} alt="logistics02" />
      </FifthSection>
      <SixthSection>
        <CollaborLogo src={sellhaColosseumLogo} alt="sellhaColosseumLogo" />
        <CollaborBanner>
          <BigText>
            2022. 01. 셀링하니 물류센터
            <br />
            (부산 기장군)
            <br />
            콜로세움 운영계약 체결!
          </BigText>
        </CollaborBanner>
        <Banner>
          <BigText>
            셀링하니 부산 물류센터는
            <br />
            콜로세움과의 협업을 통해
            <br />
            운영되고 있습니다.
          </BigText>
        </Banner>
        <ProcessWrapper>
          <CProcess>
            <ContentImg src={colosseumLogistics01} alt="colosseum01" />
            <SpanWrapper>
              <SubTitleText>한계없는</SubTitleText>
              <SubTitleText>물류서비스 범위</SubTitleText>
            </SpanWrapper>
            <ContentWrapper>
              <DescriptionText>
                상품 품목과 작업 범위에 제한 없는 <br /> 고객 맞춤 풀필먼트를
                제공해드립니다.
              </DescriptionText>
              <TagText>#합포장 무료 #드랍쉬핑 #역직구 #라스트마일 연계</TagText>
            </ContentWrapper>
          </CProcess>
          <CProcess>
            <ContentImg src={colosseumLogistics02} alt="colosseum02" />
            <SpanWrapper>
              <SubTitleText>쉽고 편한</SubTitleText>
              <SubTitleText>AI 풀필먼트 솔루션 COLO</SubTitleText>
            </SpanWrapper>
            <ContentWrapper>
              <DescriptionText>
                주문수집부터 출고업무까지 <br />
                쉽고 간편하게 처리합니다.
              </DescriptionText>
              <TagText>#쇼핑몰 주문수집 #실시간 재고관리 #AI상품 매핑</TagText>
            </ContentWrapper>
          </CProcess>
          <CProcess>
            <ContentImg src={colosseumLogistics03} alt="colosseum03" />
            <SpanWrapper>
              <SubTitleText>전국 상온, 냉장냉동</SubTitleText>
              <SubTitleText>물류센터 네트워크</SubTitleText>
            </SpanWrapper>
            <ContentWrapper>
              <DescriptionText>
                전국의 물류센터 네트워크를 통해 <br />
                가능한 서비스는 많아지고, 접근성은 높아집니다.
              </DescriptionText>
              <TagText>#전국 21개소 #상품별 특화센터 #수도권 냉장냉동</TagText>
            </ContentWrapper>
          </CProcess>
          <CProcess>
            <ContentImg src={colosseumLogistics04} alt="colosseum04" />
            <SpanWrapper>
              <SubTitleText>투명하고 합리적인</SubTitleText>
              <SubTitleText>요금제</SubTitleText>
            </SpanWrapper>
            <ContentWrapper>
              <DescriptionText>
                고객님의 부담을 최소화할 수 있도록 <br />
                요금제는 숨겨진 비용 없이 투명하게 공개됩니다.
              </DescriptionText>
              <TagText>#기본료 0원 #택배처리비 건당 최저 2,700원</TagText>
            </ContentWrapper>
          </CProcess>
        </ProcessWrapper>
      </SixthSection>
      <RequestButton
        type="button"
        value="상담 신청하기"
        onClick={() => {
          window.open('https://forms.gle/SVd41K8ThY2uM8U96');
        }}
      />
      <ColosseumSection>
        <ColosseumLogo src={colosseumLogo} alt="colosseumLogo" />
        <InfoBox>
          <LinkText
            href="https://colosseum.kr"
            target="_blank"
            rel="noreferrer"
          >
            🌐 홈페이지 바로가기
          </LinkText>
        </InfoBox>
        <InfoBox>
          <LinkText
            href="https://blog.naver.com/colosseumkr"
            target="_blank"
            rel="noreferrer"
          >
            📗 블로그 바로가기
          </LinkText>
        </InfoBox>
        <InfoBox>
          <span>🎬 소개 영상</span>
          <IframeWrapper>
            <YouTubeIframe
              width="800"
              height="472"
              src="https://www.youtube.com/embed/HxYuejT0J0g"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </IframeWrapper>
        </InfoBox>
      </ColosseumSection>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;
`;

const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0 1em;
  }

  .dots {
    display: flex;
    flex-direction: column;
    margin: 2em 0 4em;

    @media ${(props) => props.theme.mobile} {
      margin: 1em 0 2em;
    }

    .dot {
      font-size: 2.5em;
      line-height: 0.75em;
      text-align: center;
    }
  }

  .logic {
    margin: 3em 0;
    width: 450px;

    @media ${(props) => props.theme.mobile} {
      width: 300px;
    }
  }
`;

const SecondSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 3em;

  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
    margin-top: 1em;
  }
`;

const ThirdSection = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 197, 97, 0.1);
  padding: 3em;
  margin-top: 3em;
  @media ${(props) => props.theme.mobile} {
    margin-top: 1em;
    padding: 1em;
  }
`;

const FourthSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;

const FifthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0 1em;
  }
  span {
    font-size: 1.45em;
    max-width: 500px;
    text-align: center;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      max-width: 260px;
    }
    &:nth-child(2) {
      margin: 1em 0;
    }

    &:nth-child(3) {
      font-weight: bold;
    }
  }

  img {
    width: 600px;
    margin: 2.5em 0 5em;
    @media ${(props) => props.theme.mobile} {
      width: 300px;
      margin: 2.5em 0 4em;
    }
  }
`;

const SixthSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CollaborLogo = styled.img`
  width: 60%;
  margin: 10px;
`;

const Banner = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const ProcessWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin-top: 40px;
  @media ${(props) => props.theme.mobile} {
    padding: 0 auto;
  }
`;

const CProcess = styled.div`
  display: flex;
  flex-direction: column;
  width: 24%;

  @media ${(props) => props.theme.mobile} {
    align-items: center;
    width: 100%;
    padding: 1rem;
  }
`;

const ContentImg = styled.img`
  width: 200px;
  @media ${(props) => props.theme.mobile} {
    width: 200px;
    padding: 0 auto;
  }
`;

const Pros = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 2em;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    padding: 2em 1em;
  }

  &:nth-child(2n-1) {
    background-color: #fff4df;
  }

  .title {
    font-size: 1.65em;
    font-weight: bold;
    margin: 0.3em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.3em;
    }
  }
  .content {
    font-size: 1.2em;
    margin: 0.5em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
    }
  }
`;

const BigText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  margin: 0.3em 0;
  line-height: 1.8em;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.3em;
  }

  .highlight {
    background-color: #ffe4b4;
  }
  a {
    margin-left: 10px;
    color: ${(props) => props.theme.colors.oceanBlue};
    text-decoration: underline;
  }
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #fcb436;
  padding: 1.5em 3em;
  position: relative;
  margin: 3em 0;

  @media ${(props) => props.theme.mobile} {
    padding: 1em;
  }

  .checkTitle {
    position: absolute;
    top: -15px;
    left: 30px;
    font-size: 1.35em;
    background-color: white;
    padding: 0 0.5em;
    color: #fcb436;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.15em;
      top: -13px;
      left: 20px;
    }
  }

  .line {
    display: flex;
    flex-direction: row;
    margin: 0.25em 0;
    font-size: 1.5em;
    align-items: center;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
    }

    img {
      width: 18px;
      height: 100%;
      margin-right: 20px;
      @media ${(props) => props.theme.mobile} {
        width: 15px;
        margin-right: 15px;
      }
    }
  }
`;

const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5em 5em;
  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;

const ProcessLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr;
  margin: 1.5em 0;

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: 1fr 0.3fr 1fr 0.3fr;
  }
`;

const Process = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;

  @media ${(props) => props.theme.mobile} {
    margin: 1em 0.5em;
  }

  .title {
    font-weight: bold;
    font-size: 1.5em;
    margin: 0.5em 0;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
    }
  }

  .content {
    font-size: 1.2em;
    text-align: center;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
    }
  }
`;

const Arrow = styled.div`
  width: 0px;
  height: 0px;
  border-top: 10px solid transparent;
  border-left: 10px solid #fcb436;
  border-right: 10px solid none;
  border-bottom: 10px solid transparent;
  margin: auto;
`;

const Expectations = styled.div``;

const Expectation = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 1.5em 0;

  .circle {
    border: 2px solid #fcb436;
    border-radius: 100%;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.5em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      width: 80px;
      height: 80px;
    }
  }

  .dotline {
    border: 1px dotted #fcb436;
    width: 80px;
    margin-left: 1em;

    @media ${(props) => props.theme.mobile} {
      margin-left: 0.5em;
      width: 40px;
    }
  }

  .smallCircle {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #fcb436;
  }

  .explaination {
    font-size: 1.4em;
    text-align: left;
    margin-left: 1.5em;
    width: 300px;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1em;
      margin-left: 1em;
      width: 110px;
    }
  }
`;

const RequestButton = styled.input`
  margin: 5rem 0;
  font-weight: 600;
  border-radius: 50px;
  padding: 0.7em 2em;
  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    font-size: 20px;
  }
`;

const ColosseumSection = styled.div`
  width: 60%;
`;

const IframeWrapper = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 50%;
`;

const YouTubeIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CollaborBanner = styled.div`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const ColosseumLogo = styled.img`
  width: 30%;
  margin-bottom: 10px;

  @media ${(props) => props.theme.mobile} {
    width: 70%;
  }
`;

const InfoBox = styled.div`
  font-size: 1rem;

  @media ${(props) => props.theme.mobile} {
    font-size: 0.85rem;
  }
`;

const LinkText = styled.a`
  :hover {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
  }
`;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
    flex-direction: row;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  width: 92%;

  @media ${(props) => props.theme.mobile} {
    text-align: center;
  }
`;

const SubTitleText = styled.span`
  font-weight: 500;
  font-size: 1rem;

  @media ${(props) => props.theme.mobile} {
    margin-right: 5px;
  }
`;

const DescriptionText = styled.span`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.8rem;
  font-weight: 300;
`;

const TagText = styled.span`
  color: ${(props) => props.theme.colors.oceanBlue};
  font-size: 0.7rem;
  font-weight: 300;
`;
