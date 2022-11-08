import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { theme } from 'styles';
import { localLogin } from 'http-api';
import { deleteUserInfo, login } from 'redux/user';

export const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [LoginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [visibleAlert, setVisibleAlert] = useState('');

  const [loading, setLoading] = useState(false);

  const onChangeInput = (e) => {
    const { value, name } = e.target;

    setLoginForm({
      ...LoginForm,
      [name]: value,
    });
  };

  const onClickLogin = useCallback(() => {
    const fetchLogin = async () => {
      setLoading(true);
      try {
        const { message, accessToken, refreshToken } = await localLogin(
          LoginForm,
        );

        // 오류 메세지 있을 때
        if (message) {
          // 비밀번호, 이메일, capslock 안내문 보여주기
          setVisibleAlert(message);
        } else {
          dispatch(
            login({
              accessToken,
              refreshToken,
              email: LoginForm.email,
            }),
          );
          history.push('/');
        }
      } catch (err) {
        Swal.fire({
          title: '⚠️ 일시적 오류',
          html: '로그인을 할 수 없습니다.<br>오류가 계속되면 1:1문의 주세요!',
          showCancelButton: true,
          confirmButtonColor: theme.colors.primary,
          cancelButtonColor: theme.colors.gray,
          confirmButtonText: '확인',
          cancelButtonText: '문의하기',
        });
        dispatch(deleteUserInfo());
      } finally {
        setLoading(false);
      }
    };

    if (!LoginForm.email || !LoginForm.password) return;
    fetchLogin();
  }, [LoginForm]);

  /**
   * 저장된 이메일있으면 로그인폼에 셋팅
   * 작성자: 장다영
   * 업데이트: 2021.10.27
   */
  useEffect(() => {
    if (localStorage.getItem('saveEmail')) {
      setLoginForm((prev) => ({
        ...prev,
        email: localStorage.getItem('saveEmail'),
      }));
    }

    return () => {
      setLoginForm({
        email: '',
        password: '',
      });
      setLoading(false);
    };
  }, []);

  return {
    LoginForm,
    visibleAlert,
    loading,
    onClickLogin,
    setVisibleAlert,
    onChangeInput,
  };
};

export const test = () => {};
