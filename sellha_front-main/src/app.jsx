import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './app.less';

import PrivacyPage from 'containers/policy/privacy';
import AgreePage from 'containers/policy/agree';
import MemberService from 'containers/member';
import AuthReturnPage from 'containers/member/pages/authentication/index';
import interceptorComponent from 'components/interceptors';
import ScrollToTop from 'utils/scrollToTop';

const AppService = lazy(() => import('./containers'));

export default function App() {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  interceptorComponent();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<></>}>
        <Switch>
          {(!user.id || user.message) && (
            <Route path="/member" component={MemberService} />
          )}
          <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/agree" component={AgreePage} />
          <Route exact path="/authentication" component={AuthReturnPage} />
          {/* <ScrollToTop /> */}
          <Route component={AppService} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
