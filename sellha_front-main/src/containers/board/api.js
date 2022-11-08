import axios from 'axios';
import { ENTRY_POINT } from 'http-api';

// 게시글 목록 전체 가져오기 : query 빈값,
// 게시글 검색 : query에 search값 넣기
export function getForum(query) {
  return axios
    .get(`${ENTRY_POINT}/forum`, { params: query })
    .then((res) => res.data);
}

// 게시글 삭제(관리자만 가능_user isAdmin 값이 1)
export function deleteForum(id) {
  return axios.delete(`${ENTRY_POINT}/forum/${id}`).then((res) => res.data);
}

// 게시글 생성(관리자만 가능_user isAdmin 값이 1)
export function createForum(body) {
  return axios.post(`${ENTRY_POINT}/forum`, body).then((res) => res.data);
}
