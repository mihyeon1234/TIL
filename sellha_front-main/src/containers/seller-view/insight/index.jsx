import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

import { Button, List, Empty, Input, Row, Col } from 'antd';
import {
  AppstoreOutlined,
  BarsOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

import YoutubeIcon from 'assets/icon/youtube.svg';
import { getContents } from 'http-api';

export default function index() {
  const [ToggleView, setToggleView] = useState(false); // false: list, true: grid
  const [filter, setFilter] = useState('전체');
  const [searchWord, setSearchWord] = useState('');

  const [Feed, setFeed] = useState([]);
  const [Loading, setLoading] = useState(false);

  const searchChange = (event) => {
    if (!event.target.value) {
      asyncContents('');
    }
    setSearchWord(event.target.value);
  };

  const asyncContents = async (search) => {
    const category = filter === '전체' ? '' : filter;
    const results = await getContents(search, category);
    setFeed(results);

    setLoading(false);
  };

  useEffect(() => {
    setSearchWord('');
    asyncContents('');
  }, [filter]);

  useEffect(() => {
    document.title = `셀링하니`;
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    setLoading(true);
  }, []);

  return (
    <Container>
      <TopDiv>
        <SearchTitle>
          이커머스 인사이트
          <QuestionCircleIcon data-tip data-for="tooltip-insight" />
        </SearchTitle>
        <ReactTooltip
          id="tooltip-insight"
          className="tooltipCSS"
          place="right"
          effect="solid"
        >
          창업에 대한 인사이트를 얻을 수 있도록 유용한 자료들만 쏙쏙 골라
          모아두었습니다.
        </ReactTooltip>
        <AddContentButton
          onClick={() => {
            window.open('https://forms.gle/LWLyYuUvNffx8Rw46');
          }}
        >
          나만 보기 아까운 콘텐츠가 있다면?
        </AddContentButton>
      </TopDiv>
      <FilterDiv>
        <FilterRows filter={filter} setFilter={setFilter} />
      </FilterDiv>
      <SearchDiv>
        <SearchTitle>콘텐츠 검색</SearchTitle>
        <QuestionCircleIcon data-tip data-for="tooltip-search" />
        <ReactTooltip
          id="tooltip-search"
          className="tooltipCSS"
          place="right"
          effect="solid"
        >
          스마트 스토어 운영에 필요한 정보관련 유튜브와 네이버TV 영상 제목,
          내용을 검색하면 해당 콘텐츠가 제공됩니다.
        </ReactTooltip>
        <StyledInput
          placeholder="제목, 내용 등을 검색하세요"
          suffix={
            <SearchOutlined
              style={{ fontSize: 16 }}
              onClick={() => asyncContents(searchWord)}
            />
          }
          allowClear
          value={searchWord}
          onChange={searchChange}
          onPressEnter={() => asyncContents(searchWord)}
        />
      </SearchDiv>
      <ContentDiv>
        <FilterButtonDiv>
          {/* <FilterButton>
            필터 <DownOutlined />
          </FilterButton> */}
          <RowDiv>
            <ToggleButton
              mode={(!ToggleView).toString()}
              onClick={() => {
                setToggleView(false);
              }}
            >
              <BarsOutlined />
            </ToggleButton>
            <ToggleButton
              mode={ToggleView.toString()}
              onClick={() => {
                setToggleView(true);
              }}
            >
              <AppstoreOutlined />
            </ToggleButton>
          </RowDiv>
        </FilterButtonDiv>

        {!ToggleView && (
          <List
            loading={Loading}
            itemLayout="vertical"
            dataSource={Feed}
            renderItem={(item) => <ListItem key={item.id} item={item} />}
          />
        )}
        {ToggleView && Feed.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        {ToggleView && (
          <GridList>
            {Feed.map((item) => (
              <GridItem key={item.id} item={item} />
            ))}
          </GridList>
        )}
      </ContentDiv>
    </Container>
  );
}

const Container = styled.div`
  margin: 1em 6.5em;
  min-height: 63vh;
  .ant-list-empty-text {
    padding: 0;
  }
  .tooltipCSS {
    width: 28em;
    font-size: 0.8em;
    font-weight: 300;
    border-radius: 1em;
  }

  .ant-list {
    width: 100%;
  }

  @media ${(props) => props.theme.mobile} {
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
`;

const AddContentButton = styled(Button)`
  width: 20em;
  height: 3em;
  border-color: none;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1em;
  font-size: 0.95em;
  &:hover,
  &:focus {
    border: none;
    background-color: #7390d899;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 5em;
  justify-content: center;
  border-radius: 1.5em;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${({ theme }) => theme.colors.lightGray};
  padding: 0.5em;

  @media ${(props) => props.theme.mobile} {
    padding: 0em;
  }

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6.2em;
  align-items: center;
  border-radius: 1.5em;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${({ theme }) => theme.colors.lightGray};
  padding: 1.8em 2.5em;
  margin-top: 2%;
`;

const SearchTitle = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  min-width: fit-content;
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const StyledInput = styled(Input)`
  display: flex;
  width: 40%;
  margin-left: 3em;
  border: none;
  border-bottom: 2px solid;
  box-shadow: none;
  &:focus {
    border: none;
    box-shadow: none;
  }
  @media ${(props) => props.theme.mobile} {
    width: 60%;
    margin-left: 1em;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 400px;

  margin-top: 2%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${({ theme }) => theme.colors.lightGray};
  border-radius: 1em;
  padding: 1.8em 2.5em;
`;

const FilterButtonDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;

  margin: 1em 0;

  width: 100%;
  max-height: 40px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ToggleButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  box-shadow: none;

  color: ${(props) =>
    props.mode === 'true' ? props.theme.colors.warning : null};
`;

// const FilterButton = styled(Button)`
//   height: 40px;
//   border-radius: 10px;
//   border-color: #2d54b899;
//   color: #2d54b899;

//   &:hover,
//   &:focus {
//     border-color: #2d54b899;
//     color: #2d54b899;
//   }
// `;

function ListItem({ item }) {
  const {
    id,
    v,
    sourceTitle,
    sourceSummary,
    categories,
    channelIcon,
    channelName,
  } = item;
  // const windowSize = useWindowSize();

  return (
    <ListItemContainer
      key={id}
      onClick={() => {
        window.open(item.url);
      }}
    >
      <ImageDiv>
        <ItemImage v={v} title={sourceTitle} />
      </ImageDiv>
      <ItemBody>
        <ItemTitle>
          <MiniIc alt="[Youtube] " src={YoutubeIcon} />
          {sourceTitle}
        </ItemTitle>
        <SummaryDiv>
          <ItemSummary>{sourceSummary}</ItemSummary>
        </SummaryDiv>
        <ChannelDiv>
          <ChannelIcon src={channelIcon} alt="channel" />
          <ChannelName>{channelName}</ChannelName>
        </ChannelDiv>
        <ItemCategories>
          {categories.map((category) => (
            <ItemCategory key={category}>{category}</ItemCategory>
          ))}
        </ItemCategories>
      </ItemBody>
    </ListItemContainer>
  );
}

const ChannelDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ChannelIcon = styled.img`
  border-radius: 50%;
  width: 18px;
`;
const ChannelName = styled.div`
  margin-left: 5px;
  font-size: 0.8rem;
`;

const ListItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  margin-bottom: 3.2em;

  cursor: pointer;

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ImageDiv = styled.div`
  width: 300px;
  height: 180px;

  /* border-radius: 1.2em; */
  margin-left: 1em;
  margin: auto 0;

  overflow: hidden;

  @media ${(props) => props.theme.mobile} {
    margin: 0 auto;
    margin-bottom: 1em;
  }
`;

const ItemImage = ({ v, title }) => {
  const [Success, setSuccess] = useState(true);

  if (!Success) {
    return (
      <NoThumbnail>
        <StyledSpan>{title}</StyledSpan>
      </NoThumbnail>
    );
  }

  return (
    <img
      width="100%"
      height="100%"
      style={{ borderRadius: '1.2em' }}
      alt="logo"
      src={`https://img.youtube.com/vi/${v}/maxresdefault.jpg`}
      onLoad={(e) => {
        if (e.target.naturalWidth < 200) {
          setSuccess(false);
        }
      }}
      onError={() => {
        setSuccess(false);
      }}
    />
  );
};

const NoThumbnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  cursor: pointer;

  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 1.2em;
  padding: 10%;

  background-color: black;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
`;

const StyledSpan = styled.div`
  color: white;
  text-align: center;
  font-size: 1.2em;
  font-weight: 500;

  overflow: hidden;
  word-break: keep-all;
`;

const ItemBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 0 1em;

  @media ${(props) => props.theme.mobile} {
    margin: 0;
  }
`;

const ItemTitle = styled.div`
  margin-bottom: 0.5em;

  display: flex;
  align-items: center;

  font-size: 1em;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 0;
  }
`;

// const ChatIcon = styled.div`
//   font-size: 2em;
//   margin-top: -0.5em;
//   margin-left: 0.5em;
//   color: gray;
// `;

// const CommentCount = styled.div`
//   position: relative;
//   top: -2.5em;
//   font-size: 0.5em;
//   text-align: center;
//   color: ${(props) => props.theme.primary};
// `;

const SummaryDiv = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: column;
`;

const ItemSummary = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.5em;
  max-height: 4.5em;
  font-size: 0.9em;

  color: ${({ theme }) => theme.colors.darkGray};

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 1em;
  }
`;

const ItemCategories = styled.div`
  display: flex;
  flex: 0.1;
  flex-direction: row;
`;

const ItemCategory = styled.div`
  margin-right: 5px;
  border-radius: 2px;
  padding: 0 0.5em;

  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 0.85em;
  width: fit-content;
`;

function FilterRows({ filter, setFilter }) {
  const handleClick = (value) => {
    setFilter(value);
  };

  return (
    <LastRow>
      <SCol value="전체" filter={filter} onClick={() => handleClick('전체')}>
        전체
      </SCol>
      <SCol
        value="트렌드헌터"
        filter={filter}
        onClick={() => handleClick('트렌드헌터')}
      >
        트렌드헌터
      </SCol>
      <SCol
        value="스마트스토어"
        filter={filter}
        onClick={() => handleClick('스마트스토어')}
      >
        스마트스토어
      </SCol>
      <SCol
        value="제품기획"
        filter={filter}
        onClick={() => handleClick('제품기획')}
      >
        제품기획
      </SCol>
      <SCol
        value="상품명"
        filter={filter}
        onClick={() => handleClick('상품명')}
      >
        상품명
      </SCol>
      <SCol
        value="브랜드"
        filter={filter}
        onClick={() => handleClick('브랜드')}
      >
        브랜드
      </SCol>
      <SCol
        value="소비자 관심사"
        filter={filter}
        onClick={() => handleClick('소비자 관심사')}
      >
        소비자 관심사
      </SCol>
      <SCol
        value="마케팅"
        filter={filter}
        onClick={() => handleClick('마케팅')}
      >
        마케팅
      </SCol>
      <SCol
        value="상세페이지"
        filter={filter}
        onClick={() => handleClick('상세페이지')}
      >
        상세페이지
      </SCol>
      <SCol
        value="아이디어"
        filter={filter}
        onClick={() => handleClick('아이디어')}
      >
        아이디어
      </SCol>
      <SCol
        value="제조공장"
        filter={filter}
        onClick={() => handleClick('제조공장')}
      >
        제조공장
      </SCol>
      {/* <SCol
        value="원재료"
        filter={filter}
        onClick={() => handleClick('원재료')}
      >
        원재료
      </SCol> */}
    </LastRow>
  );
}

const LastRow = styled(Row)`
  border-bottom: 0px;
`;

const SCol = styled(Col)`
  display: flex;
  flex: 1;
  justify-content: center;
  cursor: pointer;

  color: ${({ filter, value, theme }) =>
    filter === value ? theme.colors.orange : theme.colors.darkGray};

  text-decoration: ${({ filter, value }) =>
    filter === value ? 'underline' : 'none'};

  font-weight: ${({ filter, value }) => (filter === value ? 600 : 300)};
  font-size: 0.95em;
`;

const MiniIc = styled.img`
  display: inline-block;

  width: 19.536px;
  height: 19.536px;

  justify-self: center;

  margin-right: 0.4em;
`;

const GridList = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-gap: 30px;
  grid-template-columns: repeat(3, 1fr);

  /* @media ${(props) => props.theme.labtop} {
    grid-template-columns: repeat(2, 1fr);
  } */

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const GridItem = ({ item }) => {
  const { id, v, sourceTitle, categories } = item;

  return (
    <GridItemContainer
      key={id}
      onClick={() => {
        window.open(item.url);
      }}
    >
      <GridHead>
        <ItemImage v={v} title={sourceTitle} />
      </GridHead>
      <GridBody>
        <GridTitle data-tip data-for={`${item.id}`}>
          <MiniIc alt="[Youtube] " src={YoutubeIcon} />
          {sourceTitle}
        </GridTitle>
        {sourceTitle.length > 60 && (
          <ReactTooltip
            id={`${item.id}`}
            className="tooltipCSS"
            effect="solid"
            place="bottom"
          >
            {sourceTitle}
          </ReactTooltip>
        )}
        <ItemCategories>
          {categories.map((category) => (
            <ItemCategory key={category}>{category}</ItemCategory>
          ))}
        </ItemCategories>
      </GridBody>
    </GridItemContainer>
  );
};

const GridItemContainer = styled.div`
  margin: 10px;

  max-width: 320px;
  height: 280px;

  cursor: pointer;

  display: flex;
  flex-direction: column;
`;

const GridHead = styled.div`
  display: flex;
  flex: 0.75;
  border-radius: 1.2em;

  margin-bottom: 10px;
`;

const GridBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.25;
`;

const GridTitle = styled.div`
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* line-height: 1.2em; */
  /* height: 3.6em; */

  font-weight: 600;
  margin-bottom: 1em;
`;
