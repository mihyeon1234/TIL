/* eslint-disable import/prefer-default-export */
const filterDate = [
  {
    id: 1,
    filter: '오늘',
  },
  {
    id: 2,
    filter: '3일',
  },
  {
    id: 3,
    filter: '1주일',
  },
  {
    id: 4,
    filter: '1개월',
  },
  {
    id: 5,
    filter: '3개월',
  },
  /*
   * NOTE: 1년 필터 없는 것으로 임시 처리
   */
  // {
  //   id: 6,
  //   filter: '1년',
  // },
  { id: 7, filter: '초기화' },
];

const scoreLabel = [
  { label: '1점 리뷰', value: '1' },
  { label: '2점 리뷰', value: '2' },
  { label: '3점 리뷰', value: '3' },
  { label: '4점 리뷰', value: '4' },
  { label: '5점 리뷰', value: '5' },
];

export { filterDate, scoreLabel };
