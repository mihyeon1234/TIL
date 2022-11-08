/* eslint-disable no-alert */
import { verifyCertifyEmail } from 'http-api';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function CertifyEmailPage({ history }) {
  useEffect(() => {
    async function certify() {
      if (window.location.search) {
        const token = window.location.search.split('code=')[1];

        try {
          await verifyCertifyEmail(token);
          alert('인증 성공');
          history.push('/');
        } catch (error) {
          alert('인증 실패, 잠시 후 다시 시도하여주세요.');
          history.push('/');
        }
      } else {
        alert('인증 실패, 잠시 후 다시 시도하여주세요.');
        history.push('/');
      }
    }
    certify();
  }, []);

  return <Container />;
}

const Container = styled.div``;
