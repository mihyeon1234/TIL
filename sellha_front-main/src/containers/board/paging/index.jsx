import React, { useState } from 'react';
import styled from 'styled-components';

function getSelectType(current, page) {
  if (current === page) {
    return 'select';
  }

  return 'deselect';
}

function PageItems({ current, setCurrent, page, setPage, total }) {
  return (
    <div>
      {page > 0 && (
        <PagingItem
          data-type="deselect"
          onClick={() => {
            setPage(page - 1);
            setCurrent((page - 1) * 5 + 1);
          }}
        >{`<<`}</PagingItem>
      )}
      {total >= page * 5 + 1 && (
        <PagingItem
          data-type={getSelectType(current, page * 5 + 1)}
          onClick={() => setCurrent(page * 5 + 1)}
        >
          {page * 5 + 1}
        </PagingItem>
      )}
      {total >= page * 5 + 2 && (
        <PagingItem
          data-type={getSelectType(current, page * 5 + 2)}
          onClick={() => setCurrent(page * 5 + 2)}
        >
          {page * 5 + 2}
        </PagingItem>
      )}
      {total >= page * 5 + 3 && (
        <PagingItem
          data-type={getSelectType(current, page * 5 + 3)}
          onClick={() => setCurrent(page * 5 + 3)}
        >
          {page * 5 + 3}
        </PagingItem>
      )}
      {total >= page * 5 + 4 && (
        <PagingItem
          data-type={getSelectType(current, page * 5 + 4)}
          onClick={() => setCurrent(page * 5 + 4)}
        >
          {page * 5 + 4}
        </PagingItem>
      )}
      {total >= page * 5 + 5 && (
        <PagingItem
          data-type={getSelectType(current, page * 5 + 5)}
          onClick={() => setCurrent(page * 5 + 5)}
        >
          {page * 5 + 5}
        </PagingItem>
      )}
      {Math.floor(total / 5) > page && (
        <PagingItem
          data-type="deselect"
          onClick={() => {
            setPage(page + 1);
            setCurrent((page + 1) * 5 + 1);
          }}
        >{`>>`}</PagingItem>
      )}
    </div>
  );
}

function Index() {
  const [current, setCurrent] = useState(1);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);

  return (
    <Container>
      <PageItems
        current={current}
        setCurrent={setCurrent}
        page={page}
        setPage={setPage}
        total={total}
        setTotal={setTotal}
      />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  & div {
    display: flex;
    flex-direction: row;
  }
`;

const PagingItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  user-select: none;

  &[data-type='select'] {
    background: #ffc83a;
    border: 1px solid #ffc83a;
    color: #fff;
    font-weight: bolder;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%), inset 0 1px 0 0 #ffc83a;
    border-radius: 5px;
  }

  &[data-type='deselect'] {
    color: rgba(0, 0, 0, 0.5);
  }
`;
