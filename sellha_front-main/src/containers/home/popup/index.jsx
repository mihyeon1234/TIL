import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Modal } from 'antd';

import PopupImage from 'assets/popup/220610_popup.png';
import MyInfo from 'assets/popup/myinfo_null.png';

const index = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { userName, phone, id } = useSelector((state) => state.user);
  const nullDataChk =
    id && (!userName || userName === 'null' || !phone || phone?.length === 0);

  useEffect(() => {
    if (localStorage.getItem('popupTime')) {
      const popupTime = localStorage.getItem('popupTime') * 1;
      const today = new Date().getTime();
      const period = Math.floor((today - popupTime) / 1000 / 60 / 60);

      // 24시간 이내 보이지 않기
      if (period >= 24) {
        localStorage.removeItem('popupTime');
        setVisible(true);
      } else {
        setVisible(false);
      }
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (nullDataChk) {
      Swal.fire({
        title: '⚠️ 재인증 필요',
        html:
          '회원님의 정보가 올바르지 않습니다.<br>' +
          '내 정보 페이지에서 정보를 수정해 주세요.<br>' +
          `<img src=${MyInfo} alt='infoNull' style='border-top: 1px solid #eaeaea; border-bottom: 1px solid #eaeaea; margin-top: 15px;' />`,
        confirmButtonText: '정보 수정하러 가기',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/mypage');
        }
      });
    }
  }, [userName, phone]);

  if (nullDataChk) {
    return <></>;
  }

  return (
    <ModalContainer
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      centered
      footer={
        <HideBtn
          type="button"
          onClick={() => {
            localStorage.setItem('popupTime', new Date().getTime());
            setVisible(false);
          }}
        >
          24시간 동안 보지 않기
        </HideBtn>
      }
      width={500}
      bodyStyle={{
        height: 500,
        width: 500,
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageBox
        src={PopupImage}
        alt="popup"
        onClick={() => window.open('https://open.kakao.com/o/gbkofGxd')}
        aria-hidden="true"
      />
    </ModalContainer>
  );
};

export default index;

const ModalContainer = styled(Modal)`
  .ant-modal-content > .ant-modal-close {
    right: 0px;
  }
`;

const ImageBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: url(${PopupImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HideBtn = styled.button`
  background-color: transparent;

  :hover {
    background-color: transparent;
  }

  :focus {
    background-color: transparent;
  }
`;
