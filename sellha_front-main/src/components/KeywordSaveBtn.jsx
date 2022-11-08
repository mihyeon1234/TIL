import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import {
  saveKeyword,
  removeKeyword,
  saveKCategory,
  removeCategory,
  getSaveKeyword,
  getsaveKCategory,
} from 'http-api';

import { setSaveBucket } from 'redux/user';
import { LoadingOutlined } from '@ant-design/icons';

function mappingId(item, saveBucket) {
  const keyword = item.keyword || item.relKeyword;
  return saveBucket.keywords.filter((save) => save.keyword === keyword)[0].id;
}

function mappingCategoryId(row, saveBucket) {
  return saveBucket.categorys.filter(
    (save) => save.categoryId === row.categoryId,
  )[0].id;
}

function loopKeyword(item, saveBucket) {
  const keyword = item.keyword || item.relKeyword;
  if (!saveBucket || saveBucket.length < 1) {
    return false;
  }

  if (keyword) {
    for (let i = 0, len = saveBucket.keywords.length; i < len; i += 1) {
      if (saveBucket.keywords[i].keyword === keyword) {
        return true;
      }
    }
  } else {
    for (let i = 0, len = saveBucket.categorys.length; i < len; i += 1) {
      if (saveBucket.categorys[i].categoryId === item.categoryId) {
        return true;
      }
    }
  }

  return false;
}

export async function fetchKeywordList(saveBucket, dispatch) {
  // 키워드 통 키워드 목록 새로 불러오기
  const saveKeywords = await getSaveKeyword();
  dispatch(setSaveBucket(saveKeywords, saveBucket.categorys));
}

export async function fetchCategoryList(saveBucket, dispatch) {
  const saveCategory = await getsaveKCategory();
  dispatch(setSaveBucket(saveBucket.keywords, saveCategory));
}

function index({ item }) {
  const dispatch = useDispatch();
  const { saveBucket } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);
  // 키워드 통에 키워드 저장 버튼 핸들러
  const handlerKeywordSave = async () => {
    const keyword = item.keyword || item.relKeyword;
    if (!loopKeyword(item, saveBucket)) {
      // 키워드 저장
      await saveKeyword({ keywords: keyword });
    } else {
      const id = mappingId(item, saveBucket);
      // 키워드 삭제
      await removeKeyword(id);
    }

    await fetchKeywordList(saveBucket, dispatch);
    setLoading(false);
  };

  // 키워드 통에 카테고리 저장 버튼 핸들러
  async function handlerCategorySave() {
    if (!loopKeyword(item, saveBucket)) {
      // 카테고리 저장
      await saveKCategory({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
      });
    } else {
      const id = mappingCategoryId(item, saveBucket);
      // 카테고리 삭제
      await removeCategory(id);
    }

    // 키워드 통 카테고리 목록 새로 불러오기
    await fetchCategoryList(saveBucket, dispatch);
    setLoading(false);
  }

  return (
    <SaveButton
      className="hidden"
      save={loopKeyword(item, saveBucket).toString()}
      type="button"
      onClick={(e) => {
        setLoading(true);
        // 저장할 item이 키워드
        if (item.keyword || item.relKeyword) {
          handlerKeywordSave();
        }
        // 저장할 item이 카테고리
        else {
          handlerCategorySave();
        }

        e.stopPropagation();
      }}
    >
      {!loading && '저장'}
      {loading && <LoadingOutlined />}
    </SaveButton>
  );
}

export default index;

const SaveButton = styled(Button)`
  align-items: center;
  min-width: 3.2em;
  height: fit-content;
  padding: 0.35em 0.55em;
  border: 1.5px solid ${(props) => props.theme.colors.yellow};
  border-radius: 0.65em;
  font-size: 0.95em;
  background-color: ${(props) =>
    props.save === 'false'
      ? props.theme.colors.white
      : props.theme.colors.yellow};
  color: ${(props) =>
    props.save === 'false'
      ? props.theme.colors.yellow
      : props.theme.colors.white};

  &:hover,
  &:focus,
  &:active & {
    background-color: ${(props) =>
      props.save === 'false'
        ? props.theme.colors.white
        : props.theme.colors.yellow};
    color: ${(props) =>
      props.save === 'false'
        ? props.theme.colors.yellow
        : props.theme.colors.white};
  }
  @media ${(props) => props.theme.mobile} {
  }
`;
