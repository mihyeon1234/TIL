import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  const history = useHistory();

  return (
    <Container>
      <ContentDiv>
        <BrandSpan>셀링하니 </BrandSpan>
        <ContentSpan>말랑하니 주식회사</ContentSpan>
        <ContentDash>|</ContentDash>
        <ContentSpan>사업자 등록번호 475-81-01046</ContentSpan>
        <ContentDash>|</ContentDash>
        <ContentSpan>통신판매업 신고 2018-부산해운대-0157</ContentSpan>
      </ContentDiv>
      <ContentDiv>
        <ContentSpan>대표 박성준</ContentSpan>
        <ContentDash>|</ContentDash>
        <ContentSpan>
          부산시 해운대구 센텀중앙로 97, 27층(센텀스카이비즈 A동)
        </ContentSpan>
        <ContentDash>|</ContentDash>
        <ContentSpan>070-7723-1099</ContentSpan>
        <ContentDash>|</ContentDash>
        <ContentSpan>
          <a href="http://pf.kakao.com/_XxoxjSs">1:1 문의</a>
        </ContentSpan>
      </ContentDiv>
      <MenuDiv>
        <AgreeSpan onClick={() => history.push('/agree')}>이용약관</AgreeSpan>
        <ContentDash>|</ContentDash>
        <PrivacySpan onClick={() => history.push('/privacy')}>
          개인정보취급방침
        </PrivacySpan>
      </MenuDiv>
      <ContentDiv>
        <BottomSpan>Copyright © MalangHoney. All rights reserved.</BottomSpan>
      </ContentDiv>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.2em 0 0 0;

  background-color: none;
  margin: 4em 6.5em;
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  /* position: relative; */
  /* width: -webkit-fill-available; */

  @media ${(props) => props.theme.mobile} {
    display: none;
    /* font-size: 0.9em;
    word-break: keep-all;
    margin: 2em; */
  }
`;

const MenuDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5em 0;
  font-size: 0.95em;
`;

const AgreeSpan = styled.div`
  font-weight: 600;
  font-size: 0.9em;
  margin-right: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
  }
`;

const PrivacySpan = styled.div`
  font-weight: 600;
  font-size: 0.9em;
  margin-left: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
  }
`;

const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.colors.darkGray};

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 2em;
  }
`;

const BrandSpan = styled.div`
  margin-right: 0.5em;
  font-weight: 600;
  font-size: 0.85em;
  @media ${(props) => props.theme.mobile} {
  }
`;

const ContentSpan = styled.div`
  font-weight: 300;
  font-size: 0.85em;
  margin-right: 0.5em;
  color: ${(props) => props.theme.colors.darkGray};

  @media ${(props) => props.theme.mobile} {
  }
`;

const ContentDash = styled.div`
  font-weight: 600;
  font-size: 0.8em;
  margin-right: 0.5em;
  color: ${(props) => props.theme.colors.gray};

  @media ${(props) => props.theme.mobile} {
  }
`;

const BottomSpan = styled.span`
  font-size: 0.75em;
`;
