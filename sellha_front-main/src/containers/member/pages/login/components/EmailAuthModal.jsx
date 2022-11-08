import React, { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import styled from 'styled-components';
import { sendCertifyEmail } from 'http-api';
import Swal from 'sweetalert2';
import { theme } from 'styles';

function index({ visibleModal, setVisibleModal, LoginForm }) {
  const [loadingSending, setLoadingSending] = useState(false);

  const resendCertifyEmail = async () => {
    setLoadingSending(true);
    try {
      const { message } = await sendCertifyEmail(LoginForm.email);
      if (message === 'ok') {
        setLoadingSending(false);
        setVisibleModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: '다시 한번 시도해 주세요.',
        confirmButtonColor: theme.colors.primary,
      });
    }
  };

  return (
    <Modal
      width={450}
      visible={visibleModal}
      onCancel={() => setVisibleModal((prev) => !prev)}
      destroyOnClose
      centered
      footer={null}
      bodyStyle={{
        height: 400,
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <ModalTitle>이메일 인증</ModalTitle>
      <ModalNotice>
        <div>🚧</div>
        <span>{LoginForm.email.split('@')[0]}님, </span>
        <span>현재 가입 대기 상태입니다.</span>
      </ModalNotice>
      <ModalNoticeMention>
        <div>셀링하니의 모든 기능 사용을 위해</div>
        <div>이메일 인증을 완료해 주세요.</div>
      </ModalNoticeMention>
      <SendButton onClick={() => resendCertifyEmail()}>
        {loadingSending ? <Spin size="small" /> : '인증메일 재전송'}
      </SendButton>
    </Modal>
  );
}

export default index;

const ModalTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 1rem;
`;

const ModalNotice = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 1.2rem;
  text-align: center;
`;

const ModalNoticeMention = styled(ModalNotice)`
  text-align: center;
`;

const SendButton = styled(Button)`
  width: 9.5rem;
  height: 2.3rem;
  margin: 1rem;
  border-radius: 0.5rem;
  padding: 0.15rem 1rem;
  font-size: 0.95rem;
  :hover {
    color: ${(props) => props.theme.colors.orange};
  }
`;
