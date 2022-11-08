import axios from 'axios';
import { ENTRY_POINT } from 'http-api';

export function getAuthUserPhone() {
  return axios
    .get(`${ENTRY_POINT}/auth-user/phone`)
    .then((res) => res.data.result);
}

export function getAuthUser() {
  return axios.get(`${ENTRY_POINT}/auth-user`).then((res) => res.data.result);
}

export function changePassword(body) {
  return axios
    .post(`${ENTRY_POINT}/change-password`, body)
    .then((res) => res.data);
}
