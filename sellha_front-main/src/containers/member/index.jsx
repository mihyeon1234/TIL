import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import LoginPage from './pages/login/index';
import SignupPage from './pages/signup';
import FindAccount from './pages/find-account/index';
import FindpwResultPage from './pages/find-pw-result/index';
import VerifyCertifyEmailPage from './pages/certify-email';

export default function MemberPage() {
  const routeMatch = useRouteMatch();

  return (
    <Suspense fallback={<></>}>
      <Switch>
        <Route
          exact
          path={`${routeMatch.path}/signup`}
          component={SignupPage}
        />
        <Route exact path={`${routeMatch.path}/login`} component={LoginPage} />
        <Route
          exact
          path={`${routeMatch.path}/findaccount`}
          component={FindAccount}
        />
        <Route
          exact
          path={`${routeMatch.path}/findpwresult`}
          component={FindpwResultPage}
        />
        <Route
          exact
          path={`${routeMatch.path}/certifyemail`}
          component={VerifyCertifyEmailPage}
        />
        {/* member 포함하는 없는 경로에서 아무것도 안나와서 랜딩페이지로 리다이렉트 되도록 수정 */}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
