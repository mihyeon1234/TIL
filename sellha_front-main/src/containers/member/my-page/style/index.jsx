import styled from 'styled-components';

const MyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 5px;
`;

const InfoTitle = styled.div`
  margin-bottom: 15px;
  font-size: 1.5em;
  font-weight: 500;
  border-bottom: 2px solid ${(props) => props.theme.colors.lineGray};

  @media ${(props) => props.theme.mobile} {
  }
`;

const PublicBtn = styled.button`
  min-width: 4.2em;
  height: 40px;
  padding: 0 15px;
  line-height: 27px;
  background: none;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 5px;

  &[data-type='canceled'] {
    background: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.orange};

    &:hover:enabled {
      background: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
    }
  }

  &[data-type='black'] {
    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.black};

    &:hover:enabled {
      background: ${(props) => props.theme.colors.orange};
      color: ${(props) => props.theme.colors.white};
    }
  }

  &:focus:enabled,
  &:active:enabled {
    background: none;
  }

  &:hover:enabled {
    background: none;
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.orange};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const UnderlineBtn = styled.button`
  text-decoration: underline;
  font-size: 0.8rem;
  background: none;
  color: ${(props) => props.theme.colors.darkGray};

  @media ${(props) => props.theme.mobile} {
    display: none;
  }

  &:focus:enabled,
  &:active:enabled {
    background: none;
  }

  &:hover:enabled {
    background: none;
    text-decoration: underline;
    color: ${(props) => props.theme.colors.orange};
  }
`;

const TeamInfoText = styled.span`
  font-size: 0.8rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
`;

const ContentTitle = styled.div`
  min-width: 8em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const Content = styled.div`
  min-width: 105px;
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const InfoText = styled.span``;

const CertifyText = styled.span`
  font-size: 0.72rem;
  color: ${({ theme, mobileVerified }) =>
    mobileVerified ? theme.colors.blue : theme.colors.danger};
  margin-left: 10px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export {
  InfoTitle,
  PublicBtn,
  UnderlineBtn,
  InfoRow,
  ContentTitle,
  Content,
  InfoText,
  CertifyText,
  MyInfoDiv,
  ContentDiv,
  TeamInfoText,
  ButtonDiv,
};
