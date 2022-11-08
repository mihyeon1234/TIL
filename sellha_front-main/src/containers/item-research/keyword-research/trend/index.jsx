import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spiner from 'components/spiner';
import SearchIcon from 'assets/icon/category_search.png';
import PinterestIcon from 'assets/icon/pinterest.png';
import NaverIcon from 'assets/icon/naver.png';
import { getTrendFeedData, trendCheck } from './api';
import FeedItem from './image';

// 핀터레스트 네이버 데이터 섞기
const getFeedAll = (naverResult, pinterestResult) => {
  const allFeed = [...pinterestResult.posts, ...naverResult.posts];
  allFeed.sort(() => Math.random() - 0.5);
  return allFeed;
};

function FeedTab({ tabSelect, setTabSelect }) {
  // 탭 데이터
  const tabText = [
    { text: '전체' },
    { text: '핀터레스트', icon: PinterestIcon },
    { text: '네이버', icon: NaverIcon },
  ];

  return tabText.map((data, idx) => (
    <TabItem
      key={`tab${data.text}feed`}
      data-type={tabSelect === idx}
      onClick={() => {
        setTabSelect(idx);
      }}
    >
      {data.icon && <TabImg alt="icon" src={data.icon} width="16em" />}
      {data.text}
    </TabItem>
  ));
}

export default function Index({ searchKeyword }) {
  const [tabSelect, setTabSelect] = useState(0); // 선택한 탭 인덱스
  const [pinterest, setPinterest] = useState([]); // 핀터레스트 데이터
  const [naver, setNaver] = useState([]);
  const [selectFeed, setSelectFeed] = useState(); // 선택한 탭 데이터
  const [loading, setLoading] = useState(true);

  // 트렌드 피드 데이터 가져오기
  async function getFeedData() {
    try {
      const feedCheck = await trendCheck(searchKeyword).catch(() => {});

      if (feedCheck.keyword) {
        const { naverResult, pinterestResult, keyword } =
          await getTrendFeedData(feedCheck.keyword);

        setLoading(false);
        if (keyword) {
          setPinterest(pinterestResult);
          setNaver(naverResult);

          const pinterestData = pinterestResult?.posts;
          const naverData = naverResult?.posts;

          if (!pinterestData && !naverData) {
            setSelectFeed(undefined);
          } else {
            const feedData = [
              getFeedAll(naverResult, pinterestResult),
              pinterestData,
              naverData,
            ];
            setSelectFeed(feedData);
          }
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeedData();

    return () => {
      setSelectFeed(undefined);
      setTabSelect(0);
      setPinterest([]);
      setNaver([]);
      setLoading(false);
    };
  }, []);

  return (
    <Container>
      {loading && <Spiner loading={loading} info="트렌드 피드 탐색중..." />}
      {!loading && (
        <>
          <TabView>
            <FeedTab tabSelect={tabSelect} setTabSelect={setTabSelect} />
          </TabView>
          {selectFeed && selectFeed[tabSelect]?.length > 0 && (
            <>
              <FeedItem recent={selectFeed} tabSelect={tabSelect} />
              {tabSelect > 0 && (
                <ButtonBox>
                  <MoreBtn
                    type="button"
                    data-value={!selectFeed}
                    onClick={() => {
                      let redirectUrl;

                      if (tabSelect === 1) {
                        redirectUrl = pinterest && pinterest.redirectUrl;
                      } else if (tabSelect === 2) {
                        redirectUrl = naver && naver.redirectUrl;
                      }

                      if (redirectUrl) window.open(redirectUrl, '_blank');
                    }}
                  >
                    더보기
                  </MoreBtn>
                </ButtonBox>
              )}
            </>
          )}
          {(!selectFeed ||
            !selectFeed[tabSelect] ||
            selectFeed[tabSelect]?.length === 0) && (
            <EmptyView>
              <EmptyImg src={SearchIcon} alt="결과 없음" />
              <span>검색한 키워드와</span>
              <span>관련된 피드가 없습니다.</span>
            </EmptyView>
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 44vh;

  .ant-tabs-content {
    height: 40vh;
    display: flex;
    align-items: center;
  }
`;

const TabView = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.2em;
  align-items: center;

  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 2em 0;
`;

const MoreBtn = styled.button`
  width: 10em;
  height: 3em;
  margin-top: 30px;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-sizing: border-box;
  border-radius: 15px;

  &[data-value='true'] {
    display: none;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }
`;

const TabItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 4em;
  padding: 0.6em 1.2em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 0.8em;
  color: ${(props) => props.theme.colors.darkGray};
  user-select: none;
  font-size: 0.9em;

  :not(:last-child) {
    margin-right: 0.8em;
  }

  :hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.orange};
  }

  &[data-type='true'] {
    border: 1px solid #ffc83a;
    color: #ffc83a;
  }
`;

const TabImg = styled.img`
  margin-right: 0.3em;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const EmptyView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  color: rgba(0, 0, 0, 0.3);
  font-size: 18px;
`;

const EmptyImg = styled.img`
  opacity: 0.2;
  margin-bottom: 30px;
`;
