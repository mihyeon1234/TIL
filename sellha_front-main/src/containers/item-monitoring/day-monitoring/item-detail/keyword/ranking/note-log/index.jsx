import { Button, Input } from 'antd';
import { fetchNoteData } from 'http-api';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';

function index({ memo, NoteDate, asyncRakingTable }) {
  const { TextArea } = Input;

  const { userName } = useSelector((state) => state.user);
  const { detailInfo } = useSelector((state) => state.monitoringDetail);

  const [NoteId, setNoteId] = useState(0);
  const [NoteValue, setNoteValue] = useState('');
  const [NoteType, setNoteType] = useState('new');

  const asyncNote = async (id, value, type) => {
    const year = new Date().getFullYear();
    const month = `0${new Date(NoteDate).getMonth() + 1}`.slice(-2);
    const date = `0${new Date(NoteDate).getDate()}`.slice(-2);
    const formatDate = `${year}-${month}-${date}`;

    try {
      const result = await fetchNoteData({
        pid: detailInfo.pid,
        memo: {
          id: id || NoteId,
          value: value || NoteValue,
          date: formatDate,
          type: type || NoteType,
        },
      });
      if (result.message === 'ok') {
        Swal.fire({
          text: '저장했습니다.',
          confirmButtonText: `확인`,
          timer: 1500,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeIn animate__faster',
          },
          confirmButtonColor: '#FFC83A',
          allowEnterKey: false,
        });
        setNoteId(0);
        setNoteValue('');
        setNoteType('new');
        asyncRakingTable();
      }
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  return (
    <NoteContainer>
      <NoteContentSection>
        <NoteTitleBox>{NoteDate} 📝 노트</NoteTitleBox>
        {memo[NoteDate] &&
          memo[NoteDate].map((value) => (
            <NoteLogBox key={value.memo + value.userName}>
              <NoteTeamName>{value.teamName}</NoteTeamName>
              <NoteWriter>{value.userName}</NoteWriter>
              <NoteContent>{value.memo}</NoteContent>
              <NoteEditDate>{value.edit_date}</NoteEditDate>
              {value.userName === userName && (
                <>
                  <NoteEditButton
                    onClick={() => {
                      setNoteId(value.id);
                      setNoteValue(value.memo);
                      setNoteType('rep');
                    }}
                  />
                  <NoteDelButton
                    onClick={() => {
                      asyncNote(value.id, value.memo, 'rem');
                    }}
                  />
                </>
              )}
            </NoteLogBox>
          ))}
      </NoteContentSection>
      <NoteInputSection>
        <TextArea
          showCount
          maxLength={300}
          allowClear
          autoSize={{ minRows: 1, maxRows: 3 }}
          placeholder="노트 내용을 입력해보세요!"
          value={NoteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />
        <SaveNoteButton
          onClick={() => {
            asyncNote();
          }}
        >
          저장
        </SaveNoteButton>
      </NoteInputSection>
    </NoteContainer>
  );
}

export default index;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 14vh;
  margin: 0.5em 0;
`;

const NoteTitleBox = styled.div`
  font-size: 0.9em;
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 0.5em;
`;

const NoteContentSection = styled.div`
  width: 87%;
  padding: 0.8em 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1.25em;
  box-shadow: 1px 1px 2px 0 #00000019;
  max-height: 18vh;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    bottom: 0;
    width: 8px; // 8px
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.089);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const NoteLogBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.15em 0;

  > span:nth-child(-n + 3) {
    margin: 0 0.35em;
  }
`;

const NoteTeamName = styled.span`
  font-size: 0.8em;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkGray};
  min-width: 4em;
`;

const NoteWriter = styled.span`
  font-size: 0.85em;
  font-weight: 600;
  min-width: 3em;
`;

const NoteContent = styled.span`
  font-size: 0.9em;
  width: 72em;
  line-height: 1.2;
`;

const NoteEditDate = styled.span`
  font-size: 0.75em;
  margin-left: 5em;
  min-width: 12em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const NoteEditButton = styled.span`
  width: 20px;
  height: 15px;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 20H12V16L24 4L28 8L16 20Z' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M21 7L25 11' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M27 15V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H17' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const NoteDelButton = styled.span`
  width: 20px;
  height: 15px;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 12L12 20' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M20 20L12 12' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z' stroke='%237F7F7F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-left: 0.15em;
`;

const NoteInputSection = styled.div`
  width: 87%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ant-input-textarea {
    width: 93%;
    margin-top: 0.8em;
    > .ant-input-affix-wrapper {
      > textarea {
        /* height: 35px !important; */
        /* line-height: 2.3 !important; */
        width: 100%;
        border-radius: 1em;
        font-size: 12px;
        resize: none;
        border: 1px solid ${(props) => props.theme.colors.lightGray};
      }
      .ant-input {
        padding: 0.35em 0.8em;
        padding-right: 2.5em;
      }
    }
  }
  .ant-input-textarea-show-count::after {
    font-size: 0.75em;
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SaveNoteButton = styled(Button)`
  width: 4.5em;
  height: 2.3em;
  border-radius: 1em;
  font-size: 0.9em;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border: none;
  margin-bottom: 0.25em;
  :hover,
  :focus {
    background-color: #5c89fa99;
    color: ${(props) => props.theme.colors.white};
  }
`;
