import React from 'react';

import { FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Category = () => {
  const { category } = useSelector((state) => state.relatedKeyword);

  return (
    <SearchDiv>
      {category.map((element, index) => (
        <CategoryTitle key={element}>
          <CategoryItem>{element}</CategoryItem>
          {category.length === 3 && index < 2 && (
            <FaChevronRight size={16} color="#EBEBEB" />
          )}
          {category.length === 4 && index < 3 && (
            <FaChevronRight size={16} color="#EBEBEB" />
          )}
        </CategoryTitle>
      ))}
    </SearchDiv>
  );
};

export default Category;

const SearchDiv = styled.div`
  display: flex;
  margin-left: 0.8em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 1em;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  /* background: linear-gradient(to top, #ffda4f80 30%, transparent 30%); */
`;

const CategoryItem = styled.span`
  margin-left: 0.5em;
`;
