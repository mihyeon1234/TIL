import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getSaveKeyword, getsaveKCategory } from 'http-api';
import { setSaveBucket } from 'redux/user';
import { getForum } from '../containers/board/api';
import SaveBucket from './bucket';

function Index() {
  const { id } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [notice, setNotice] = useState();
  const [visible, setVisible] = useState(false);

  // 최초 한번만 키워드 통 키워드 리스트 불러오기
  useEffect(async () => {
    if (id) {
      try {
        const saveKeywords = await getSaveKeyword();
        const saveCategory = await getsaveKCategory();
        dispatch(setSaveBucket(saveKeywords, saveCategory));
      } catch (error) {
        // history.push('/error');
      }
    }
  }, [id]);

  useEffect(() => {
    const getBoardData = async () => {
      try {
        const result = await getForum();
        setNotice(result[0].title);
      } catch {
        setNotice('-');
      }
    };
    getBoardData();
  }, []);

  return (
    <Container id="notice" path={window.location.pathname}>
      <TopDiv path={window.location.pathname}>
        <NoticeContainer onClick={() => history.push('/board')}>
          <NoticeTitle>{notice && `[공지] ${notice}`}</NoticeTitle>
          {/* <DateText>{notice && getDate(notice.createAt)}</DateText> */}
        </NoticeContainer>
        <NoticeButtonContainer>
          <SubscribeButton
            onClick={() => {
              setVisible((prev) => !prev);
            }}
          >
            <span>🍯</span>
            <ButtonTitle>키워드통</ButtonTitle>
            <DashedLine />
          </SubscribeButton>
          <SubscribeButton onClick={() => history.push('/payment')}>
            <span>🎁</span>
            <ButtonTitle>구독권 소개</ButtonTitle>
            <DashedLine />
          </SubscribeButton>
          <SubscribeButton
            onClick={() => {
              window.open(
                'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
              );
            }}
            onKeyPress={() => {
              window.open(
                'https://malanghoney.notion.site/d8251cdb398e46888f2cb82191562eb1',
              );
            }}
          >
            <span>📒</span>
            <ButtonTitle>셀하 사용법</ButtonTitle>
          </SubscribeButton>
        </NoticeButtonContainer>
      </TopDiv>
      <SaveBucket visible={visible} setVisible={setVisible} />
    </Container>
  );
}

export default Index;

const Container = styled.div`
  padding: 2em 6.5em;
  border-radius: 3.5em 0 0 0;
  background-color: ${(props) =>
    props.path === '/' ? '#f9f2df' : props.theme.colors.white};
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0.6em 1em;

  border-bottom: 1px solid
    ${(props) =>
      props.path === '/' ? '#d9d5cf7a' : props.theme.colors.lightGray};
`;

const RowView = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  user-select: none;
`;

const NoticeContainer = styled(RowView)`
  :hover {
    cursor: pointer;
  }
`;

const NoticeTitle = styled.span`
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${(props) => props.theme.mobile} {
    margin-right: 10px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NoticeButtonContainer = styled(RowView)`
  & img {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50px;
    padding: 5px;
    width: 2.4em;
    height: auto;
  }
  & img:hover {
    cursor: pointer;
    background-color: #fce07d;
    /* background-color: #7f7f7f; */
  }
`;

// const DateText = styled.span`
//   color: ${(props) => props.theme.colors.darkGray};
//   /* margin-left: 1rem; */
//   font-size: 0.75rem;
//   @media ${(props) => props.theme.mobile} {
//     display: none;
//   }
// `;

const SubscribeButton = styled.button`
  padding: 0.15rem 0.4rem;
  /* border: 1px solid #ffda4f9e; */
  background-color: transparent;
  border-radius: 0.5rem;
  :hover,
  :focus {
    background-color: transparent;
  }
  /* ::after {
    content: '|';
    margin: 0.5rem;
  } */
`;

const ButtonTitle = styled.span`
  font-size: 0.85rem;
  margin-left: 0.2rem;
  :hover {
    font-weight: 600;
  }
`;

const DashedLine = styled.span`
  border-left: 1px solid #ebebeb;
  margin-left: 0.5rem;
`;
