import React, { Suspense } from 'react';
import styled from 'styled-components';

// import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { Layout } from 'antd';
import 'animate.css';

import { retryLazy } from 'utils/lazy';

import CustomSider from 'components/sider';
// import CustomDrawer from 'components/drawer';
import CustomHeader from 'components/header';
import CustomFooter from 'components/footer';
import useWindowSize from 'hooks/useWindowSize';
// not found 페이지
// import NotFound from 'containers/notfound';
import PreParePage from 'containers/preparing';

import TopContent from '../components/notice';

const { Content } = Layout;

const MyPage = retryLazy(() => import('containers/member/my-page/index'));
const PaymentPage = retryLazy(() => import('./payment/index'));

const HomePage = retryLazy(() => import('./home'));
const DiscoverPage = retryLazy(() => import('./item-discover'));
const KeywordPage = retryLazy(() => import('./item-research/keyword-research'));
const MonitoringPage = retryLazy(() =>
  import('./item-monitoring/day-monitoring'),
);
const RealTimeMonitoring = retryLazy(() =>
  import('./item-monitoring/realtime-monitoring'),
);
const ReviewPage = retryLazy(() => import('./item-research/keyword-review'));
const OrderPage = retryLazy(() => import('./payment/order/index'));
const SourcingPage = retryLazy(() => import('./item-soucing'));
const InsightPage = retryLazy(() => import('./seller-view/insight'));
const BoardPage = retryLazy(() => import('./board/index'));

const FullpagePage = retryLazy(() => import('./agency/full-page'));
const LogisticsPage = retryLazy(() => import('./agency/logistics'));
const CSPage = retryLazy(() => import('./agency/CS'));

const RelatedKeywordPage = retryLazy(() =>
  import('./item-research/keyword-research/related-keyword'),
);
const ProductName = retryLazy(() => import('./marketing-tools/product-name'));

// const AiPage = lazy(() => import('./marketing-tools/ai-research'));
const ContentsPage = retryLazy(() =>
  import('./marketing-tools/contents-research'),
);
const DeleteAccount = retryLazy(() =>
  import('containers/member/my-page/delete-account'),
);
// const PediaPage = lazy(() => import('./seller-view/pedia'));

/**
 * 로그인했을 때만 보여줄 페이지
 * 존재하지 않는 경로는 랜딩페이지로 redirect
 * 작성자: 장다영
 * 업데이트: 2021.12.02
 * @returns {Object}
 */
function LoginRoute() {
  // refresh 만료 상태인지 체크 및 로그아웃 체크
  const expire = JSON.parse(localStorage.getItem('expire'));
  // 사용중인 경로인지 체크
  const match = useRouteMatch([
    '/mypage',
    '/discover',
    '/keyword',
    '/review',
    '/title',
    '/productname',
    '/ai',
    '/contents',
    '/monitoring',
    'realtimemonitoring',
    '/pedia',
    '/payment/order',
    '/insight',
    '/privacy',
    '/agree',
    '/realtimemonitoring',
    '/deleteaccount',
  ]);

  return (
    <Switch>
      {/* TODO: 다시 사용 필요! */}
      {match?.isExact && expire && (
        <Redirect
          to="/member/login"
          render={alert(
            '🔐 로그인이 필요한 페이지 입니다. 로그인 화면으로 이동합니다.',
          )}
        />
      )}
      <Route exact path="/mypage" component={MyPage} />
      <Route exact path="/discover" component={DiscoverPage} />
      <Route path="/keyword" component={KeywordPage} />
      <Route exact path="/review" component={ReviewPage} />
      <Route exact path="/title" component={RelatedKeywordPage} />
      <Route exact path="/productname" component={ProductName} />
      <Route exact path="/ai" component={PreParePage} />
      <Route exact path="/contents" component={ContentsPage} />
      <Route path="/monitoring" component={MonitoringPage} />
      <Route exact path="/realtimemonitoring" component={RealTimeMonitoring} />
      <Route exact path="/pedia" component={PreParePage} />
      <Route exact path="/payment/order" component={OrderPage} />
      <Route exact path="/insight" component={InsightPage} />
      <Route
        exact
        path="/deleteaccount"
        key="/deleteaccount"
        component={DeleteAccount}
      />
      <Redirect to="/" />
    </Switch>
  );
}

function index() {
  const windowSize = useWindowSize();

  return (
    <Layout style={{ minHeight: '100vh', background: '#FFDA4F' }}>
      {windowSize.width < 1050 && <CustomHeader />}
      {windowSize.width >= 1050 && <CustomSider />}

      <SContent>
        {window.location.pathname.indexOf('/payment') < 0 && <TopContent />}
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/sourcing" component={SourcingPage} />
            <Route exact path="/fullpage" component={FullpagePage} />
            <Route exact path="/cs" component={CSPage} />
            <Route exact path="/logistics" component={LogisticsPage} />
            <Route exact path="/board" component={BoardPage} />
            <LoginRoute />
          </Switch>
        </Suspense>
        <CustomFooter />
      </SContent>
    </Layout>
  );
}

export default index;

const SContent = styled(Content)`
  min-height: 100vh;
  background-color: white;
  border-radius: 50px 0 0 50px;
  /* padding: 0.8em; */
  /* padding-right: 10%; */

  @media ${(props) => props.theme.desktop} {
    padding-right: 0;
  }

  @media ${(props) => props.theme.tablet} {
    border-radius: 0;
    padding-right: 0;
  }
`;
