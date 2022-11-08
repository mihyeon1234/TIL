const SET_DATA = 'PAY_SET_DATA';
const UNSET_DATA = 'PAY_UNSET_DATA';
const FAIL_DATA = 'PAY_FAIL_DATA';

// actions
// export const setData = (data) => ({
//   type: SET_DATA,
//   payload: data,
// });
export function setData(data) {
  return { type: SET_DATA, payload: data };
}
export const unsetData = () => ({ type: UNSET_DATA });
export const failData = () => ({ type: FAIL_DATA });

const initialState = {
  stepPayPid: [773, 731],
  productData: [
    {
      title: '꿀벌셀러',
      price: '9,900원',
      experience: true,
      lid: [605, 555],
    },
    {
      title: '중벌셀러',
      price: '18,900원',
      experience: false,
      lid: [606, 556],
    },
    {
      title: '왕벌셀러',
      price: '78,900원',
      experience: false,
      lid: [607, 557],
    },
  ],
  buttonText: ['구독하기', '변경하기', '취소하기', '14일 무료 체험'],
  planId: '',
  productId: '',
  orderId: '',
  product: '',
  experience: false,
};

const keywordSearchReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...prevState,
        success: true,
        ...action.payload,
      };
    default:
      return prevState;
  }
};

export default keywordSearchReducer;
