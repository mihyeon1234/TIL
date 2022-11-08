import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getAuthUser } from 'containers/member/my-page/api';
import { AuthForm, openAuthPopup } from 'containers/member/components/auth';
import { Container, EmptyBtn, FullBtn } from '../../style/index';
import { setErrorMsg } from './reducer';
import { checkDuplicateEmail } from '../api';
import MemberIntro from '../../components/MemberIntro';
import FindEmail from './components/Email';
import FindPassword from './components/Password';
import ResultEmail from './components/result/Email';

const { TabPane } = Tabs;

/**
 * 아이디, 비밀번호 찾기 페이지 및 기능 구현
 * 작성자: 장다영
 * 업데이트: 2022.07.06
 * @returns
 */
function index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { message } = useSelector((state) => state.findAccount);
  const emailInput = useRef();
  // 본인인증 창을 열기 위한 암호화된 데이터 값
  const [encData, setEncData] = useState('');
  // 결과가 존재하고, 인증이 완료 되었는지 체크 및 결과를 보여줄 페이지 체크
  const [showResult, setShowResult] = useState(false);
  // 스토리지에 저장해서 인증 완료 상태인지 체크
  const storageData = JSON.parse(localStorage.getItem('enc'));
  const param = new URLSearchParams(window.location.search);
  // tab index : 1 - 아이디 찾기, 2 - 비밀번호 찾기
  const urlTabIdx = param.get('tab');
  // 본인인증 정상적 종료 후 응답 값
  const name = param.get('name');
  const result = param.get('result');

  /**
   * url 리셋
   * 로컬 스토리지 데이터 삭제, url 초기화, tab 이동 시 tab 값 변경
   * 작성자: 장다영
   * 업데이트: 2022.07.06
   * @param {Number} activeKey
   */
  function resetUrlParams(activeKey) {
    if (storageData) {
      // 본인인증 암호화 데이터 삭제
      localStorage.removeItem('enc');
    }

    setShowResult(false);

    // 탭 변경 시 주소에 탭 정보 저장(새로고침시에도 탭을 그대로 유지하기 위함)
    if (activeKey) {
      param.set('tab', activeKey);
    }

    if (param.get('name')) {
      // 주소에서 인증 후 받아온 정보 전체 삭제
      param.delete('name');
      param.delete('email');
      param.delete('phone');
      param.delete('result');
    }

    location.search = param.toString();
    history.push(location);
  }

  useEffect(() => {
    const check = name && storageData && result === urlTabIdx;
    setShowResult(check);
    // 인증값이 없고 전달 받은 값이 있을 때
    if (!storageData && name) {
      resetUrlParams();
    }
    // 본인인증 비정상 종료 시
    else if (!check) {
      // 본인인증 암호화 데이터 삭제
      localStorage.removeItem('enc');
    }

    // 페이지 벗어나면 본인인증 암호화 데이터 삭제
    return () => localStorage.removeItem('enc');
  }, [storageData]);

  /**
   * 휴대폰 인증하기 버튼 클릭 이벤트
   * 작성자: 장다영
   * 업데이트: 2022.07.06
   */
  async function authEvent() {
    try {
      let check = true;
      if (urlTabIdx * 1 === 2) {
        const inputData = emailInput.current.input.value;
        if (inputData.length === 0) {
          dispatch(setErrorMsg('이메일은 필수 정보입니다.'));
          check = false;
        } else {
          const response = await checkDuplicateEmail(inputData);
          if (!response) {
            dispatch(setErrorMsg('가입된 정보가 없습니다.'));
            check = false;
          }
        }
      }

      if (message?.length === 0 && check) {
        // 본인인증 창 열기 위한 암호화 데이터 값 받아오기
        const { sRtnMSG, sEncData } = await getAuthUser();
        if (!sRtnMSG || sRtnMSG.length === 0) {
          setEncData(sEncData);
          // 새로고침 후에도 인증 여부 체크하기 위해 셋팅
          localStorage.setItem('enc', true);
        }

        // 본인인증 팝업창 오픈
        openAuthPopup();
      }
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  }

  return (
    <Container>
      <MemberIntro />
      <FindTabs
        defaultActiveKey={urlTabIdx}
        onTabClick={(activeKey) => {
          resetUrlParams(activeKey);
        }}
        centered="true"
      >
        <TabPane tab="아이디 찾기" key="1">
          {/* 아이디 찾기 */}
          {!showResult ? <FindEmail /> : <ResultEmail />}
        </TabPane>
        <TabPane tab="비밀번호 찾기" key="2">
          {/* 비밀번호 찾기 */}
          {!showResult && <FindPassword emailInput={emailInput} />}
        </TabPane>
      </FindTabs>
      {/* 휴대폰 인증하기는 계정 찾기 결과를 보여주지 않을 때 보여줌 */}
      {!showResult && (
        <FullBtn onClick={() => authEvent()}>휴대폰 인증하기</FullBtn>
      )}
      {/* 결과 페이지와 계정 찾기 페이지의 width가 다름 */}
      <LoginLink to="/member/login" name={showResult ? 'true' : ''}>
        로그인하러 가기
      </LoginLink>
      <AuthForm SEncData={encData} />
    </Container>
  );
}

export default index;

const FindTabs = styled(Tabs)`
  width: 25em;
  margin-top: 5em;

  .ant-tabs-tab {
    padding: 0;
  }
  .ant-tabs-tab-btn {
    width: 12.5em;
    line-height: 3.5em;
    height: 3.5em;
    text-align: center;
    border-bottom: 3px solid black;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: white;
    background: black;
  }
  .ant-tabs-ink-bar {
    background: unset;
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }

  /* moreIcon 숨기기 */
  .ant-tabs-nav-operations {
    display: none;
  }
`;

const LoginLink = styled(EmptyBtn)`
  margin-top: 1em;
  width: ${(props) => (props.name ? '80%' : '100%')};
`;
