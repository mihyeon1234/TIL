import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Tabs } from 'antd';

import CustomDrawer from 'components/drawer';
// import SellhaLogo from 'assets/images/sellha-full-logo.png';
import SellhaLogoBeta from 'assets/images/logo_beta.png';
import burgerMenu from 'assets/icon/burgermenu.png';

const { TabPane } = Tabs;
function Header() {
  const [VisibleMenu, setVisibleMenu] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleMenu = () => {
    setVisibleMenu(true);
  };

  useEffect(() => setVisibleMenu(false), [location]);

  return (
    <Container>
      <LogoDiv>
        <StyledMenuBtn>
          <img src={burgerMenu} alt="hambergerbtn" />
        </StyledMenuBtn>
        <LogoLink to="/discover">
          <img alt="sellha" src={SellhaLogoBeta} height="45px" />
        </LogoLink>
        <StyledMenuBtn onClick={handleMenu}>
          <img src={burgerMenu} alt="hambergerbtn" />
        </StyledMenuBtn>
      </LogoDiv>
      <STabs
        onTabClick={(key) => history.push(key)}
        activeKey={location.pathname}
        centered
        tabBarGutter="10px"
      >
        <TabPane tab="아이템 발굴" key="/discover" />
        <TabPane tab="아이템 분석" key="/keyword">
          <SubLinkDiv>
            {/* <SLink to="/keyword" activeClassName="menu-link-active">
              키워드 분석
            </SLink> */}
            {/* <SLink to="/review" activeClassName="menu-link-active">
              키워드 리뷰
            </SLink> */}
          </SubLinkDiv>
        </TabPane>
        <TabPane tab="콘텐츠 분석" key="/contents" />
        <TabPane tab="대행 서비스" key="/sourcing">
          <SubLinkDiv>
            <SLink to="/sourcing" activeClassName="menu-link-active">
              아이템 <br />
              소싱
            </SLink>
            {/* <SLink to="/fullpage" activeClassName="menu-link-active">
              상세페이지
              <br /> 제작
            </SLink>
            <SLink to="/cs" activeClassName="menu-link-active">
              cs <br />
              서비스
            </SLink> */}
            <SLink to="/logistics" activeClassName="menu-link-active">
              3PL <br />
              물류대행
            </SLink>
          </SubLinkDiv>
        </TabPane>
        {/* <TabPane tab="마케팅 도구" key="/title">
          <SubLinkDiv> */}
        {/* <SLink to="/title" activeClassName="menu-link-active">
              상품명 분석
            </SLink> */}
        {/* <SLink to="/ai" activeClassName="menu-link-active">
              AI 시선 분석
            </SLink> */}
        {/* <SLink
              disabled
              to="/contents"
              // activeClassName="menu-link-active"
            >
              콘텐츠 분석
            </SLink>
          </SubLinkDiv>
        </TabPane> */}
        {/* <TabPane tab="아이템 모니터링" key="/monitoring">
          {' '}
        </TabPane> */}
        {/* <TabPane tab="셀러View" key="/insight">
          <SubLinkDiv>
            <SLink to="/insight" activeClassName="menu-link-active">
              이커머스 인사이트
            </SLink>
            <SLink to="/pedia" activeClassName="menu-link-active">
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  window.open(
                    'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
                  );
                }}
                onKeyPress={() => {
                  window.open(
                    'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
                  );
                }}
              >
                셀러 백과
              </div>
            </SLink>
          </SubLinkDiv>
        </TabPane> */}
      </STabs>
      <CustomDrawer visible={VisibleMenu} setVisible={setVisibleMenu} />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  @media ${(props) => props.theme.tablet} {
    background-color: ${(props) =>
      window.location.pathname === '/mypage'
        ? // || window.location.pathname === '/'
          props.theme.colors.primary
        : props.theme.colors.white};
  }
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* margin: 1.5em 0 0.7em; */
  margin: 1em 0;
`;

const LogoLink = styled(Link)`
  @media ${(props) => props.theme.mobile} {
  }
`;

const StyledMenuBtn = styled(Button)`
  @media ${(props) => props.theme.mobile} {
    border: none;
    background: none;
  }
  :first-child {
    opacity: 0;
  }
`;

const STabs = styled(Tabs)`
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: space-evenly;
  }
  .ant-tabs-tab {
    margin: 0 0.5em;
  }
  .ant-tabs > .ant-tabs-nav,
  .ant-tabs-nav-operations {
    display: none !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: black;
  }
  .ant-tabs-tab {
    color: black;
  }

  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    height: 3px;
  }
`;
const SubLinkDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0.5em 1em;
  .menu-link-active {
    font-weight: bold;
    color: #ffda4f;
  }
`;
const SLink = styled(NavLink)`
  width: 100%;
  font-size: 13px;
  line-height: 1.35em;
  text-align: center;
  padding: 0 0.35em;
  margin-bottom: 1em;
  border-right: 1px solid #ebebeb;
  background-color: white;

  :last-child {
    border: none;
  }
`;
