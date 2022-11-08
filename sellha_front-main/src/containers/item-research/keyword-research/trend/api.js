import axios from 'axios';
import { ENTRY_POINT } from 'http-api';

export async function trendCheck(keyword) {
  const res = await axios.get(
    `${ENTRY_POINT}/trend-check?keyword=${encodeURIComponent(keyword)}`,
  );
  return res.data;
}

export async function getTrendFeedData(keyword) {
  const res = await axios.get(
    `${ENTRY_POINT}/trend?keyword=${encodeURIComponent(keyword)}`,
  );
  return res.data;
}
