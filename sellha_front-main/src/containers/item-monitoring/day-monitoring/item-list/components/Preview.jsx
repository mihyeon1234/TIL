import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useDrag } from 'react-dnd';

import { setFolderId } from '../../reducer';
import { useSelectItemCard } from '../../hooks';

const Preview = ({ item, folder }) => {
  const dispatch = useDispatch();

  const { onClickMoveItems } = useSelectItemCard();

  const endDrag = async (card, monitor) => {
    const dropData = monitor.getDropResult();

    onClickMoveItems(card.item.product_id, dropData?.folderId || undefined);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'preview',
    item: { item },
    collect: (card) => ({
      isDragging: card.isDragging(),
    }),
    end: endDrag,
  }));

  return (
    <PreviewDiv ref={drag} isDragging={isDragging}>
      <ProductImg src={item.image_url} alt="product-img" />
      <ProductDiv>
        <ProductTitle>
          <TitleLink
            to={{
              pathname: `/monitoring/${item.product_id}`,
              state: item.product_id,
            }}
            onClick={() => dispatch(setFolderId(folder.id))}
          >
            {item.product_title}
          </TitleLink>
        </ProductTitle>
        <ProductKeywords>
          {item.keywords.slice(0, 3).map((keyword) => (
            <Ktag key={keyword.keyword}>{keyword.keyword}</Ktag>
          ))}
          {item.keywords.length > 3 && (
            <Ktag>+ {item.keywords.length - 3}</Ktag>
          )}
        </ProductKeywords>
      </ProductDiv>
    </PreviewDiv>
  );
};

export default Preview;

const PreviewDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;
  border-radius: 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  background: white;
  margin: 0 3px 5px 0;
  cursor: grab;
  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
`;

const ProductImg = styled.img`
  border-radius: 10px;
  margin-right: 10px;
  width: 35px;
  height: 35px;
`;

const ProductDiv = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProductTitle = styled.div`
  font-size: 0.8rem;
  width: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TitleLink = styled(Link)`
  :hover {
    color: ${({ theme }) => theme.colors.black};
    background: linear-gradient(to top, #ffd94f84 38%, transparent 35%);
  }
`;

const ProductKeywords = styled.div`
  display: flex;
  align-items: center;
`;

const Ktag = styled.div`
  font-size: 0.6rem;
  padding: 1px 6px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1.25em;
  margin: 3px 1px;
`;

// const DottedText = styled.span`
//   font-size: 0.6rem;
//   color: ${({ theme }) => theme.colors.darkGray};
// `;
