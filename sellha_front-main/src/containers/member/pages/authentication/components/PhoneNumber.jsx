import React from 'react';
import { changePhoneNum } from '../../api';
import { failedAlert } from './Common';

/**
 * 휴대폰 번호 변경 이벤트
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name
 * @param {String} phone
 * @param {Function} setSuccess
 */
async function changePhoneEvent({ name, phone, setSuccess }) {
  try {
    // 휴대폰 번호 변경
    const result = await changePhoneNum({ name, phone });

    // 휴대폰 번호 변경 성공
    if (!result[0].id) {
      failedAlert('휴대폰 번호 변경 실패');
      setSuccess(false);
    }
  } catch {
    failedAlert('휴대폰 번호 변경 실패');
    setSuccess(false);
  }
}

/**
 * 본인인증 성공 시 보여줄 뷰
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {Object} info
 * @returns
 */
function SuccessChangePhone({ info }) {
  return (
    <span>
      {info?.mobileVerified === 0 ? '본인 인증' : '번호 변경'}이 완료되었습니다.
    </span>
  );
}

/**
 * 이미 등록된 번호 일 때 보여줄 화면
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @returns
 */
function DuplicateChangePhone() {
  return <span>이미 등록된 번호입니다.</span>;
}

export { changePhoneEvent, SuccessChangePhone, DuplicateChangePhone };
