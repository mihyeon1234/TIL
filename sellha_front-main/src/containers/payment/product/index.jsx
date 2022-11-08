import React from 'react';
import styled from 'styled-components';
import ProductBackgroundImage from 'assets/images/pay-product-background.png';
import Item from './item/index';

function Index() {
  return (
    <Container>
      <ProductContainer>
        <Item />
      </ProductContainer>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  min-height: 285px;
  min-width: 780px;
  margin-top: 5%;
  background-image: url(${ProductBackgroundImage});
  background-repeat: no-repeat;
  background-size: 780px;
  background-position: center;
  @media ${(props) => props.theme.mobile} {
    background: unset;
  }
`;
