/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Button } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';

import { fetchEditKeywords, getItemDetail, getTeamKeywords } from 'http-api';

import {
  setKeywordList,
  setTeamKeyword,
  delKeywordList,
  resetKeywordList,
  addKeywordList,
  unsetKeywordList,
  setVisibleAlarm,
} from '../../reducer';
import { checkKeywordState, showAlert } from '../../utils';
import { setSelectKeywords } from '../../../reducer';

const List = ({ asyncRakingTable }) => {
  const dispatch = useDispatch();
  const { keywordList } = useSelector((state) => state.keywordMonitor);
  const {
    savedList,
    addList,
    delList,
    totalList,
    recommendList: { team },
  } = keywordList;
  const {
    selectItem: { category_fullpath },
    detailInfo: {
      pid,
      keywords: { title, tag },
      selectKeywords,
    },
  } = useSelector((state) => state.monitoringDetail);
  const user = useSelector((state) => state.user);

  const getCategoryKeyword = (keyword) => {
    const categoryKeywords = category_fullpath.split('>');

    return {
      state: keyword === categoryKeywords[categoryKeywords.length - 1],
      keyword: categoryKeywords[categoryKeywords.length - 1],
    };
  };

  const onClickKeyword = (keyword, type) => {
    if (type === 'add') dispatch(addKeywordList(keyword.trim()));
    if (type === 'del') dispatch(delKeywordList(keyword.trim()));
  };

  const fetchList = (selectList) => {
    const total = selectList.map(({ keyword }) => keyword);
    const tags = tag.map(({ tag_keyword }) => tag_keyword);
    dispatch(setKeywordList(total, total, title, tags));
  };

  const fetchItemDetail = async () => {
    try {
      const { result } = await getItemDetail(pid);

      dispatch(setSelectKeywords(result.selectKeywords));
      fetchList(result.selectKeywords);
    } catch (error) {
      dispatch(unsetKeywordList());
    }
  };

  const fetchEditList = async () => {
    const addKeywords = addList.filter(
      (keyword) => !savedList.includes(keyword),
    );
    const delKeywords = savedList.filter((keyword) =>
      delList.includes(keyword),
    );

    try {
      const { message, adult } = await fetchEditKeywords({
        pid,
        addKeywords,
        delKeywords,
      });
      if (message === 'ok') {
        if (adult?.length > 0) {
          showAlert(
            `저장했습니다. <br/> <span style="font-size: 13px;">🚨 성인 키워드 제외 : ${adult.join(
              ', ',
            )}</span>`,
          );
        } else {
          showAlert(
            `저장했습니다. <br/> <span style="font-size: 14px;">💡 알림 설정을 추가하면 모니터링 순위를 카카오톡으로 매일 받아볼 수 있어요!</span>`,
          ).then(({ isConfirmed }) => {
            if (isConfirmed) {
              dispatch(setVisibleAlarm(true));
              document
                .getElementById('alarm')
                .scrollIntoView({ alignToTop: 'true', behavior: 'smooth' });
            }
          });
        }
        asyncRakingTable();
        fetchItemDetail();
        dispatch(unsetKeywordList());
      }
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  useEffect(() => {
    const fetchTeamKeywordList = async () => {
      try {
        const { result } = await getTeamKeywords(pid);
        dispatch(setTeamKeyword(result));
      } catch (error) {
        alert();
      }
    };
    if (user.teamName) fetchTeamKeywordList();
    fetchList(selectKeywords);
  }, []);

  return (
    <ListWrapper>
      <AddKeywordList>
        <TitleBox>
          <Title>담은 키워드 목록</Title>
          <ResetButton
            onClick={() =>
              dispatch(resetKeywordList(getCategoryKeyword().keyword))
            }
          >
            전체 삭제
          </ResetButton>
        </TitleBox>
        <ListBox>
          <AddListBox>
            <KeywordWrapper>
              {totalList.map((keyword) => (
                <SaveKeywordTag
                  keyword={
                    getCategoryKeyword(keyword).state ? 'category' : 'save'
                  }
                  key={keyword}
                  data-tip
                  data-for={
                    getCategoryKeyword(keyword).state &&
                    'tooltipCategoryKeyword'
                  }
                >
                  {getCategoryKeyword(keyword).state && (
                    <CategoryTag>대표키워드</CategoryTag>
                  )}
                  {keyword}
                  {!getCategoryKeyword(keyword).state && (
                    <DelIcon
                      onClick={() => dispatch(delKeywordList(keyword.trim()))}
                    />
                  )}
                  <ReactTooltip
                    id="tooltipCategoryKeyword"
                    className="tooltipCSS-keyword"
                    place="top"
                    effect="solid"
                  >
                    {`'대표 키워드'는 이 상품의 최하위 카테고리를
                    고정 키워드로 제공합니다.
                    이 상품이 단일 상품인지 묶음 상품인지, 상품 순위의
                    상태를 판단하는 키워드로 활용해 보세요.`}
                  </ReactTooltip>
                </SaveKeywordTag>
              ))}
              {addList.map((keyword) => (
                <SaveKeywordTag keyword="add" key={keyword}>
                  {keyword}
                  <DelIcon
                    onClick={() => dispatch(delKeywordList(keyword.trim()))}
                  />
                </SaveKeywordTag>
              ))}
            </KeywordWrapper>
          </AddListBox>
          <SaveButtonBox>
            <SaveButton onClick={() => fetchEditList()}>저장</SaveButton>
          </SaveButtonBox>
        </ListBox>
      </AddKeywordList>
      <RecommendKeywordList>
        <TitleBox>
          <Title>추천 키워드 목록</Title>
        </TitleBox>
        <ListBox>
          <RecommendListBox>
            <tbody>
              <ListTr>
                <TitleTd>
                  <TitleText>상품명 키워드</TitleText>
                </TitleTd>
                <KeywordTd>
                  <KeywordWrapper>
                    {title.map((keyword) => (
                      <KeywordTag
                        clickable={
                          checkKeywordState(keywordList, keyword) &&
                          !getCategoryKeyword(keyword).state
                            ? 'false'
                            : 'true'
                        }
                        key={keyword}
                        onClick={() => {
                          if (getCategoryKeyword(keyword).state) return;
                          onClickKeyword(
                            keyword,
                            checkKeywordState(keywordList, keyword)
                              ? 'add'
                              : 'del',
                          );
                        }}
                      >
                        {keyword}
                      </KeywordTag>
                    ))}
                  </KeywordWrapper>
                </KeywordTd>
              </ListTr>
              <ListTr>
                <TitleTd>
                  <TitleWrapper>
                    <TitleText>태그 키워드</TitleText>
                    <SubTitleText>(검색량)</SubTitleText>
                  </TitleWrapper>
                </TitleTd>
                <KeywordTd>
                  <KeywordWrapper>
                    {tag.map(({ tag_keyword, search_amount }) => (
                      <KeywordTag
                        clickable={
                          checkKeywordState(keywordList, tag_keyword) &&
                          !getCategoryKeyword(tag_keyword).state
                            ? 'false'
                            : 'true'
                        }
                        key={tag_keyword}
                        onClick={() => {
                          if (getCategoryKeyword(tag_keyword).state) return;
                          onClickKeyword(
                            tag_keyword,
                            checkKeywordState(keywordList, tag_keyword)
                              ? 'add'
                              : 'del',
                          );
                        }}
                      >
                        {tag_keyword}
                        <SearchAmountTag>
                          {search_amount
                            ? `(${search_amount.toLocaleString()})`
                            : `(0)`}
                        </SearchAmountTag>
                      </KeywordTag>
                    ))}
                  </KeywordWrapper>
                </KeywordTd>
              </ListTr>
              <ListTr>
                <TitleTd>
                  <TitleText>팀 키워드</TitleText>
                  <QuestionCircle data-tip data-for="tooltipTeamKeyword" />
                  <ReactTooltip
                    id="tooltipTeamKeyword"
                    className="tooltipCSS-keyword"
                    place="top"
                    effect="solid"
                    delayHide={300}
                  >
                    등록한 팀 내 팀원들이 어떤 키워드를 추적하고 있는지
                    <br />
                    확인하고 선택하여 담을 수 있습니다.
                    <TooltipText>
                      🐝 팀 코드가 없다면?
                      <Link to="/mypage">
                        <TooltipLinkText>등록하러 가기</TooltipLinkText>
                      </Link>
                    </TooltipText>
                  </ReactTooltip>
                </TitleTd>
                <KeywordTd>
                  <KeywordWrapper>
                    {team?.map(({ keyword, userName }) => (
                      <KeywordTag
                        clickable={
                          checkKeywordState(keywordList, keyword) &&
                          !getCategoryKeyword(keyword).state
                            ? 'false'
                            : 'true'
                        }
                        key={keyword}
                        onClick={() => {
                          if (getCategoryKeyword(keyword).state) return;
                          onClickKeyword(
                            keyword,
                            checkKeywordState(keywordList, keyword)
                              ? 'add'
                              : 'del',
                          );
                        }}
                        data-tip
                        data-for={keyword}
                      >
                        {keyword}
                        <ReactTooltip
                          id={keyword}
                          className="tooltipCSS-team"
                          place="top"
                          effect="solid"
                          backgroundColor="#FFC83A"
                          textColor="#000000c3"
                        >
                          {userName.join(', ')}
                        </ReactTooltip>
                      </KeywordTag>
                    ))}
                    {team.length === 0 && (
                      <TeamKeyword>등록된 키워드가 없습니다.</TeamKeyword>
                    )}
                  </KeywordWrapper>
                </KeywordTd>
              </ListTr>
            </tbody>
          </RecommendListBox>
        </ListBox>
      </RecommendKeywordList>
    </ListWrapper>
  );
};

export default List;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  gap: 25px;
`;

const AddKeywordList = styled.div`
  width: 60rem;
  min-height: 16.8rem;
`;

const RecommendKeywordList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 18rem;
  /* max-width: 22rem; */
  min-height: 16.8rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const Title = styled.span`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ResetButton = styled.span`
  font-size: 0.75rem;
  margin-right: 0.25rem;
  color: ${(props) => props.theme.colors.darkGray};
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

const AddListBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.25rem;
  min-height: 14rem;
  /* max-height: 16rem; */
  width: 100%;
  padding: 10px;
  overflow-y: auto;

  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    bottom: 0;
    width: 12px;
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
    display: 0;
  }
`;

const SaveButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
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

const RecommendListBox = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-radius: 0.25rem;
  border-style: hidden;
  border-left: 3px solid ${(props) => props.theme.colors.lineGray};
  box-shadow: 0 0 0 0.08rem ${(props) => props.theme.colors.lightGray};
`;

const ListBox = styled.div`
  height: 100%;
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

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.75rem;
  cursor: pointer;
  margin-left: 0.35em;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const TitleText = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
`;

const SubTitleText = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 0.5rem;
`;

const KeywordTd = styled.td`
  font-size: 0.8rem;
  padding: 10px;

  .tooltipCSS-team {
    font-size: 0.65em;
    border-radius: 1.25em;
    padding: 0.6em 1em;
    box-shadow: 0 2px 6px 0px ${(props) => props.theme.colors.gray};
  }
`;

const KeywordTag = styled.span`
  margin: 3px;
  padding: 2px 8px;
  border: 1px solid
    ${(props) =>
      props.clickable === 'true'
        ? props.theme.colors.primary
        : props.theme.colors.lightGray};
  color: ${(props) =>
    props.clickable === 'true'
      ? props.theme.colors.black
      : props.theme.colors.darkGray};
  font-size: 0.73rem;
  border-radius: 0.2rem;
  cursor: pointer;
`;

const SaveKeywordTag = styled.span`
  display: flex;
  align-items: center;
  margin: 3px;
  padding: 2px 8px;
  border: 1px
    ${({ theme, keyword }) => {
      if (keyword === 'save') return `solid ${theme.colors.lineGray}`;
      if (keyword === 'add') return `dashed ${theme.colors.orange}`;
      if (keyword === 'category') return `solid ${theme.colors.lightGray}`;
      return `solid ${theme.colors.white}`;
    }};
  border-radius: 0.2rem;
  height: fit-content;
  font-size: 0.73rem;
  background-color: ${({ theme, keyword }) => {
    if (keyword === 'save') return theme.colors.lineGray;
    if (keyword === 'add') return theme.colors.white;
    if (keyword === 'category') return theme.colors.lightGray;
    return theme.colors.lineGray;
  }};
  cursor: ${({ keyword }) => (keyword === 'category' ? 'pointer' : 'auto')};
`;

const KeywordWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DelIcon = styled(CloseOutlined)`
  margin-left: 0.25rem;
  cursor: pointer;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.65rem;
`;

const SearchAmountTag = styled.span`
  font-size: 0.5rem;
  margin-left: 0.15rem;
  color: ${(props) => props.theme.colors.darkGray};
`;

const TooltipText = styled.div`
  margin-top: 10px;
`;

const TooltipLinkText = styled.span`
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.colors.orange};
  text-underline-position: under;
  cursor: pointer;
  margin-left: 5px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.orange};
`;

const TeamKeyword = styled.div`
  font-size: 0.73rem;
  color: ${(props) => props.theme.colors.darkGray};
  margin: 3px 5px;
`;

const CategoryTag = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  margin-right: 3px;
  letter-spacing: -1px;
  color: ${(props) => props.theme.colors.blue};
`;
