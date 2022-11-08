import React from 'react';
import styled from 'styled-components';
import RecentList from './component/RecentList';
import SaveList from './component/SaveList';

function index() {
  return (
    <TableBox>
      <RecentList />
      <SaveList />
    </TableBox>
  );
}

export default index;

const TableBox = styled.div`
  display: flex;
  flex-direction: row;
`;
