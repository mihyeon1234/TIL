import React from 'react';
import styled from 'styled-components';

function getYYMMDD(date) {
  const yymmdd = date.split(' ');
  return yymmdd[0];
}

function setNoticeContent(e, data, index, setItemId, setSelectId) {
  if (document.getElementById(`noticeContent${index}`)) {
    // 클릭시 내용 보여지고 있으면 내용 삭제
    document.getElementById(`noticeContent${index}`).remove();
    setItemId('');
    setSelectId('');
  } else {
    // 선택된 아이템 다음에 추가할 tr 생성
    const contentTr = document.createElement('tr');
    contentTr.id = `noticeContent${index}`;
    contentTr.dataset.open = true;
    contentTr.className = 'noticeOpen';
    setItemId(`noticeContent${index}`);

    // tr안 td 생성
    const contentTd = document.createElement('td');
    contentTd.colSpan = 4;
    contentTr.appendChild(contentTd);

    // td안 div 생성
    const contentDiv = document.createElement('pre');
    contentDiv.innerHTML = data.content;
    contentTd.appendChild(contentDiv);

    // 선택된 tr 다음에 생성한 요소 추가
    e.target.parentNode.after(contentTr);
    setSelectId(data.id);
  }
}

function NoticeBody({ noticeData, setSelectId, setItemId }) {
  const list = noticeData.map((data, index) => (
    <tr
      data-type="title"
      data-open={false}
      key={data.title}
      onClick={(event) => {
        setNoticeContent(event, data, index, setItemId, setSelectId);
      }}
    >
      <td>
        <NoticeType>공지</NoticeType>
      </td>
      <td>{data.title}</td>
      <td>셀링하니</td>
      <td>{getYYMMDD(data.createAt)}</td>
    </tr>
  ));

  return <tbody>{list}</tbody>;
}

function Index({ noticeData, setSelectId, setItemId }) {
  return (
    <Container>
      <NoticeTable>
        <thead>
          <tr>
            <td>분류</td>
            <td>제목</td>
            <td>글쓴이</td>
            <td>날짜</td>
          </tr>
        </thead>
        {noticeData[0] && noticeData[0].id ? (
          <NoticeBody
            noticeData={noticeData}
            setSelectId={setSelectId}
            setItemId={setItemId}
          />
        ) : (
          <tbody>
            <tr>
              <td colSpan="4">내용이 없습니다.</td>
            </tr>
          </tbody>
        )}
      </NoticeTable>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  margin-bottom: 40px;
`;

const NoticeTable = styled.table`
  width: 100%;
  font-size: 0.8rem;
  & tr[data-type='title']:hover {
    cursor: pointer;
    background-color: #ebebeb61;
  }

  & tr[data-open='true'] pre {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2em 10%;
    background-color: rgba(255, 245, 213, 0.2);
    border-top: 0.3rem solid ${(props) => props.theme.colors.primary};
    font-family: 'Noto Sans KR', sans-serif;
    text-align: left;
  }

  & td {
    height: 45px;

    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(4) {
      width: 10%;
      min-width: 60px;
      text-align: center;
    }
  }

  & thead td {
    height: 40px;
    border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
    color: rgba(0, 0, 0, 0.5);
  }
`;

const NoticeType = styled.span`
  max-width: 40px;
  padding: 2px 8px;
  color: ${(props) => props.theme.colors.orange};
  border: 0.05rem solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  font-size: 0.85em;
  font-weight: bold;
`;
