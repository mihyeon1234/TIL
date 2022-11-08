import axios from 'axios';

let HOST = 'http://localhost:10010'; // 'http://192.168.0.12:10010';
/**
 * 쿠키 httpOnly, secure 옵션 사용하기 위한 변수
 * 로컬 환경에서는 false, dev, master에서는 true
 * 작성자: 장다영
 * 업데이트: 2021.11.19
 * */
// eslint-disable-next-line import/no-mutable-exports
let COOKIE_OPTION = false;
if (process.env.NODE_ENV === 'production') {
  COOKIE_OPTION = true;
  if (!process.env.REACT_APP_MASTER) HOST = 'https://api.sellha.kr'; // dev 서버
  if (process.env.REACT_APP_MASTER) HOST = 'https://api2.sellha.kr'; // master 서버
}
const APP = 'sellha';
const ENTRY_POINT = `${HOST}/${APP}`;

export { ENTRY_POINT, COOKIE_OPTION };

export function checkDuplicatePhone(phone) {
  return axios
    .get(`${ENTRY_POINT}/duplicate-phone`, { params: { phone } })
    .then(({ data }) => !!data.isDuplicate);
}

export function sendCertifyEmail(email) {
  return axios
    .get(`${ENTRY_POINT}/send-certify-email?email=${email}`)
    .then((res) => res.data);
}

export function verifyCertifyEmail(code) {
  return axios
    .get(`${ENTRY_POINT}/verify-certify-email?code=${code}`)
    .then((res) => res.data);
}

export function localLogin(loginForm) {
  return axios
    .post(`${ENTRY_POINT}/local-login`, loginForm)
    .then((res) => res.data);
}

export function localRefresh() {
  return axios
    .get(`${ENTRY_POINT}/local-login/refresh`)
    .then((res) => res.data);
}

export function localDrop() {
  return axios.post(`${ENTRY_POINT}/local-drop`, {}).then((res) => res.data);
}

export function localInfo() {
  return axios.get(`${ENTRY_POINT}/local-info`).then((res) => res.data);
}

export function findEmail(name, phone) {
  return axios
    .post(`${ENTRY_POINT}/find-email`, { name, phone })
    .then((res) => res.data);
}

export function sendFindPassword(name, email) {
  return axios
    .post(`${ENTRY_POINT}/send-find-password`, { name, email })
    .then((res) => res.data);
}

// export function verifyFindPassword(password, code) {
//   return axios
//     .post(`${ENTRY_POINT}/verify-find-password?code=${code}`, { password })
//     .then((res) => res.data);
// }

// team
export function getTeam() {
  return axios.get(`${ENTRY_POINT}/team`).then((res) => res.data);
}

export function addTeam(body = {}) {
  return axios.post(`${ENTRY_POINT}/team`, body).then((res) => res.data);
}

// body = { teamCode }
export function requestJoinTeam(body = {}) {
  return axios
    .post(`${ENTRY_POINT}/request-join-team`, body)
    .then((res) => res.data);
}

// body = { userId, teamCode }
export function verifyJoinTeam(body = {}) {
  return axios
    .post(`${ENTRY_POINT}/verify-join-team`, body)
    .then((res) => res.data);
}

// body = { userId, teamId }
export function changeTeamAdmin(body = {}) {
  return axios
    .put(`${ENTRY_POINT}/change-team-admin`, body)
    .then((res) => res.data);
}

export function removeUserTeam(teamId, userId) {
  return axios
    .delete(`${ENTRY_POINT}/team/${teamId}/user/${userId}`)
    .then((res) => res.data);
}

export function removeTeam(teamId) {
  return axios.delete(`${ENTRY_POINT}/team/${teamId}`).then((res) => res.data);
}

export function getTip(pathName) {
  return axios.post(`${ENTRY_POINT}/tip`, { pathName }).then((res) => res.data);
}

// category
export function getChildsById(id) {
  return axios
    .get(`${ENTRY_POINT}/child-category?id=${id}`)
    .then((res) => res.data);
}

export function getCategoryBySearch(search) {
  return axios
    .get(`${ENTRY_POINT}/search-category?search=${search}`)
    .then((res) => res.data);
}

// keyword-search
export function getSearchHistory() {
  return axios.get(`${ENTRY_POINT}/search-history`).then((res) => res.data);
}

export function removeSearchHistory(historyId) {
  return axios
    .delete(`${ENTRY_POINT}/delete-history/${historyId}`)
    .then((res) => res.data);
}

export function getKeywordData(keyword) {
  return axios
    .get(`${ENTRY_POINT}/search-keyword?keyword=${encodeURIComponent(keyword)}`)
    .then((res) => res.data);
}

export function getKeywordChart(body) {
  return axios
    .post(`${ENTRY_POINT}/search-product`, body)
    .then((res) => res.data);
}

export function getSellData(body) {
  return axios.post(`${ENTRY_POINT}/store-sales`, body).then((res) => res.data);
}

// keyword-chart
export function getTotal(body) {
  return axios.post(`${ENTRY_POINT}/chart-total`, body).then((res) => res.data);
}

export function fetchChartData(body) {
  return axios
    .post(`${ENTRY_POINT}/chart-keyword`, body)
    .then((res) => res.data);
}

// category-main
export function getMainCategoryData(phase) {
  return axios
    .get(`${ENTRY_POINT}/category-main?phase=${phase}`)
    .then((res) => res.data);
}

// category-sub
export function getSubSummary() {
  return axios
    .get(`${ENTRY_POINT}/category-sub/summary`)
    .then((res) => res.data);
}

export function fetchSubCategory(body) {
  return axios
    .post(`${ENTRY_POINT}/category-sub`, body)
    .then((res) => res.data);
}

// insight
export function getContents(search, category) {
  return axios
    .get(`${ENTRY_POINT}/insight?search=${search}&category=${category}`)
    .then((res) => res.data);
}

export function getBootcamp(body = {}) {
  return axios
    .post(`${ENTRY_POINT}/insight/bootcamp`, body)
    .then((res) => res.data);
}

// monitoring

export function createFolder(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/folder`, body)
    .then((res) => res.data);
}

export function removeFolder(body) {
  return axios
    .delete(`${ENTRY_POINT}/monitoring/folder`, { data: body })
    .then((res) => res.data);
}

export function moveItem(body) {
  return axios
    .put(`${ENTRY_POINT}/monitoring/folder`, body)
    .then((res) => res.data);
}

export function editFolderName(body) {
  return axios
    .put(`${ENTRY_POINT}/monitoring/changeFolderName`, body)
    .then((res) => res.data);
}

export function getItems() {
  // item-card, folder 같이 옴
  return axios.get(`${ENTRY_POINT}/monitoring`).then((res) => res.data);
}

export function addItem(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/add`, body)
    .then((res) => res.data);
}

export function deleteItem(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/delete`, body)
    .then((res) => res.data);
}

export function fetchFavoriteItem(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/favorite`, body)
    .then((res) => res.data);
}

export function getItemDetail(pid) {
  return axios
    .get(`${ENTRY_POINT}/monitoring/product?pid=${pid}`)
    .then((res) => res.data);
}

export function fetchEditKeywords(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/rank/keyword`, body)
    .then((res) => res.data);
}

export function getTeamKeywords(pid) {
  return axios
    .get(`${ENTRY_POINT}/monitoring/rank/team?pid=${pid}`)
    .then((res) => res.data);
}

export function getRakingTable(pid, date, ex) {
  return axios
    .get(
      `${ENTRY_POINT}/monitoring/rank?pid=${pid}&date=${encodeURI(
        date,
      )}&ex=${ex}`,
    )
    .then((res) => res.data);
}

export function fetchSortingTable(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/rank/cell`, body)
    .then((res) => res.data);
}

export function fetchSortType(body) {
  return axios
    .patch(`${ENTRY_POINT}/monitoring/rank/sort/${body.pid}`, body)
    .then((res) => res.data);
}

export function fetchNoteData(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/rank/memo`, body)
    .then((res) => res.data);
}

export function fetchRankingAlarm(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/rank/alert`, body)
    .then((res) => res.data);
}

export function getReviewChart(pid) {
  return axios
    .get(`${ENTRY_POINT}/monitoring/review?pid=${pid}`)
    .then((res) => res.data);
}

export function getReviewDetail(pid, sortType, viewType, page) {
  return axios
    .get(
      `${ENTRY_POINT}/monitoring/review/list?pid=${pid}&sortType=${sortType}&option=${viewType}&page=${page}`,
    )
    .then((res) => res.data);
}

export function getReviewExcel(pid, startDate, endDate) {
  return axios
    .get(
      `${ENTRY_POINT}/monitoring/review/excel?pid=${pid}&startDate=${encodeURI(
        startDate,
      )}&endDate=${encodeURI(endDate)}`,
    )
    .then((res) => res.data);
}

export function getKeywordExcel(pid, startDate, endDate) {
  return axios
    .get(
      `${ENTRY_POINT}/monitoring/rank/excel?pid=${pid}&startDate=${encodeURI(
        startDate,
      )}&endDate=${encodeURI(endDate)}`,
    )
    .then((res) => res.data);
}

export function fetchReviewAlarm(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/review/alert`, body)
    .then((res) => res.data);
}

// keyword-review
/**
 * body = {
 *   teamId: number,
 *   projectType: string, // '중단 상태', '런칭 완료'
 *   projectName: string,
 *   mainKeyword: string,
 *   subKeywords: [string],
 *   progress: string,
 *   contents: string,
 *   managerNames: [string],
 *   closingDate: string, // '2021.07.14'
 *   files: [string] // 's3:url'
 * }
 */
export function addProject(body = {}) {
  return axios.post(`${ENTRY_POINT}/project`, body).then((res) => res.data);
}

export function getProject(teamId, search) {
  return axios
    .get(`${ENTRY_POINT}/project`, {
      params: {
        teamId,
        search,
      },
    })
    .then((res) => res.data);
}

export function removeProject(projectId) {
  return axios
    .delete(`${ENTRY_POINT}/project/${projectId}`)
    .then((res) => res.data);
}

// trend-monitoring
export function getTrend(keyword) {
  return axios
    .get(`${ENTRY_POINT}/trend`, {
      params: { keyword: encodeURIComponent(keyword) },
    })
    .then((res) => res.data);
}

export function getInstagram(keyword) {
  return axios
    .get(`${ENTRY_POINT}/trend/instagram`, {
      params: { keyword },
    })
    .then((res) => res.data);
}

export function getPinterest(keyword) {
  return axios
    .get(`${ENTRY_POINT}/trend/pinterest`, {
      params: { keyword },
    })
    .then((res) => res.data);
}

export function getRelatedData(keyword) {
  return axios
    .get(`${ENTRY_POINT}/title-analysis`, {
      params: { keyword: encodeURIComponent(keyword) },
    })
    .then((res) => res.data);
}

export function getRecommendData(combineTitle) {
  return axios
    .get(`${ENTRY_POINT}/recommended-keyword`, {
      params: { combineTitle },
    })
    .then((res) => res.data);
}

export function saveKeyword(body) {
  return axios
    .post(`${ENTRY_POINT}/save-keyword`, body)
    .then((res) => res.status);
}

export function getSaveKeyword() {
  return axios.get(`${ENTRY_POINT}/save-keyword`).then((res) => res.data);
}

export function removeKeyword(id) {
  return axios
    .delete(`${ENTRY_POINT}/delete-savekeyword/${id}`)
    .then((res) => res.data);
}

export function saveKCategory(body) {
  return axios
    .post(`${ENTRY_POINT}/save-category`, body)
    .then((res) => res.status);
}

export function getsaveKCategory() {
  return axios.get(`${ENTRY_POINT}/save-category`).then((res) => res.data);
}

export function removeCategory(id) {
  return axios
    .delete(`${ENTRY_POINT}/delete-saveCategory/${id}`)
    .then((res) => res.data);
}

export function searchStoreKeyword(body = {}) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/realtime`, body)
    .then((res) => res.data);
}

export function getRealtimeMonitoring() {
  return axios
    .get(`${ENTRY_POINT}/monitoring/realtime`)
    .then((res) => res.data);
}

export function removeRealtimeMonitoring(body) {
  return axios
    .post(`${ENTRY_POINT}/monitoring/delete/realtime`, body)
    .then((res) => res.data);
}
export function getAdultKeywordData(keyword) {
  return axios
    .get(`${ENTRY_POINT}/adult?keyword=${keyword}`)
    .then((res) => res.data);
}

export function combinationCheck(body) {
  return axios
    .post(`${ENTRY_POINT}/combination-check`, body)
    .then((res) => res.data);
}

export function synonymCheck(body) {
  return axios
    .post(`${ENTRY_POINT}/synonym-check`, body)
    .then((res) => res.data);
}

/**
 * 연관키워드에서 조회하기 눌렀을 때 즉시크롤링 사용
 * @param {String} keyword
 * @returns {JSON}
 * 작성자: 장다영
 * 업데이트: 2021.11.26
 */
export function getCategoryFullPath(keyword) {
  return axios
    .get(
      `${ENTRY_POINT}/category-fullPath?keyword=${encodeURIComponent(keyword)}`,
    )
    .then((res) => res.data);
}

export function keywordContent(body) {
  return axios
    .post(`${ENTRY_POINT}/keyword-content`, body)
    .then((res) => res.data);
}

export function getRelKeywordData(keyword) {
  return axios
    .get(
      `${ENTRY_POINT}/search-relKeyword?keyword=${encodeURIComponent(keyword)}`,
    )
    .then((res) => res.data);
}

export function deleteAccount() {
  return axios.delete(`${ENTRY_POINT}/local-drop`).then((res) => res.data);
}
