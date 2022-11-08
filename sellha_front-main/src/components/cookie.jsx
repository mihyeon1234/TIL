import { Cookies } from 'react-cookie';
import { COOKIE_OPTION } from 'http-api';

// refresh-token 쿠키에 저장
const cookies = new Cookies();

/**
 * 쿠키에 값 저장하는 함수
 * TODO:
 * httpOnly, secore 임시로 false 넣어 둠,
 * 오류 확인 후 COOKIE_OPTION으로 값 변경 필요
 * 작성자: 장다영
 * 업데이트: 2022.07.19
 * @param {String} key
 * @param {String} value
 * */
export function setCookie(key, value) {
  cookies.set(key, value, {
    path: '/',
    // 도메인 있을 때만 동작, localhost에서 동작 안함 (javascript로 쿠키에 접근할 수 없음)
    httpOnly: false,
    // https일 때만 동작, localhost에서 동작 안함 (https환경에서만 쿠키 저장할 수 있음)
    secure: false,
    // 도메인 설정 안하면 같은 도메인이 아니라서 쿠키 백엔드로 안감
    domain: COOKIE_OPTION ? '.sellha.kr' : 'localhost',
    // 얼마동안 유지할 것 인지 설정
    maxAge: 60 * 60 * 24 * 33,
  });
}

/**
 * 쿠키에 값 삭제하는 함수
 * 로컬 환경에서는 false, dev, master에서는 true
 * 작성자: 장다영
 * 업데이트: 2021.11.18
 * @param {String} key
 * */
export function removeCookie(key) {
  return cookies.remove(key, {
    path: '/',
    domain: COOKIE_OPTION ? '.sellha.kr' : 'localhost',
  });
}
