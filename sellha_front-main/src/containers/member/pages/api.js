import axios from 'axios';
import { ENTRY_POINT } from 'http-api';

export function findPassword(body) {
  return axios
    .post(`${ENTRY_POINT}/find-password`, body)
    .then((res) => res.data);
}

export function localSignup(signupForm) {
  return axios
    .post(`${ENTRY_POINT}/local-signup`, signupForm)
    .then((res) => res.data);
}

export function changePhoneNum(body) {
  return axios
    .post(`${ENTRY_POINT}/change-phone-number`, body)
    .then((res) => res.data);
}

export function verifyUser(body) {
  return axios.post(`${ENTRY_POINT}/verify-user`, body).then((res) => res.data);
}

export function checkDuplicateEmail(email) {
  return axios
    .get(`${ENTRY_POINT}/duplicate-email`, { params: { email } })
    .then(({ data }) => !!data.isDuplicate);
}
