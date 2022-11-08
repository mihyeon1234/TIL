import React from 'react';
import { Route } from 'react-router-dom';

import MainTitle from './components/MainTitle';
import ItemList from './item-list';
import ItemDetail from './item-detail';

const index = ({ match }) => (
  <>
    <MainTitle />
    <Route exact path={match.path} component={ItemList} />
    <Route exact path={`${match.path}/:pid`} component={ItemDetail} />
    <Route
      exact
      path={`${match.path}/folder/:folderName`}
      component={ItemList}
    />
  </>
);

export default index;
