import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Form, Input } from 'antd';
import Swal from 'sweetalert2';
import { getAuthUser } from '../my-page/api';
import { checkDuplicateEmail } from './api';
import { AuthForm, openAuthPopup } from '../components/auth';
import MemberIntro from '../components/MemberIntro';

const passRegExp = /(?=.*\d{1,24})(?=.*[a-zA-Z]{1,24}).{8,24}$/;

const useSignUp = () => {
  const [form] = Form.useForm();
  const [verifiedForm, setVerifiedForm] = useState(false);
  const [encData, setEncData] = useState();
  const [signupData, setSignupData] = useState();

  const popUpOptions =
    'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';

  const referralCodeArray = [
    { id: 0, name: 'dvcompany' },
    { id: 1, name: 'MRSEOKR' },
    { id: 2, name: 'MULZOO' },
    { id: 3, name: 'culture' },
    { id: 4, name: '트렌드헌터' },
    { id: 5, name: '정영민TV' },
    { id: 6, name: '시크릿크루' },
  ];

  const onFieldsChange = (_, allFields) => {
    const checkFieldsValue = allFields
      .filter(
        ({ name }) =>
          name[0] === 'email' || name[0] === 'pass1' || name[0] === 'pass2',
      )
      .every(({ touched, errors }) => touched && errors.length === 0);

    const checkReferralValue = allFields.find(
      ({ name, errors }) => name[0] === 'referralCode' && errors.length === 0,
    );

    if (checkFieldsValue && checkReferralValue) {
      setVerifiedForm(true);
    } else {
      setVerifiedForm(false);
    }
  };

  const onClickAgreeDocument = (docType) =>
    window.open(`https://sellha.kr/${docType}`, 'window', popUpOptions);

  const verifyReferralCode = (referCode) => {
    const checkReferral = referralCodeArray.filter(
      (code) => code.name === referCode.replace(/\s/gi, ''),
    );

    if (checkReferral.length === 0) {
      return false;
    }

    return true;
  };

  const handleSignupButton = async (values) => {
    try {
      const { sRtnMSG, sEncData } = await getAuthUser();
      if (!sRtnMSG || sRtnMSG.length === 0) {
        setEncData(sEncData);
        setSignupData({
          email: values.email,
          password: values.pass1,
          referralCode: values.referralCode?.replace(/\s/gi, ''),
        });
      }
      openAuthPopup();
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  return {
    form,
    verifiedForm,
    encData,
    signupData,
    verifyReferralCode,
    onClickAgreeDocument,
    onFieldsChange,
    onFinishForm: handleSignupButton,
  };
};

export default function SignupPage() {
  const {
    form,
    verifiedForm,
    encData,
    signupData,
    verifyReferralCode,
    onClickAgreeDocument,
    onFieldsChange,
    onFinishForm,
  } = useSignUp();

  return (
    <Container>
      <AuthForm SEncData={encData} signup={signupData} />
      <MemberIntro />
      <TitleDiv>회원가입</TitleDiv>

      <StyledForm
        onFinish={onFinishForm}
        onFieldsChange={onFieldsChange}
        form={form}
        scrollToFirstError
      >
        <StyledFormItem>
          <FormTitle>아이디 (이메일)</FormTitle>
          <StyledFormItem
            name="email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: '이메일 형식이 올바르지 않습니다.',
              },
              {
                required: true,
                message: '이메일은 필수 정보입니다.',
              },
              {
                async validator(_, value) {
                  if (form.getFieldError('email').length === 0 && value) {
                    const result = await checkDuplicateEmail(value);

                    if (result) {
                      throw new Error('이미 가입된 이메일 주소입니다.');
                    }
                  }
                },
                validateTrigger: 'onBlur',
              },
            ]}
            validateTrigger={['onBlur']}
          >
            <StyledInput
              name="email-value"
              autoComplete="off"
              placeholder="아이디로 사용할 이메일 입력"
            />
          </StyledFormItem>
        </StyledFormItem>

        <StyledFormItem>
          <FormTitle>비밀번호</FormTitle>
          <PasswordCheckForm
            name="pass1"
            hasFeedback
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error('비밀번호는 필수 정보입니다.'),
                    );
                  }
                  if (value.search(/\s/) !== -1) {
                    return Promise.reject(
                      new Error('공백은 입력할 수 없습니다.'),
                    );
                  }
                  if (!passRegExp.test(value)) {
                    return Promise.reject(
                      new Error('8 ~ 24자의 영문자와 숫자를 포함하세요.'),
                    );
                  }
                  if (value.length >= 24) {
                    return Promise.reject(new Error('24자 이하로 입력하세요.'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <StyledInput
              type="password"
              name="new-password"
              autoComplete="new-password"
              placeholder="영문, 숫자 조합 최소 8자"
            />
          </PasswordCheckForm>
          <StyledFormItem
            name="pass2"
            dependencies={['pass1']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error('확인을 위한 비밀번호를 다시 입력하세요.'),
                    );
                  }
                  if (getFieldValue('pass1') !== value) {
                    return Promise.reject(
                      new Error('비밀번호가 일치하지 않습니다.'),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <StyledInput
              type="password"
              name="new-password"
              autoComplete="new-password"
              placeholder="비밀번호 재입력"
            />
          </StyledFormItem>
        </StyledFormItem>

        <StyledFormItem>
          <ReferTitle>추천인 코드</ReferTitle>
          <StyledFormItem
            name="referralCode"
            rules={[
              {
                async validator(_, value) {
                  if (value) {
                    const result = verifyReferralCode(value);

                    if (!result) {
                      throw new Error(
                        '추천인 코드를 다시 확인해 주세요. (대, 소문자 구분 필요)',
                      );
                    }
                  }
                },
              },
            ]}
          >
            <StyledInput type="text" name="referer" autoComplete="off" />
          </StyledFormItem>
          <StyledErrorMessage>
            - 회원가입 시 최초 한 번만 입력할 수 있으며, 추후 수정이
            불가능합니다. - 혜택은 <b>신규 가입에 한해서 1회 제공</b>되며, 탈퇴
            후 재가입 시 추천인 혜택은 적용되지 않습니다.
          </StyledErrorMessage>
        </StyledFormItem>

        <SignupButton
          type="default"
          htmlType="submit"
          verify={verifiedForm}
          disabled={!verifiedForm}
        >
          본인인증하고 가입하기
        </SignupButton>

        <CheckAgreeDiv>
          <span>
            가입 시, 셀링하니의{' '}
            <AgreeDocButton onClick={() => onClickAgreeDocument('agree')}>
              이용약관
            </AgreeDocButton>
            {', '}
            <AgreeDocButton onClick={() => onClickAgreeDocument('privacy')}>
              개인정보취급방침
            </AgreeDocButton>
            에 동의합니다.
          </span>
        </CheckAgreeDiv>
        <LineDiv>
          <Line />
          <LineText>이미 가입을 하셨나요?</LineText>
          <Line />
        </LineDiv>
        <Link to="/member/login">
          <LoginButton>로그인 하러가기</LoginButton>
        </Link>
      </StyledForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  padding-top: 3rem;
  min-height: 63vh;

  .ant-form-item-control > div {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    color: ${(props) => props.theme.colors.danger};
  }
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
    box-shadow: none;
  }
  .ant-form-item-feedback-icon-success {
    color: ${(props) => props.theme.colors.orange};
  }
`;

const TitleDiv = styled.div`
  margin-top: 1.5em;

  font-size: 1.3em;
  font-weight: 500;
  letter-spacing: 2px;
`;

const StyledForm = styled(Form)`
  width: 21.5rem;
  padding: 0.5rem;
`;

const StyledFormItem = styled(StyledForm.Item)`
  margin-bottom: 15px;
`;

const PasswordCheckForm = styled(StyledFormItem)`
  margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
  padding: 0.5rem 0;
  font-size: 0.9rem;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.black};
  box-shadow: none;
  border-radius: 0;

  :focus,
  :active,
  :hover {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.black};
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme.black};
  }
`;

const StyledErrorMessage = styled.div`
  font-size: 0.7rem;
  margin-top: 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
  opacity: 1;
`;

const TitleStyle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const FormTitle = styled(TitleStyle)`
  ::after {
    content: '•';
    position: relative;
    bottom: 3px;
    right: 3px;
    font-size: 20px;
    color: ${(props) => props.theme.colors.danger};
  }
`;

const ReferTitle = styled(TitleStyle)``;

const ButtonStyle = styled.button`
  width: 100%;
  padding: 0.7em;

  border-radius: 0.3rem;
  font-size: 1rem;
  letter-spacing: 1px;
`;

const SignupButton = styled(ButtonStyle)`
  margin: 1rem 0;
  background-color: ${(props) =>
    props.verify ? props.theme.colors.orange : props.theme.colors.lineGray};
  color: ${(props) =>
    props.verify ? props.theme.colors.white : props.theme.colors.gray};

  cursor: ${({ verify }) => (verify ? 'pointer' : 'default')};

  :hover,
  :focus,
  :active {
    border: none;
    color: ${(props) =>
      props.verify ? props.theme.colors.white : props.theme.colors.gray};
    background-color: ${(props) =>
      props.verify ? props.theme.colors.primary : props.theme.colors.lineGray};
  }
`;

// const ToLoginDiv = styled.div`
//   margin-top: 2em;
//   margin-bottom: 7em;

//   color: ${(props) => props.theme.colors.darkGray};
// `;

const CheckAgreeDiv = styled.div`
  margin: 0.8rem 0 0 0;
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const AgreeDocButton = styled.span`
  text-decoration: underline;
  text-underline-position: under;
  color: ${(props) => props.theme.colors.orange};
  :hover {
    cursor: pointer;
  }
`;

const LineDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 2.5rem 0 2rem 0;
`;

const Line = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  width: 100%;
`;

const LineText = styled.span`
  font-size: 0.8rem;
  width: 32rem;
  margin: 0 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const LoginButton = styled(ButtonStyle)`
  color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};

  margin-bottom: 1rem;

  :hover {
    border: 1px solid ${(props) => props.theme.colors.orange};
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.orange};
  }
`;
