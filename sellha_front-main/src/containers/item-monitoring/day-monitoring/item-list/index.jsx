import React from 'react';
import styled from 'styled-components';

import Spiner from 'components/spiner';

import AddCard from './components/AddCard';
import FolderCard from './components/FolderCard';
import ItemCard from './components/ItemCard';
import { useItemList, useSelectItemCard } from '../hooks';

const ItemList = ({ match }) => {
  const { list, folders, loading } = useItemList();
  const { onClickIcon } = useSelectItemCard();

  if (loading) {
    return (
      <LoadingDiv>
        <Spiner loading={loading} />
      </LoadingDiv>
    );
  }

  return (
    <Container>
      <ListContainer>
        {!match.params.folderName && (
          <>
            <AddCard />
            {folders?.map((folder) => (
              <FolderCard key={folder.id} folder={folder} match={match} />
            ))}
          </>
        )}
        {list?.map((item) => (
          <ItemCard
            key={item.product_id}
            item={item}
            folders={folders}
            onClickIcon={onClickIcon}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

export default ItemList;

const Container = styled.div`
  /* display: flex;
  flex-wrap: wrap;
  gap: 3.5em; */
  min-height: 63vh;
  margin: 1.2em 6.5em 9em;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 2.2rem;
  .tooltipCSS {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 22rem;
    font-size: 0.65rem;
    font-weight: 300;
    border-radius: 0.8rem;
    padding: 10px;
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
    }
    opacity: 1 !important;
  }
  @media ${(props) => props.theme.mobile} {
    display: flex;
    flex-direction: column;
    padding: 1em;
    margin: 0;
  }
`;

const LoadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;
