import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  justify-content: center;
  margin: auto;
  height: 100vh;
`;

export const FullBtn = styled.button`
  width: 100%;
  padding: 0.7em;
  margin-top: 1.5rem;
  border-radius: 0.3rem;
  font-size: 1.1em;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};

  &:focus,
  &:active {
    background-color: ${(props) => props.theme.colors.black};
  }
`;

export const EmptyBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.7em;
  border-radius: 0.3rem;
  font-size: 1.1em;
  text-align: center;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};

  :hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.orange};
  }
`;

export const FindInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 7em;
  font-size: 0.8rem;
`;
