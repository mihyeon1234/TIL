import axios from 'axios';
import { ENTRY_POINT } from 'http-api';

export async function getPayId(body) {
  const res = await axios.post(`${ENTRY_POINT}/pay`, body);
  return res.data;
}

export function cancelPayment() {
  return axios.post(`${ENTRY_POINT}/pay/cancel`, {}).then((res) => res.data);
}

export function changePayment(body) {
  return axios.post(`${ENTRY_POINT}/pay/change`, body).then((res) => res.data);
}

export function completePayment(body) {
  return axios.post(`${ENTRY_POINT}/pay/complete`, body);
}
