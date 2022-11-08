import { combineReducers } from 'redux';
import user from 'redux/user';
import keywordSearch from 'containers/item-research/keyword-research/reducer';
import relatedKeyword from 'containers/item-research/keyword-research/related-keyword/reducer';
import keywordChart from 'containers/item-discover/popular/keyword/reducer';
import categorySub from 'containers/item-discover/popular/category/reducer';
import homeReview from 'containers/home/review/reducer';
import discover from 'containers/item-discover/category/reducer';
import contentResearch from 'containers/marketing-tools/contents-research/reducer';
import productNaming from 'containers/marketing-tools/product-name/reducer';
import dayMonitoring from 'containers/item-monitoring/day-monitoring/reducer';
import monitoringDetail from 'containers/item-monitoring/day-monitoring/item-detail/reducer';
import keywordMonitor from 'containers/item-monitoring/day-monitoring/item-detail/keyword/reducer';
import reviewMonitor from 'containers/item-monitoring/day-monitoring/item-detail/review/reducer';
import realtimeMonitoring from 'containers/item-monitoring/realtime-monitoring/reducer';
import project from 'containers/item-research/keyword-review/reducer';
import payment from 'containers/payment/reducer';
import findAccount from 'containers/member/pages/find-account/reducer';
import findPasswordResult from 'containers/member/pages/find-pw-result/reducer';

const rootReducer = combineReducers({
  user,
  keywordSearch,
  keywordChart,
  categorySub,
  homeReview,
  discover,
  dayMonitoring,
  monitoringDetail,
  keywordMonitor,
  reviewMonitor,
  realtimeMonitoring,
  project,
  payment,
  relatedKeyword,
  productNaming,
  contentResearch,
  findAccount,
  findPasswordResult,
});

export default rootReducer;
