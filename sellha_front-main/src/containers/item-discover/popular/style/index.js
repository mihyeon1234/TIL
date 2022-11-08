import styled from 'styled-components';

export const TagDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  padding: 0 1em;
  margin-right: 1em;
`;

export const StateTag = styled.span`
  background-color: none;
  font-weight: 500;
  font-size: 1em;

  &[data-type='default'] {
    color: #000000;
  }

  &[data-type='bad'] {
    color: #fa7f7f;
  }

  &[data-type='normal'] {
    color: #7ee0ff;
  }

  &[data-type='good'] {
    color: #ffd01c;
  }
`;

export const DetailData = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.darkGray};
`;
