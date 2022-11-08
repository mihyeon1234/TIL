/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
// >>>>>>>>>>>>>>>> GA TEST
import ReactGA from 'react-ga';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>
import { getForum, deleteForum, createForum } from './api';
import BoardTable from './board-table/index';
// import Paging from './paging/index';
import BoardTitle from './title/index';

const tableData = [
  {
    content: '',
    createAt: '',
    forumType: '',
    id: '',
    title: '',
    updateAt: '',
    userId: '',
  },
];

async function setTableData(getTableData, data) {
  await createForum(data);
  getTableData();
}

async function deleteOne(selectId, getTableData, itemId) {
  if (selectId) {
    await deleteForum(selectId);
    document.getElementById(itemId).remove();
    getTableData();
  }
}

function WriteModal({ setModalOpen, getTableData }) {
  return (
    <Write>
      <div>
        <div>
          <span>글쓰기</span>
          <ModalClose onClick={() => setModalOpen(false)}>&#10006;</ModalClose>
        </div>
        <input type="text" placeholder="제목" id="title" />
        <textarea placeholder="내용" id="content" />
        <div data-type="buttonView">
          <input
            type="button"
            value="저장"
            onClick={() => {
              const title = document.getElementById('title').value;
              const noticeContent = document.getElementById('content').value;
              setTableData(getTableData, {
                postType: '공지',
                postTitle: title,
                content: noticeContent,
              });

              setModalOpen(false);
            }}
          />
          <input
            type="button"
            value="취소"
            onClick={() => setModalOpen(false)}
          />
        </div>
      </div>
    </Write>
  );
}

function Index() {
  const [noticeData, setNoticeData] = useState(tableData);
  const [selectId, setSelectId] = useState();
  const [itemId, setItemId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  async function getTableData() {
    const result = await getForum();
    setNoticeData(result);
  }

  useEffect(() => {
    document.title = `셀링하니`;
    // >>>>>>>>>>>>>>>>>>>> GA TEST
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    getTableData();
  }, []);

  return (
    <Container>
      <BoardTitle setNoticeData={setNoticeData} setSelectId={setSelectId} />
      <BoardTable
        noticeData={noticeData}
        setSelectId={setSelectId}
        setItemId={setItemId}
      />
      {user.isAdmin === 1 && (
        <WriteContainer>
          <ButtonStyle onClick={() => setModalOpen(!modalOpen)}>
            <span>글쓰기</span>
          </ButtonStyle>
          <ButtonStyle
            onClick={() => {
              deleteOne(selectId, getTableData, itemId);
              setItemId('');
              setSelectId('');
            }}
          >
            <span>삭제</span>
          </ButtonStyle>
        </WriteContainer>
      )}
      {modalOpen && (
        <WriteModal
          setModalOpen={setModalOpen}
          // eslint-disable-next-line react/jsx-no-bind
          getTableData={getTableData}
        />
      )}
      {/* <Paging /> */}
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 6.5em;
  min-height: 63vh;
`;

const WriteContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonStyle = styled.button`
  width: 4rem;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.orange};
  border-radius: 1em;
  font-size: 0.9em;
  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    color: ${(props) => props.theme.colors.orange};
    background: none;
  }
  margin-left: 0.5em;
`;

const Write = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;

  > div {
    width: 600px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 15px 30px;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
      user-select: none;
    }

    input[type='text'] {
      border: unset;
      border-bottom: 1px solid #7f7f7f;
      height: 35px;
      margin-bottom: 15px;

      &:focus {
        border-bottom: 1px solid #ffda4f;
      }
    }

    textarea {
      resize: none;
      ${'' /* border: 1px solid #7f7f7f; */}
      background-color: rgba(255,218,79,0.1);
      border: unset;
      width: 100%;
      height: 230px;
      padding: 10px 15px;

      &::placeholder {
        color: #7f7f7f;
      }

      &:focus {
        outline: none;
      }
    }

    div[data-type='buttonView'] {
      justify-content: flex-end;
      font-size: unset;
      font-weight: unset;
      margin-top: 10px;

      input[type='button'] {
        padding: 5px 10px;
        border-radius: 5px;

        :first-child {
          background-color: #ffda4f;
          border: 1px solid #ffda4f;
          margin-right: 10px;
          &:hover {
            background-color: #7f7f7f;
            border: 1px solid #7f7f7f;
          }
        }

        :last-child {
          border: 1px solid #ffda4f;
          color: #ffda4f;
          background-color: unset;
          &:hover {
            border: 1px solid #7f7f7f;
            color: #7f7f7f;
          }
        }
      }
    }
  }
`;

const ModalClose = styled.span`
  :hover {
    cursor: pointer;
    color: #ffda4f;
  }
`;
