import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';
import Swal from 'sweetalert2';
import { fetchRankingAlarm } from 'http-api';

const useSelectKeyword = () => {
  const {
    detailInfo: { selectKeywords, pid },
  } = useSelector((state) => state.monitoringDetail);
  const [list, setList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [delList, setDelList] = useState([]);

  const getKeywordState = (keyword) => addList.indexOf(keyword) < 0;

  const onClickKeyword = (keyword) => {
    const isAvailableAdd = getKeywordState(keyword);

    if (isAvailableAdd) {
      setAddList((prevState) =>
        prevState.indexOf(keyword) < 0
          ? [...prevState, keyword]
          : [...prevState],
      );
      setDelList((prevState) =>
        prevState.filter((delKeyword) => delKeyword !== keyword),
      );
    } else {
      setDelList((prevState) =>
        prevState.indexOf(keyword) < 0
          ? [...prevState, keyword]
          : [...prevState],
      );
      setAddList((prevState) =>
        prevState.filter((addKeyword) => addKeyword !== keyword),
      );
    }
  };

  const onClickAllKeywords = (type) => {
    if (type === 'select') {
      setAddList(list);
      setDelList([]);
    } else {
      setAddList([]);
      setDelList(list);
    }
  };

  const fetchAlarm = async () => {
    const addAlert = addList.filter(
      (keyword) => !selectedList.includes(keyword),
    );
    const delAlert = selectedList.filter((keyword) =>
      delList.includes(keyword),
    );

    try {
      const { message } = await fetchRankingAlarm({
        pid,
        addAlert,
        delAlert,
      });
      if (message === 'ok') {
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
      }
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  const onClickSaveButton = async () => {
    fetchAlarm();
    setDelList([]);
    setAddList(addList);
    setSelectedList(addList);
  };

  useEffect(() => {
    setList(selectKeywords.map(({ keyword }) => keyword));
    setSelectedList(
      selectKeywords
        .filter(({ alert }) => alert === 1)
        .map(({ keyword }) => keyword),
    );
    setAddList(
      selectKeywords
        .filter(({ alert }) => alert === 1)
        .map(({ keyword }) => keyword),
    );
  }, [selectKeywords]);

  return {
    list,
    selectedList,
    addList,
    delList,
    getKeywordState,
    onClickKeyword,
    onClickAllKeywords,
    onClickSaveButton,
  };
};

const Select = () => {
  const {
    list,
    getKeywordState,
    onClickKeyword,
    onClickAllKeywords,
    onClickSaveButton,
  } = useSelectKeyword();

  return (
    <Container>
      <ControlButtonBox>
        <SelectButton onClick={() => onClickAllKeywords('select')}>
          전체 선택
        </SelectButton>
        <SelectButton onClick={() => onClickAllKeywords('deselect')}>
          전체 해제
        </SelectButton>
      </ControlButtonBox>
      <KeywordListTable>
        <tbody>
          <ListTr>
            <TitleTd>
              <TitleText>알림 키워드</TitleText>
            </TitleTd>
            <ListTd>
              <ListWrapper>
                {list.map((keyword) => (
                  <KeywordTag
                    key={keyword}
                    keywordState={getKeywordState(keyword).toString()}
                    onClick={() => onClickKeyword(keyword)}
                  >
                    {keyword}
                  </KeywordTag>
                ))}
              </ListWrapper>
            </ListTd>
          </ListTr>
        </tbody>
      </KeywordListTable>
      <SaveButtonBox>
        <SaveButton onClick={() => onClickSaveButton()}>저장</SaveButton>
      </SaveButtonBox>
    </Container>
  );
};

export default Select;

const Container = styled.div``;

const ControlButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const SelectButton = styled.span`
  font-size: 0.75rem;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const KeywordListTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-radius: 0.25rem;
  border-style: hidden;
  box-shadow: 0 0 0 0.08rem ${(props) => props.theme.colors.lightGray};
`;

const ListTr = styled.tr`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const TitleTd = styled.td`
  width: 100px;
  border-right: 1px solid ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.darkGray};
  padding: 0 10px;
`;

const TitleText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

const ListTd = styled.td`
  font-size: 0.8rem;
  padding: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const KeywordTag = styled.span`
  margin: 3px;
  padding: 2px 8px;
  border: 1px solid
    ${(props) =>
      props.keywordState === 'true'
        ? props.theme.colors.lightGray
        : props.theme.colors.primary};
  color: ${(props) =>
    props.keywordState === 'true'
      ? props.theme.colors.darkGray
      : props.theme.colors.black};
  font-size: 0.73rem;
  border-radius: 0.2rem;
  cursor: pointer;
`;

const SaveButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SaveButton = styled(Button)`
  width: 5rem;
  height: 2.3rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  border: none;
  :hover {
    background-color: #ffdd63;
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.colors.white};
  }
  :focus {
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
  }
`;
