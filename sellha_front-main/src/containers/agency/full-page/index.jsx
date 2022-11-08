import React, { useEffect } from 'react';
// >>>>>>>>>>>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import styled from 'styled-components';
import fullpageIMG01 from 'assets/images/full_01.png';
import fullpageIMG02 from 'assets/images/full_02.png';
import fullpageIMG03 from 'assets/images/full_03.png';
import fullpageIMG04 from 'assets/images/full_04.png';
import fullpageIMG05 from 'assets/images/full_05.png';
import ReactTooltip from 'react-tooltip';

function Index() {
  useEffect(() => {
    document.title = `셀링하니`;
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  }, []);
  return (
    <Container>
      <FirstSection>
        <div className="smallTitle">연매출 50억</div>
        <div className="largeTitle">
          실적으로 검증된 <br />
          온라인 커머스 업체가
          <br />
          <span>직접</span> 만드는 디자인
        </div>
        <Boldtext>
          온라인 커머스 업계에서 다년간의
          <br />
          경력을 가진 전문가들이 만듭니다
        </Boldtext>
        <br />
        <Regulartext>
          상세페이지는 매출과
          <br />
          직결되는 부분으로 무엇보다
          <br />
          제작자의 경험과 능력이 중요하죠
        </Regulartext>
        <br />
        <Regulartext>
          마케터, 기획자, 그리고 디자이너로
          <br />
          구성된 <b>전문가 집단</b>이 제작합니다
        </Regulartext>
      </FirstSection>
      <SecondSection>
        <Boldtext>
          구매전환율을 높일 수 있게
          <br />
          치밀하고 전략적으로 제작합니다
        </Boldtext>
        <span>
          <img src={fullpageIMG01} alt="fullpage01" />
        </span>
      </SecondSection>
      <ThirdSection>
        <Boldtext>처음이라 의뢰조차 낯설으신가요?</Boldtext>
        <Regulartext>
          어떤 자료와 내용을 준비해야할 지 몰라
          <br />
          어려움을 겪는 경우가 종종 있습니다.
          <br />
          그렇기에 <b>기획서 양식</b>을 제공해드립니다.
          <br />
          양식에 맞춰 입력만 하세요. 정리는 저희가 합니다.
        </Regulartext>
        <Boldtext>부담스러운 가격에 결제하기가 선뜻 망설여진다면</Boldtext>
        <Regulartext>
          합리적인 가격에 기본 서비스를 이용해보세요.
          <br />
          퀄리티가 의심스럽다고요?
          <br />
          <b>가격이 아쉽지 않을 퀄리티</b>를 약속드리니,
          <br />
          믿고 맡겨주세요.
        </Regulartext>
      </ThirdSection>
      <FourthSection>
        <BigTitle>상담 전 준비사항</BigTitle>
        <div className="container">
          <div>
            <img src={fullpageIMG02} alt="fullpage02" />
            <div className="boldText">제품정보</div>
            <Regulartext className="gray">
              상세페이지에
              <br />
              들어갈 제품정보
            </Regulartext>
          </div>
          <div>
            <img src={fullpageIMG03} alt="fullpage03" />
            <div className="boldText">레퍼런스 자료</div>
            <Regulartext className="gray">
              디자인 혹은 컨셉을
              <br />
              참고할 이미지나 링크
            </Regulartext>
          </div>
        </div>
      </FourthSection>
      <FifthSection>
        <BigTitle>절차는 이렇습니다</BigTitle>
        <div className="processContainer">
          <div className="process">
            <div className="process_number">
              <span>01</span>
            </div>
            <div className="process_text">
              <span className="boldText">문의 전 자료 준비</span>
              <span>제품 정보, 디자인 레퍼런스 등을 준비해주세요</span>
            </div>
          </div>
          <div className="process">
            <div className="process_number">
              <span>02</span>
            </div>
            <div className="process_text">
              <span className="boldText">상담 및 견적</span>
              <span>
                1:1 상담을 통해 제품과 컨셉 파악 후 견적을 안내드립니다
              </span>
            </div>
          </div>
          <div className="process">
            <div className="process_number">
              <span>03</span>
            </div>
            <div className="process_text">
              <span className="boldText">시안 전달</span>
              <span>자료를 참고하여 디자인 작업 후 시안을 전달합니다</span>
            </div>
          </div>
          <div className="process">
            <div className="process_number">
              <span>04</span>
            </div>
            <div className="process_text">
              <span className="boldText">수정 작업</span>
              <span>
                틀에 벗어나지 않는 간단한 수정은 3회 무료, 그 외 추가요금
              </span>
            </div>
          </div>
          <div className="process">
            <div className="process_number">
              <span>05</span>
            </div>
            <div className="process_text">
              <span className="boldText">최종 작업물 전달 및 구매확정</span>
              <span>완료된 작업물을 전달하고 구매확정을 합니다</span>
            </div>
          </div>
        </div>
      </FifthSection>
      <SixthSection>
        <BigTitle>착한 가격에 만듭니다</BigTitle>
        <div className="basic">
          <div className="icon">
            <span>기본형</span>
          </div>
          <div className="basicA">
            <div className="basicline">
              <div className="title">A. 디자인</div>
              <div className="condition">세로 5000 px 이하</div>
              <div className="price">110,000원 ~</div>
            </div>
            <div className="basicline">
              <div className="condition left">세로 5000 ~ 10,000 px</div>
              <div className="price">150,000원 ~</div>
            </div>
            <div className="basicline">
              <div className="condition left">세로 10,000 px 이상</div>
              <div className="price">200,000원</div>
            </div>
          </div>
          <div className="basicB">
            <div className="title">B. 기획 + 디자인</div>
            <div className="price">A + 100,000원</div>
          </div>
          <div className="basicC">
            <div className="title">C. 촬영 + 기획 + 디자인</div>
            <div className="price">가격협의</div>
          </div>
        </div>
        <div className="deluxe">
          <div className="icon">
            <span>고급형</span>
          </div>
          <div className="deluxeD">
            <div className="title">
              D. 제품 심층 분석 + 마케팅 + 카피라이팅 + 촬영 + 기획 + 디자인
            </div>
            <div className="price">가격협의</div>
          </div>
        </div>
      </SixthSection>
      <SeventhSection>
        <BigTitle>저작권도 안심하세요!</BigTitle>
        <br />
        <span>
          셀하는 저작권에 문제없는 <br />
          폰트와 이미지만을 사용합니다
        </span>
      </SeventhSection>
      <EightthSection>
        <BigTitle>자주 묻는 질문</BigTitle>
        <BallonView>
          <Balloon>
            <BalloonText data-type="left">
              기획서는 어떻게 준비하나요?
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="right">
              제공되는 기획서 양식이 있어 그에 맞춰 입력하면 됩니다. 만약 따로
              준비해둔 기획서가 있다면 저희가 제공하는 양식 필요없이 바로
              sellhabot@gmail.com 로 발송해주세요.
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="left">
              디자인 작업기간은 얼마나 걸리나요?
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="right">
              디자인 작업기간은 보통 5~7일 정도 소요되며, 조금씩 변동이 있을 수
              있습니다.
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="left">
              디자인 수정시 추가비용이 있나요?
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="right">
              3회까지 무료로 수정가능합니다. 단, 초기 신청서 내용에서 추가 혹은
              변경시 추가비용이 발생합니다. 또한 틀이 변경되는 경우 재구매로
              간주됩니다.
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="left">
              원본을 받고 싶은데 어떻게 하죠?
            </BalloonText>
          </Balloon>
          <Balloon>
            <BalloonText data-type="right">
              제작한 비용의 30% 추가금을 결제하시면 구매됩니다.
            </BalloonText>
          </Balloon>
        </BallonView>
      </EightthSection>
      <NinethSection>
        <WarningSign>
          <img src={fullpageIMG04} alt="image4" />
          <div>주문 전 반드시 확인해주세요</div>
        </WarningSign>
        <Notice>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>작업은 결제완료 후 익일부터 진행해드립니다.</span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>
              만일의 경우를 대비해 메시지/메일 상담으로 커뮤니케이션을 진행하고
              있습니다.
            </span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>초안에 없는 추가사항은 추가 결제 이후 진행됩니다.</span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>
              작업물은 작업 요청시의 용도 이외의 사용이 금지되어 있습니다.
            </span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>주문하신 작업이 진행중일 경우에는 취소가 불가능합니다.</span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>소유권은 의뢰인에게 있으며 저작권은 셀하에 있습니다.</span>
          </div>
        </Notice>
        <WarningSign>
          <img src={fullpageIMG04} alt="image4" />
          <div>제작요청 전 반드시 체크해주세요</div>
        </WarningSign>
        <Notice>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>저작권을 소유하고 있는 이미지를 준비해주세요.</span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>네이버, 구글 등 퍼온 이미지는 저작권에 위반됩니다.</span>
          </div>
          <div className="line">
            <img src={fullpageIMG05} alt="image5" />
            <span>제작에 들어갈 이미지는 최대한 큰 사이즈로 준비해주세요.</span>
          </div>
        </Notice>
      </NinethSection>
      <TenthSetion>
        {/* <BigTitle>상세페이지 제작 관련 문의</BigTitle> */}
        {/* <div className="inquiry">
          <div className="email">
            <div className="inquiryTitle">이메일 문의</div>
            <div className="inquiryContent">sellhabot@gmail.com</div>
          </div>
        </div> */}
        {/* <Boldtext>
          아래의 기획서 양식을 다운로드하고
          <br />
          입력한 다음 이메일로 보내주세요
        </Boldtext> */}
      </TenthSetion>
      <RequestButton
        type="button"
        value="양식 다운로드"
        // onClick={() => {
        //   window.open(
        //     'https://drive.google.com/drive/folders/1P7fEhVbocPxG_PDZE7SqZcMDxmErJ8Hx?usp=sharing',
        //   );
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-left: 6em;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    padding: 0;
  }
`;

const FirstSection = styled.div`
  @media ${(props) => props.theme.mobile} {
    padding: 0 1em;
  }
  .smallTitle {
    font-size: 1.85em;
    font-weight: bold;
    color: #707070;
    line-height: 1.5em;
    margin-left: 5px;
    margin-top: 1em;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
      line-height: 1.75em;
    }
  }

  .largeTitle {
    font-size: 3.2em;
    font-weight: 900;
    line-height: 1.3em;
    @media ${(props) => props.theme.mobile} {
      font-size: 2em;
      line-height: 1.35em;
    }

    span {
      color: #ffbd4a;
    }
  }
`;

const SecondSection = styled.div`
  margin-top: 2em;
  @media ${(props) => props.theme.mobile} {
    padding: 0 1em;
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 550px;
    margin: 3em 0;

    @media ${(props) => props.theme.mobile} {
      width: 280px;
    }
  }
`;

const ThirdSection = styled.div`
  @media ${(props) => props.theme.mobile} {
    padding: 0 1em;
  }
`;

const FourthSection = styled.div`
  margin-top: 4em;
  padding: 3em;
  background-color: rgba(255, 241, 213, 0.76);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    padding: 1.5em;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
    width: 400px;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
      padding: 1em;
      margin-top: 0.85em;
      width: 300px;
    }

    img {
      width: 150px;

      @media ${(props) => props.theme.mobile} {
        width: 90px;
      }
    }

    .gray {
      color: #858585;
      font-size: 1.25em;

      @media ${(props) => props.theme.mobile} {
        font-size: 1em;
      }
    }
  }

  .boldText {
    font-size: 1.75em;
    font-weight: bold;
    margin: 1em 0 0.35em;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.2em;
    }
  }
`;
const FifthSection = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    padding: 0 1em;
    margin-top: 2em;
  }

  .processContainer {
    width: 550px;
    margin-top: 1em;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
      padding: 0 0.5em;
      margin-top: 0.75em;
    }
  }
  .process {
    display: flex;
    align-items: center;
    margin: 1.5em 0;
  }

  .process_number {
    width: 3.5em;
    height: 3.5em;
    border-radius: 0.35em;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.5em;

    @media ${(props) => props.theme.mobile} {
      padding: 0.3em 0.5em;
    }

    span {
      font-weight: bold;
      font-size: 1.5em;

      @media ${(props) => props.theme.mobile} {
        font-size: 1.2em;
      }
    }
  }

  .process_text {
    display: flex;
    flex-direction: column;

    span {
      font-size: 1.2em;
      line-height: 1.5em;
      color: #858585;

      @media ${(props) => props.theme.mobile} {
        font-size: 1em;
      }
    }

    .boldText {
      font-size: 1.8em;
      font-weight: bold;
      color: black;

      @media ${(props) => props.theme.mobile} {
        font-size: 1.2em;
      }
    }
  }
`;

const SixthSection = styled.div`
  padding: 3em 0;
  margin-top: 3.5em;
  display: flex;
  flex-direction: column;
  background-color: #fff1d5;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 2.5em;
  }

  .basic {
    display: flex;
    flex-direction: column;
    width: 520px;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
    }
    .icon {
      width: 3.5em;
      border-radius: 1em;
      text-align: center;
      background-color: #fcb436;
      color: white;
      font-size: 1.5em;
      margin: 1.5em 0 0.5em;
      @media ${(props) => props.theme.mobile} {
        font-size: 1.15em;
        margin-left: 1em;
      }
    }

    .basicA {
      background-color: white;
      padding: 1em 2em;

      @media ${(props) => props.theme.mobile} {
        padding: 1em;
        width: 90%;
        margin: 0 auto;
      }

      .basicline {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media ${(props) => props.theme.mobile} {
          flex-direction: column;
          align-items: flex-start;
        }

        .title {
          font-weight: bold;
          font-size: 1.35em;
          @media ${(props) => props.theme.mobile} {
            font-size: 1.3em;
          }
        }

        .condition {
          font-size: 1.25em;
          color: #707070;
          display: flex;
        }

        .left {
          margin-left: 150px;
          @media ${(props) => props.theme.mobile} {
            margin: 0;
          }
        }

        .price {
          font-size: 1.35em;
          font-weight: bold;
          color: #ffbd4a;
        }
      }
    }

    .basicB,
    .basicC {
      margin-top: 1.5em;
      display: flex;
      background-color: white;
      padding: 1em 2em;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media ${(props) => props.theme.mobile} {
        padding: 1em;
        width: 90%;
        margin: 0 auto;
        margin-top: 1.5em;
        flex-direction: column;
        align-items: flex-start;
      }

      .title {
        font-weight: bold;
        font-size: 1.35em;
        margin-right: 2em;
      }

      .condition {
        font-size: 1.25em;
        color: #707070;
        margin-right: 2em;
      }

      .price {
        font-size: 1.35em;
        font-weight: bold;
        color: #ffbd4a;
      }
    }
  }

  .deluxe {
    display: flex;
    flex-direction: column;
    width: 520px;

    @media ${(props) => props.theme.mobile} {
      width: 100%;
    }

    .icon {
      width: 3.5em;
      border-radius: 1em;
      text-align: center;
      background-color: #fcb436;
      color: white;
      font-size: 1.5em;
      margin: 1.5em 0 0.5em;
      @media ${(props) => props.theme.mobile} {
        font-size: 1.15em;
        margin-left: 1em;
      }
    }
    .deluxeD {
      background-color: white;
      padding: 1em 2em;
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media ${(props) => props.theme.mobile} {
        padding: 1em;
        width: 90%;
        margin: 0 auto;
        flex-direction: column;
        align-items: flex-start;
      }

      .title {
        width: 70%;
        font-weight: bold;
        font-size: 1.35em;
        @media ${(props) => props.theme.mobile} {
          font-size: 1.3em;
          width: 100%;
        }
      }
      .price {
        font-size: 1.35em;
        font-weight: bold;
        color: #ffbd4a;
      }
    }
  }
`;

const SeventhSection = styled.div`
  background: #fcb436;
  color: white;
  padding: 3.5em;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  span {
    font-size: 20px;
    @media ${(props) => props.theme.mobile} {
      font-size: 15px;
    }
  }
`;

const EightthSection = styled.div`
  margin-top: 4em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 2.5em;
  }
`;

const NinethSection = styled.div`
  margin-top: 4em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 2.5em;
  }
`;

const TenthSetion = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-top: 2em;
  }

  .inquiry {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media ${(props) => props.theme.mobile} {
      width: 100%;
      padding: 0 1em;
    }

    .call {
      display: flex;
      margin-top: 2em;

      .inquiryTitle {
        color: #fcb436;
        font-weight: bold;
        border: 2px solid #fcb436;
        padding: 0.5em 1em;
        width: 135px;
        font-size: 1.5em;
        margin-right: 0.5em;

        @media ${(props) => props.theme.mobile} {
          font-size: 1em;
          width: 90px;
          height: 40px;
          margin-right: 5px;
        }
      }
      .inquiryContent {
        background-color: #fff1d5;
        font-weight: bold;
        padding: 0.5em 0;
        font-size: 1.5em;
        width: 300px;

        @media ${(props) => props.theme.mobile} {
          font-size: 1.15em;
          width: 200px;
          height: 40px;
          margin-right: auto;
        }
      }
    }

    .email {
      display: flex;
      margin-top: 0.5em;
      .inquiryTitle {
        color: #fcb436;
        font-weight: bold;
        border: 2px solid #fcb436;
        padding: 0.5em 0;
        width: 135px;
        font-size: 1.5em;
        margin-right: 0.5em;

        @media ${(props) => props.theme.mobile} {
          font-size: 1em;
          width: 90px;
          height: 40px;
          margin-right: 5px;
          margin-bottom: 2em;
        }
      }
      .inquiryContent {
        background-color: #fff1d5;
        font-weight: bold;
        padding: 0.5em 1em;
        font-size: 1.5em;
        width: 300px;
        margin: 0;

        @media ${(props) => props.theme.mobile} {
          font-size: 1.15em;
          width: 200px;
          height: 40px;
          margin-right: auto;
        }
      }
    }
  }
`;

const BigTitle = styled.div`
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.5em;
  }
`;

const Boldtext = styled.div`
  font-size: 1.85em;
  font-weight: bold;
  line-height: 1.5em;
  margin: 2em 0 0.5em;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.2em;
  }
`;

const Regulartext = styled.div`
  font-size: 1.35em;
  line-height: 1.5em;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.05em;
  }
`;

const BallonView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em;
  width: 100%;
  @media ${(props) => props.theme.mobile} {
    padding: 2em;
  }
`;
const Balloon = styled.div`
  display: flex;
  margin: 0.5em 0;
  font-size: 1.5em;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2em;
  }
`;

const BalloonText = styled.div`
  &[data-type='left'] {
    background-color: #fcb436;
    padding: 0.85em;
    width: auto;
    color: white;
    width: 360px;
    border-radius: 10px;
    position: relative;

    @media ${(props) => props.theme.mobile} {
    }

    ::after {
      border-top: 20px solid #fcb436;
      border-right: 20px solid transparent;
      border-left: 0px solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      left: 0;
      bottom: -13px;
    }
  }

  &[data-type='right'] {
    padding: 1.5em;
    background-color: #fff1db;
    width: 500px;
    border-radius: 10px;
    position: relative;
    margin-left: auto;
    @media ${(props) => props.theme.mobile} {
    }

    ::after {
      border-top: 20px solid #fff1db;
      border-left: 20px solid transparent;
      border-right: 0px solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      right: 0;
      bottom: -13px;
    }
  }
`;

const WarningSign = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 1em;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2em;
  }

  img {
    width: 100px;
    margin-bottom: 0.5em;

    @media ${(props) => props.theme.mobile} {
      width: 80px;
    }
  }
`;

const Notice = styled.div`
  padding: 3em;
  @media ${(props) => props.theme.mobile} {
    padding: 1.5em;
  }

  .line {
    width: 100%;
    margin: 1em 0;
    font-size: 1.35em;

    @media ${(props) => props.theme.mobile} {
      font-size: 1.05em;
    }
  }

  img {
    width: 25px;
    margin-right: 20px;
    @media ${(props) => props.theme.mobile} {
      width: 15px;
      margin-right: 8px;
    }
  }
`;

const RequestButton = styled.input`
  font-weight: bolder;
  border-radius: 50px;
  padding: 0.7em 2em;
  background-color: #fcb436;
  color: white;
  cursor: pointer;
  font-size: 1.8em;
  margin: 2em auto;

  @media ${(props) => props.theme.mobile} {
    font-size: 15px;
    margin: 1em auto;
  }
`;
