import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import './react-datepicker.css';

import { getRakingTable } from 'http-api';
import { fetchTable, setSort, setTable, unsetTable } from './reducer';

import KeywordEdit from './edit';
import KeywordAlarm from './alarm';
import KeywordRanking from './ranking';

export default function index() {
  const dispatch = useDispatch();

  const { selectItem } = useSelector((state) => state.monitoringDetail);

  const asyncRakingTable = async () => {
    dispatch(fetchTable());
    try {
      const { result } = await getRakingTable(
        selectItem.product_id,
        selectItem.add_date,
        selectItem.member_id === -111 ? 1 : 0,
      );
      dispatch(setTable(result));
      dispatch(setSort(selectItem.sort_type));
    } catch (error) {
      dispatch(unsetTable());
    }
  };

  useEffect(() => {
    if (selectItem.product_id) {
      asyncRakingTable();
    }
    return () => {
      dispatch(unsetTable());
    };
  }, []);

  return (
    <Container>
      <KeywordEdit asyncRakingTable={asyncRakingTable} />
      <KeywordAlarm />
      <KeywordRanking asyncRakingTable={asyncRakingTable} />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 0.5em;
  animation: fadein 2s;
  -moz-animation: fadein 2s; /* Firefox */
  -webkit-animation: fadein 2s; /* Safari and Chrome */
  -o-animation: fadein 2s; /* Opera */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadein {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadein {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .tooltipCSS-keyword {
    display: flex;
    flex-direction: column;
    min-width: 20em;
    max-width: 26em;
    font-size: 0.75em;
    font-weight: 300;
    border-radius: 1em;
    padding: 10px;
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
    }
  }
`;
