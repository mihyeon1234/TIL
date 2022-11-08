// import React from 'react';
// import styled from 'styled-components';
import Swal from 'sweetalert2';

/**
 * 성공시 텍스트만 나왔다 사라지는 alert(임시)
 * 사이즈 임의 입력, 필요한 사이즈 있다면 추가 입력
 * alert 디자인 변경 가능
 * 작성자: 장다영
 * 업데이트: 2022.04.19
 * @param {String} text
 * @param {String} type
 */
export function onlyTextAlert(data) {
  let size = 0;
  let icon = '';

  switch (data.widthSize) {
    case 0:
      size = 300;
      break;
    case 1:
      size = 500;
      break;
    default:
      size = 300;
      break;
  }

  switch (data.type) {
    case 'success':
      icon = '✅';
      break;
    case 'warning':
      icon = '⚠️';
      break;
    default:
      icon = '';
      break;
  }

  Swal.fire({
    html: `${icon} ${data.text}`,
    width: size,
    timer: 1000,
    showConfirmButton: false,
  });
}

export async function okCancelAlert(data) {
  const res = await Swal.fire({
    title: data.title,
    html: data.text,
    confirmButtonText: '확인',
    showCancelButton: true,
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    }
    return false;
  });

  return res;
}

export async function onlyOkAlert(data) {
  const res = await Swal.fire({
    title: data.title,
    html: data.text,
    confirmButtonText: '확인',
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    }
    return false;
  });

  return res;
}

export async function wrongApproachAlert() {
  const res = await onlyOkAlert({
    title: '',
    text: '올바른 접근이 아닙니다.',
  }).then((value) => value);

  return res;
}
