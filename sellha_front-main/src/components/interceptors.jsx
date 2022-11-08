import { ENTRY_POINT, localRefresh } from 'http-api';
import axios from 'axios';
import { removeCookie, setCookie } from './cookie';

async function interceptors() {
  axios.defaults.baseURL = `${ENTRY_POINT}`;

  // 요청 시
  axios.interceptors.request.use((req) => {
    // cookie 백으로 전송
    req.withCredentials = true;

    return req;
  });

  // 응답 시
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      // config : 요청, response : 에러 응답
      const { config, response } = error;
      // 요청
      const originalRequest = config;

      // 에러 응답
      if (!response) return error;
      // status : 응답 코드
      const { data, status } = response;
      if (config.url === `${ENTRY_POINT}/local-login/refresh`) {
        // refreshToken만료 시 로그인으로 이동
        if (status === 401) {
          removeCookie('RF');
          removeCookie('AC');
          localStorage.setItem('expire', true);
          window.location.href = '/member/login';
        }
      } else if (data && data.message && status === 401) {
        // refresh 토큰으로 새 access 토큰 받아오기
        const { accessToken } = await localRefresh();
        // 새 토큰 있을때
        if (accessToken) {
          // 새로 받아온 access 토큰 다시 셋팅
          setCookie('AC', accessToken);
          axios.defaults.withCredentials = true;

          // 기존 요청 다시 보내 줌
          return axios(originalRequest);
        }
      }

      return response;
    },
  );
}

export default interceptors;
