/**
 * api 실패 시 알림창 띄우기
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} msg
 * */
function failedAlert(msg) {
  if (window.confirm(`${msg}, 다시 시도해주세요.`)) {
    window.close();
  } else {
    window.close();
  }
}

/**
 * 가입된 정보 없을 때 사용, ok 누르면 해당 페이지로 이동
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} location
 */
function notFoundAccountAlert(location) {
  if (
    window.confirm('가입된 정보가 없습니다. 회원 가입으로 이동 하시겠습니까?')
  ) {
    window.opener.location = location;
  }

  window.self.close();
}

export { failedAlert, notFoundAccountAlert };
