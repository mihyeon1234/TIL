import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Drawer, Menu } from 'antd';
import SellhaLogo from 'assets/images/sellha-full-logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserInfo, logout, setUserInfo } from 'redux/user';
import { removeCookie } from 'components/cookie';
import { localInfo } from 'http-api';

const { SubMenu } = Menu;

function CustomDrawer({ visible, setVisible }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    try {
      if (!user?.id) {
        const userInfo = await localInfo();
        dispatch(setUserInfo(userInfo));
      }
    } catch {
      dispatch(deleteUserInfo());
    }
  }, []);

  const renderLinksByUserId = () => {
    if (user.id) {
      return (
        <>
          <LogoutLink key="mypage" onClick={() => history.push('/mypage')}>
            내정보
          </LogoutLink>
          <LogoutLink
            key="logout"
            onClick={() => {
              dispatch(logout());
              removeCookie('RF');
            }}
          >
            로그아웃
          </LogoutLink>
        </>
      );
    }
    return (
      <StyleItem className="loginBox" key="login">
        <NavLink className="login" to="/member/login">
          로그인
        </NavLink>
      </StyleItem>
    );
  };

  return (
    <Container
      visible={visible}
      placement="right"
      onClose={() => setVisible(false)}
    >
      <LogoDiv>
        <img alt="sellerbee" src={SellhaLogo} height="30px" />
      </LogoDiv>
      <Menu mode="inline">
        <StyleItem key="1">
          <NavLink to="/discover" activeClassName="menu-link-active">
            아이템 발굴
          </NavLink>
        </StyleItem>
        <StyleItem key="2">
          <NavLink to="/keyword" activeClassName="menu-link-active">
            아이템 분석
          </NavLink>
        </StyleItem>
        <SubMenu key="sub4" title="대행 서비스">
          <StyleItem key="11">
            <NavLink to="/sourcing" activeClassName="menu-link-active">
              아이템 소싱
            </NavLink>
          </StyleItem>

          <StyleItem key="14">
            <NavLink to="/logistics" activeClassName="menu-link-active">
              3PL 물류대행
            </NavLink>
          </StyleItem>
        </SubMenu>
        {renderLinksByUserId()}
      </Menu>
    </Container>
  );
}

export default CustomDrawer;

const Container = styled(Drawer)`
  .loginBox:hover {
    cursor: pointer;

    .login {
      font-weight: bold;
    }
  }

  .ant-drawer-content {
    overflow: hidden;
    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
      border-right: none;
    }
  }

  .ant-drawer,
  .ant-drawer-right {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    position: fixed;
  }

  .ant-drawer-body {
    padding: 1em;
  }
  .ant-drawer-wrapper-body > .ant-drawer-header-no-title > button {
    color: transparent;
  }

  .ant-drawer-close:active {
    background-color: white;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5em;
`;

const StyleItem = styled(Menu.Item)`
  .menu-link-active {
    font-weight: 600;
  }
`;

const LogoutLink = styled(Menu.Item)`
  color: #a09e9e;
`;
