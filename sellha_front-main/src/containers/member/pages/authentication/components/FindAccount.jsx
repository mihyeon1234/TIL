import { verifyUser } from '../../api';
import { failedAlert, notFoundAccountAlert } from './Common';

/**
 * 본인인증 후 DB에 user정보 체크
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name
 * @param {String} phone
 */
async function verifyUserInfo({ name, phone }) {
  try {
    // 비밀번호 찾기 페이지에서 입력한 이메일 값 가져오기
    const inputEmail = window.opener.document.getElementById('email').value;
    // 입력받은 이메일과 본인인증 값이 DB에 있는 user 정보인지 확인
    const { vailed } = await verifyUser({
      email: inputEmail,
      name,
      phone,
    });

    // 회원 정보가 있으면
    if (vailed) {
      // 비밀번호 변경하기로 이동
      window.opener.location = `/member/findpwresult?email=${inputEmail}&phone=${phone}`;
    } else {
      // 알림창 띄워주고 회원가입으로 이동
      notFoundAccountAlert('/member/signup');
    }
  } catch {
    failedAlert('본인인증 실패');
  }
}

/**
 * 아이디, 비밀번호 찾기 관련 이벤트
 * 작성자: 장다영
 * 업데이트: 2022.07.27
 * @param {String} name
 * @param {String} email
 * @param {String} phone
 */
async function FindAccountEvent({ name, email, phone }) {
  // 탭을 구분하기 위해 부모의 주소를 받아옴
  const parentParam = new URLSearchParams(window.opener.location.search);
  // 탭 값
  const tab = parentParam.get('tab');
  // 비밀번호 찾기 탭
  const passwordTab = tab * 1 === 2;

  // 본인인증 완료 시
  if (name && email) {
    parentParam.set('name', name);
    parentParam.set('phone', phone);
    parentParam.set('email', email);
    parentParam.set('result', tab);

    // 비밀번호 찾기 탭
    if (passwordTab) {
      await verifyUserInfo({ name, phone });
    } else {
      // 아이디 찾기 탭
      window.opener.location.search = parentParam.toString();
    }

    window.self.close();
  }
  // 본인인증 실패 시
  else {
    // 알림창 띄워주고 회원가입으로 이동
    notFoundAccountAlert('/member/signup');
  }
}

export { FindAccountEvent, verifyUserInfo };
