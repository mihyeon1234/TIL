import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Avatar, Layout, Menu, Popover } from 'antd';
// import SellhaLogo from 'assets/images/sellha-full-logo.png';
import SellhaLogoBeta from 'assets/images/logo_beta.png';

import { theme } from 'styles';
import { useSelector, useDispatch } from 'react-redux';
import { logout, deleteUserInfo, setUserInfo } from 'redux/user';
import { localInfo } from 'http-api';

import { MoreOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import { removeCookie } from 'components/cookie';

import KakaoBannerImg from 'assets/images/openBanner.png';

const { SubMenu } = Menu;
const { Sider } = Layout;

function DropDownMenu() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <DropMenuDiv>
      <MyPageButton onClick={() => history.push('/mypage')}>
        내 정보
      </MyPageButton>
      <LogoutButton
        onClick={() => {
          dispatch(logout());
          history.push('/');
          removeCookie('RF');
        }}
      >
        로그아웃
      </LogoutButton>
    </DropMenuDiv>
  );
}

function CustomSider() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
  const [openKeys, setOpenKeys] = useState([]);

  // localstorage를 검사해서 토큰 정보를 redux에 저장
  useEffect(async () => {
    try {
      if (!user?.userName) {
        const userInfo = await localInfo();
        dispatch(setUserInfo(userInfo));
      }
    } catch {
      dispatch(deleteUserInfo());
    }

    return () => {
      setOpenKeys([]);
    };
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const currentMenuKey = (key) => {
    if (history.location.pathname.search(key) >= 0) {
      return history.location.pathname;
    }
    return key;
  };

  return (
    <Container theme={theme} width={235}>
      <LogoDiv>
        <NavLink to="/">
          <img className="logo" alt="sellha" src={SellhaLogoBeta} />
        </NavLink>
      </LogoDiv>
      {!user.id && (
        <UserContainer>
          <UserDiv
            className="loginBox"
            onClick={() => history.push('/member/login')}
          >
            <NavLink className="login" to="/member/login">
              로그인
            </NavLink>
          </UserDiv>
        </UserContainer>
      )}
      {user.id && (
        <UserContainer>
          <UserDiv>
            <UserTitle>꿀벌셀러 {user.userName}</UserTitle>
            <Popover
              placement="bottom"
              content={DropDownMenu}
              mouseEnterDelay={0}
              mouseLeaveDelay={0.2}
              trigger="click"
              destroyTooltipOnHide
            >
              <SAvatar icon={<MoreOutlined />} />
            </Popover>
          </UserDiv>
        </UserContainer>
      )}
      <SMenu
        selectedKeys={[history.location.pathname]}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <StyleItem key="/discover" onClick={() => setOpenKeys([])}>
          <SNavLink to="/discover" activeClassName="menu-link-active">
            아이템 발굴
            {/* {history.location.pathname === '/discover' && <ActiveBar />} */}
          </SNavLink>
        </StyleItem>
        <StyleSubMenu key="sub1" title="아이템 분석">
          <StyleItem key="/keyword" onClick={() => setOpenKeys(['sub1'])}>
            <SNavLink to="/keyword" activeClassName="menu-sub-link-active">
              키워드 분석
              {/* {history.location.pathname === '/keyword' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>

          <StyleItem key="/review" onClick={() => setOpenKeys(['sub1'])}>
            <SNavLink to="/review" activeClassName="menu-sub-link-active">
              키워드 리뷰
              {/* {history.location.pathname === '/review' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
        </StyleSubMenu>

        <StyleSubMenu key="sub2" title="마케팅 도구">
          <StyleItem key="/productname" onClick={() => setOpenKeys(['sub2'])}>
            <SNavLink to="/productname" activeClassName="menu-sub-link-active">
              상품명 최적화
              <NewTag>new</NewTag>
              {/* {history.location.pathname === '/productname' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
          {/* <StyleItem key="/ai" disabled>
            <SNavLink to="/ai" activeClassName="menu-sub-link-active">
              AI 상세페이지 분석
              {history.location.pathname === '/review' && <ActiveBar />}
            </SNavLink>
          </StyleItem> */}
          <StyleItem key="/contents" onClick={() => setOpenKeys(['sub2'])}>
            <SNavLink to="/contents" activeClassName="menu-sub-link-active">
              콘텐츠 분석
              {/* {history.location.pathname === '/contents' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
        </StyleSubMenu>

        <StyleSubMenu key="sub4" title="모니터링">
          <StyleItem key="/monitoring" onClick={() => setOpenKeys(['sub4'])}>
            <SNavLink to="/monitoring" activeClassName="menu-sub-link-active">
              일간 모니터링
              {/* {history.location.pathname === '/monitoring' && <ActiveBar />}
              {history.location.pathname ===
                `/monitoring/${selectItem.product_id}` && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
          <StyleItem
            key="/realtimemonitoring"
            onClick={() => setOpenKeys(['sub4'])}
          >
            <SNavLink
              to="/realtimemonitoring"
              activeClassName="menu-sub-link-active"
            >
              실시간 모니터링
              <NewTag>new</NewTag>
              {/* {history.location.pathname === '/realtimemonitoring' && (
                <ActiveBar />
              )} */}
            </SNavLink>
            <ServiceTooltip />
          </StyleItem>
        </StyleSubMenu>

        <StyleSubMenu
          key="sub3"
          title="대행 서비스"
          style={{
            margin: '1em 0',
            padding: '0.2em 0',
            borderTop: '0.1em solid #afafaf24',
            borderBottom: '0.1em solid #afafaf24',
          }}
        >
          <StyleItem key="/sourcing" onClick={() => setOpenKeys(['sub3'])}>
            <SNavLink to="/sourcing" activeClassName="menu-link-active">
              아이템 소싱
              {/* {history.location.pathname === '/sourcing' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
          <StyleItem key="/logistics" onClick={() => setOpenKeys(['sub3'])}>
            <SNavLink to="/logistics" activeClassName="menu-link-active">
              3PL 물류대행
              {/* {history.location.pathname === '/logistics' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
          <StyleItem
            key="/fullpage"
            onClick={() => setOpenKeys(['sub3'])}
            disabled
          >
            <SNavLink to="/fullpage" activeClassName="menu-link-active">
              상세페이지 제작
              {/* {history.location.pathname === '/fullpage' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
          <StyleItem key="/cs" onClick={() => setOpenKeys(['sub3'])} disabled>
            <SNavLink to="/cs" activeClassName="menu-link-active">
              CS 서비스
              {/* {history.location.pathname === '/cs' && <ActiveBar />} */}
            </SNavLink>
          </StyleItem>
        </StyleSubMenu>

        <StyleItem
          key={currentMenuKey('/insight')}
          onClick={() => setOpenKeys([])}
        >
          <SNavLink to="/insight" activeClassName="menu-link-active">
            이커머스 인사이트
            {/* {history.location.pathname === '/insight' && <ActiveBar />}
            {history.location.pathname ===
              `/insight/${selectItem.product_id}` && <ActiveBar />} */}
          </SNavLink>
        </StyleItem>

        <StyleItem key="/board" onClick={() => setOpenKeys([])}>
          <SNavLink to="/board" activeClassName="menu-sub-link-active">
            게시판
            {/* {history.location.pathname === '/board' && <ActiveBar />} */}
          </SNavLink>
        </StyleItem>
        <KakaoBanner
          src={KakaoBannerImg}
          onClick={() => window.open('https://open.kakao.com/o/gbkofGxd')}
        />
      </SMenu>
    </Container>
  );
}

export default CustomSider;

const StyleItem = styled(Menu.Item)`
  display: flex;
  flex-direction: row;
  font-weight: 500;

  .menu-link-active {
    color: black;
    font-weight: 600;
  }
  .menu-sub-link-active {
    color: black;
    font-weight: 600;
  }
`;

const StyleSubMenu = styled(SubMenu)`
  font-size: 0.85rem;
`;

const Container = styled(Sider)`
  background-color: ${(props) => props.theme.colors.primary};
  position: sticky;
  z-index: 1;
  top: 0px;
  height: 100%;

  .logo {
    width: 160px;
    padding: 6px 0;
  }

  .loginBox:hover {
    cursor: pointer;
    .login {
      font-weight: bold;
    }
  }

  .ant-menu-vertical .ant-menu-item:after,
  .ant-menu-vertical-left .ant-menu-item:after,
  .ant-menu-vertical-right .ant-menu-item:after,
  .ant-menu-inline .ant-menu-item:after {
    border-right: none;
  }

  .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
    border-radius: 1em;
    height: 3.2em;
    line-height: 3.2;
    /* box-shadow: 0 -1px 5px 0 #00000026; */
    background-color: white; //#ffcb07;
    font-weight: 600;
  }

  .ant-menu-submenu-active {
    color: black;
  }

  .ant-menu-item-selected a:hover,
  a:hover,
  .ant-menu-inline .ant-menu-item-group-list .ant-menu-submenu-title:hover,
  .ant-menu-inline .ant-menu-submenu-title:hover,
  .ant-menu-item:hover,
  .ant-menu-submenu:hover .ant-menu-submenu-expand-icon,
  .ant-menu-submenu:hover .ant-menu-submenu-arrow,
  .div {
    color: black;
    font-weight: 600;
  }

  .ant-menu-submenu-selected {
    color: black;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    background: none;
  }

  .ant-menu .ant-menu-item-selected,
  .ant-menu-sub.ant-menu-inline {
    background-color: transparent;
  }

  .ant-menu-sub.ant-menu-inline .ant-menu-item,
  .ant-menu-sub.ant-menu-inline .ant-menu-submenu-title {
    background: none;
    box-shadow: none;
  }

  .ant-menu-inline.ant-menu-root .ant-menu-item,
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title {
    transition: none;
  }

  .ant-menu.ant-menu-sub.ant-menu-inline {
    background-color: white;
    border-radius: 1em;
    /* box-shadow: 0 -1px 5px 0 #00000026; */
    min-height: 7em;
    padding: 1em 0;
    > li {
      padding-left: 2.3em !important;
      height: auto;
      line-height: 2;
    }
  }

  .tooltip-service {
    padding: 0.6em 1.2em;
    font-weight: 500;
    font-size: 0.85em;
    border-radius: 1em;
    opacity: 0.88 !important;
  }
`;
const SNavLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.85rem;
`;

const LogoDiv = styled.div`
  margin: 40px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
const SMenu = styled(Menu)`
  overflow-y: scroll;
  max-height: 70vh;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  margin: 2.5em 0;
  padding: 0 1.2rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UserDiv = styled.div`
  display: flex;
  width: 78%;
  align-items: center;
  justify-content: center;
  height: 3.5em;
  border-radius: 1.2em;
  overflow: hidden;
  background-color: white; // #ffe275;
  box-shadow: 3px 3px 3px #00000010;
`;

const UserTitle = styled.div`
  width: 8em;
  font-weight: 500;
`;

const SAvatar = styled(Avatar)`
  background-color: white; // #ffe275;
  color: black;
  float: right;
  margin-left: -0.25em;
  right: -10%;
  cursor: pointer;
`;

const DropMenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
  }
`;

const MyPageButton = styled.div`
  width: 100px;
  font-size: 0.95em;
  margin: 0 auto;
  text-align: center;
  padding: 0.35em 0px;
  :hover {
    font-weight: 600;
  }
  @media ${(props) => props.theme.mobile} {
  }
`;

const LogoutButton = styled.div`
  width: 100px;
  font-size: 0.95em;
  margin: 0 auto;
  text-align: center;
  border-top: 1px solid lightgray;
  padding: 0.35em 0px;
  :hover {
    font-weight: 600;
  }

  @media ${(props) => props.theme.mobile} {
  }
`;

// const ActiveBar = styled.div`
//   font-weight: 600;
//   background: ${(props) => props.theme.colors.primary};
//   height: 0.2rem;
//   width: 0.7rem;
//   margin: auto 0;
//   margin-left: 0.5rem;
// `;

const KakaoBanner = styled.img`
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;
`;

const NewTag = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.4rem;
  padding: 0 3px 2px 3px;
  line-height: 1.3;
  margin-left: 0.4rem;
  color: ${(props) => props.theme.colors.orange};
  border: 1px solid ${(props) => props.theme.colors.orange};
`;

function ServiceTooltip() {
  return (
    <ReactTooltip
      id="tooltip-service"
      className="tooltip-service"
      place="right"
      effect="solid"
      backgroundColor="#ffffff"
      textColor="#000000"
    >
      🐝 서비스 준비 중입니다
    </ReactTooltip>
  );
}
