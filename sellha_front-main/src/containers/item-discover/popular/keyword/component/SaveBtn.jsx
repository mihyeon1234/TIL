import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { removeKeyword, saveKeyword, getSaveKeyword } from 'http-api';
import { LoadingOutlined } from '@ant-design/icons';
import { setSaveBucket } from 'redux/user';

/**
 * 저장 버튼 컴포넌트 분리, 저장 이벤트 발생 시 로딩 추가
 * 작성자: 장다영
 * 업데이트: 2022.05.17
 */
function index({ row }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { saveBucket } = useSelector((state) => state.user);

  useEffect(async () => {
    if (!loading) {
      const saveKeywords = await getSaveKeyword();
      dispatch(setSaveBucket(saveKeywords, saveBucket.categorys));
    }
  }, [loading]);

  function loopKeyword() {
    if (saveBucket.keywords) {
      for (let i = 0, len = saveBucket.keywords.length; i < len; i += 1) {
        if (saveBucket.keywords[i].keyword === row.keyword) {
          return 'true';
        }
      }
    }
    return 'false';
  }

  function mappingId() {
    return saveBucket.keywords.filter((save) => save.keyword === row.keyword)[0]
      .id;
  }

  /**
   * 저장 버튼 이벤트(키워드통에 키워드 저장)
   * 작성자: 장다영
   * 업데이트: 2022.05.17 _ setTimeout 삭제
   * @param {String} keyword
   */
  const handlerSaveButton = async (keyword) => {
    const result = await saveKeyword({ keywords: keyword });
    if (result === 200) {
      setLoading(false);
    }
  };

  /**
   * 저장 버튼 한번 더 클릭 시 키워드통에서 키워드 삭제
   * 작성자: 장다영
   * 업데이트: 2022.05.17 _ setTimeout 삭제
   * @param {Number} id
   */
  const deleteKeyword = async (id) => {
    const result = await removeKeyword(id);
    if (result.message === 'ok') {
      setLoading(false);
    }
  };

  return (
    <SaveButton
      save={loopKeyword(row)}
      type="button"
      onClick={(e) => {
        setLoading(true);
        if (loopKeyword(row) === 'true') {
          deleteKeyword(mappingId(row));
        } else {
          handlerSaveButton(row.keyword);
        }
        e.preventDefault();
      }}
    >
      {!loading && '저장'}
      {loading && <LoadingOutlined />}
    </SaveButton>
  );
}

export default index;

const SaveButton = styled(Button)`
  border: 1.5px solid ${(props) => props.theme.colors.yellow};
  border-radius: 0.65em;
  padding: 0.35em 0.55em;
  min-width: 3em;
  height: 2.5em;
  font-size: 0.95em;
  align-items: center;
  background-color: ${(props) =>
    props.save === 'false'
      ? props.theme.colors.white
      : props.theme.colors.yellow};
  color: ${(props) =>
    props.save === 'false'
      ? props.theme.colors.yellow
      : props.theme.colors.white};
  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) =>
      props.save === 'false'
        ? props.theme.colors.white
        : props.theme.colors.yellow};
    color: ${(props) =>
      props.save === 'false'
        ? props.theme.colors.yellow
        : props.theme.colors.white};
  }

  .tooltipSave {
    border-radius: 1.25em;
    font-size: 1em;
    color: black;
    padding: 0.6em 1em;
  }

  @media ${(props) => props.theme.mobile} {
  }
`;
