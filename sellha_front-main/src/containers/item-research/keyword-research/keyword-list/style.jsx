import styled from 'styled-components';
import { Button } from 'antd';

export const RecentDiv = styled.div`
  margin: 3em 1.5em;
  width: 48%;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0.5em;
  }
`;

export const RecentTitle = styled.div`
  /* width: 6.5em; */
  font-size: 1.1em;
  font-weight: 600;
  /* font-size: 15px; */
  /* font-weight: 600; */
  height: 55px;
  line-height: 55px;
  @media ${(props) => props.theme.mobile} {
    margin-left: 10px;
  }
`;

export const TableDiv = styled.div`
  width: 100%;
  height: 464px;
  position: relative;
  border-radius: 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1em 1.5em 2em 1.5em;
  .ant-list-split .ant-list-header {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray};
    padding: 0.2em 0;
  }

  @media ${(props) => props.theme.mobile} {
    border-radius: 15px;
    padding: 0;
  }
`;

export const SCard = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  height: 3.2em;
  padding: 0px 1.4em;
  border: none;
  border-bottom: 0.025em solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.85em;
  &:hover {
    cursor: pointer;
    font-weight: 600;
  }

  @media ${(props) => props.theme.mobile} {
    .ant-card-body {
      width: 100%;
      padding: 0 !important;
      justify-content: space-between;
    }
  }
`;

export const SaveButtonHead = styled.div`
  width: 10%;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

export const RecentKeyword = styled.div`
  width: 25%;
  padding: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.mobile} {
    width: 30%;
  }
`;

export const RecentCompete = styled.div`
  width: 15%;
  padding: 0 15px;
`;

export const RecentSearchAmount = styled.div`
  width: 20%;
  padding: 0 15px;
  text-align: right;
  @media ${(props) => props.theme.mobile} {
    width: 30%;
  }
`;

export const RecentProductAmount = styled.div`
  width: 20%;
  padding: 0 15px;
  text-align: right;
  @media ${(props) => props.theme.mobile} {
    width: 30%;
  }
`;

export const DeleteButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  color: ${(props) => props.theme.colors.gray};
  background-color: transparent;
  border: none;
  box-shadow: none;

  :hover {
    color: ${(props) => props.theme.colors.darkGray};
    background-color: transparent;
  }
  @media ${(props) => props.theme.mobile} {
    padding: 0;
    margin-right: -10px;
  }
`;
