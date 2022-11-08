import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  DownOutlined,
  UpOutlined,
  MinusSquareOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { removeCategory, removeKeyword } from 'http-api';
import { setSaveBucket } from 'redux/user';
import replaceParam from './keyword';

export default function Index({ visible, setVisible }) {
  const dispatch = useDispatch();
  const { userName, saveBucket } = useSelector((state) => state.user);
  const [visibleCategory, setVisibleCategory] = useState(true);
  const [visibleKeyword, setVisibleKeyword] = useState(true);

  const deleteBucketItem = (type, id) => {
    if (type === 'category') {
      removeCategory(id);
      dispatch(
        setSaveBucket(
          saveBucket.keywords,
          saveBucket.categorys.filter((value) => value.id !== id),
        ),
      );
    }
    if (type === 'keyword') {
      removeKeyword(id);
      dispatch(
        setSaveBucket(
          saveBucket.keywords.filter((value) => value.id !== id),
          saveBucket.categorys,
        ),
      );
    }
  };

  function KeywordItem({ type, id, keyword, fullPath }) {
    return (
      <ListDiv>
        <CategoryTitle>
          <DeleteIcon onClick={() => deleteBucketItem(type, id)} />
          <HoveringKeyword
            onClick={() => {
              window.open(`/keyword?keyword=${replaceParam(keyword)}&tab=1`);
            }}
          >
            {keyword}
          </HoveringKeyword>
        </CategoryTitle>
        {fullPath && (
          <CategoryPath
            onClick={() => {
              window.open(`/keyword?keyword=${replaceParam(keyword)}&tab=1`);
            }}
          >
            {fullPath}
          </CategoryPath>
        )}
      </ListDiv>
    );
  }

  return (
    <SaveBucketContainer>
      <SaveBucketDiv visible={visible.toString()}>
        <BucketTitleDiv>
          <CloseIcon onClick={() => setVisible(false)} />
          <Title>키워드통</Title>
        </BucketTitleDiv>
        {!userName && (
          <KeywordNotice>
            <NoticeBold>로그인</NoticeBold>
            <span>이 필요한 기능입니다.</span>
          </KeywordNotice>
        )}
        {userName && (
          <BucketContent>
            <BucketDiv>
              <SubTitle onClick={() => setVisibleCategory((prev) => !prev)}>
                <span>카테고리</span>
                {visibleCategory ? <DownIcon /> : <UpIcon />}
              </SubTitle>
              <BucketList visible={visibleCategory.toString()}>
                {saveBucket?.categorys?.map(
                  ({ id, categoryName, fullPath }) => (
                    <KeywordItem
                      id={id}
                      keyword={categoryName}
                      fullPath={fullPath}
                      type="category"
                      key={`bucket${id.toString()}`}
                    />
                  ),
                )}
              </BucketList>
            </BucketDiv>
            <BucketLine />
            <BucketDiv>
              <SubTitle onClick={() => setVisibleKeyword((prev) => !prev)}>
                <span>키워드</span>
                {visibleKeyword ? <DownIcon /> : <UpIcon />}
              </SubTitle>
              <BucketList visible={visibleKeyword.toString()}>
                {saveBucket?.keywords?.map(({ id, keyword }) => (
                  <KeywordItem
                    id={id}
                    keyword={keyword}
                    type="keyword"
                    key={`bucket${id.toString()}`}
                  />
                ))}
              </BucketList>
            </BucketDiv>
          </BucketContent>
        )}
      </SaveBucketDiv>
    </SaveBucketContainer>
  );
}

const SaveBucketContainer = styled.aside`
  float: right;
  width: 14%;
`;

const SaveBucketDiv = styled.div`
  width: 18%;
  height: 90vh;
  position: fixed;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  z-index: 999;
  border-radius: 2rem;

  transform: ${(props) =>
    props.visible === 'true' ? `0` : `translateX(100%)`};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0;
  /* box-shadow:  */
`;

const BucketTitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.8rem 0.6rem 1.8rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const CloseIcon = styled(CloseOutlined)`
  font-size: 0.8rem;
  margin-right: 0.45rem;
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;
`;

const Title = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
`;

const BucketContent = styled.div`
  height: 90%;
  overflow-y: auto;
  margin: 0.8rem 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BucketDiv = styled.div`
  margin: 0.8rem 0;
`;

const BucketLine = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const BucketList = styled.div`
  display: ${({ visible }) => (visible === 'true' ? 'flex' : 'none')};
  flex-direction: column;
`;

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.35rem 1.8rem;
  :hover {
    > span:nth-child(1) > span {
      font-weight: 600;
    }
    background: ${(props) => props.theme.colors.lineGray};
    cursor: pointer;
  }
`;

const CategoryTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
`;

const HoveringKeyword = styled.span`
  display: block;
  width: calc(100% - 0.5em - 12px);
  :hover {
    cursor: pointer;
  }
`;

const CategoryPath = styled.span`
  font-size: 0.6rem;
  margin: 0 1.3rem;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0.5rem 2.8rem 0.5rem 1.8rem; */
  padding: 0.5rem 3.8rem 0.5rem 1.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;
`;

const DownIcon = styled(DownOutlined)`
  font-size: 0.6rem;
`;

const UpIcon = styled(UpOutlined)`
  font-size: 0.6rem;
`;

const DeleteIcon = styled(MinusSquareOutlined)`
  margin-right: 0.45rem;
  color: #c7c7c7;
  cursor: pointer;
`;

const KeywordNotice = styled.div`
  font-size: 0.8rem;
  padding: 1.5rem 1.8rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const NoticeBold = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.black};
`;
