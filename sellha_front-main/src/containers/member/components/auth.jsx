import React from 'react';

/**
 * 나이스 본인인증 팝업창 열기
 * 작성자: 장다영
 * 업데이트: 2022.06.29
 */
export function openAuthPopup() {
  const popupX = (window.screen.width - 500) / 2;
  const popupY = (window.screen.height - 550) / 2;

  const windowFeatrues = `width=500, height=550, top=${popupY}, left=${popupX}, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no`;
  window.open('', 'authPopup', windowFeatrues);

  document.authCheck.submit();
}

/**
 * 나이스 보인인증 url로 보낼 필수 값 form
 * 작성자: 장다영
 * 업데이트: 2022.06.29
 * @param {String} SEncData 나이스 팝업창을 열기 위한 암호화된 값
 * @param {JSON} signup 회원가입 창에서 입력한 값(팝업창에서 회원가입 api전송을 위해 필요)
 * @returns {Object}
 */
export function AuthForm({ SEncData, signup, info }) {
  return (
    <form
      name="authCheck"
      method="post"
      action="https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb"
      target="authPopup"
    >
      {/* 필수 값 */}
      <input type="hidden" name="m" value="checkplusService" />
      {/* 필수 값 */}
      <input type="hidden" name="EncodeData" value={SEncData || ''} />
      {/* 회원가입 입력 값 */}
      <input type="hidden" name="signup" value={JSON.stringify(signup || '')} />
      {/* 휴대폰 번호 변경 시 회원 정보 */}
      <input type="hidden" name="info" value={JSON.stringify(info || '')} />
    </form>
  );
}
