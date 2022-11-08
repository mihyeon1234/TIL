import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

import NaverBlog from 'assets/icon/naverblog.png';
import NaverCafe from 'assets/icon/navercafe.png';
import Kakao from 'assets/icon/kakaoblog.png';
import Youtube from 'assets/icon/youtube.png';
import { useSelector } from 'react-redux';
import useWindowSize from 'hooks/useWindowSize';

const TableComponent = ({ setIframeLink }) => {
  const windowSize = useWindowSize();
  const isTablet = windowSize.width < 1220;

  const { loading, contentList } = useSelector(
    (state) => state.contentResearch,
  );

  const setFlatform = (source, row) => {
    if (source.includes('kakao')) {
      return (
        <CategoryName key={`${source}${row.link}${row.title}`}>
          <SKakao />
          {source.includes('Blog') ? (
            <PlatformText>블로그</PlatformText>
          ) : (
            <PlatformText>카페</PlatformText>
          )}
        </CategoryName>
      );
    }
    if (source.includes('naver')) {
      return (
        <CategoryName key={`${source}${row.link}${row.title}`}>
          {source.includes('Blog') ? (
            <>
              <SNaverBlog />
              <PlatformText>블로그</PlatformText>
            </>
          ) : (
            <>
              <SNaverCafe />
              <PlatformText>카페</PlatformText>
            </>
          )}
        </CategoryName>
      );
    }
    if (source.includes('youtube')) {
      return (
        <CategoryName key={`${source}${row.link}${row.title}`}>
          <SYoutube />
          <PlatformText>유튜브</PlatformText>
        </CategoryName>
      );
    }
    return null;
  };

  const renderIconByRowType = (type) => {
    switch (type) {
      case 'naverBlog':
        return {
          icon: <SNaverBlog />,
          label: '블로그',
        };
      case 'naverCafe':
        return { icon: <SNaverCafe />, label: '카페' };
      case 'kakaoBlog':
        return { icon: <SKakao />, label: '블로그' };
      case 'kakaoCafe':
        return { icon: <SKakao />, label: '카페' };
      default:
        <></>;
    }
    return <></>;
  };

  const filterValue = ['naverBlog', 'naverCafe', 'kakaoBlog', 'kakaoCafe'].map(
    (type) => ({
      text: (
        <>
          {renderIconByRowType(type).icon}
          <PlatformText>{renderIconByRowType(type).label}</PlatformText>
        </>
      ),
      value: type,
    }),
  );

  const columns = [
    {
      title: '플랫폼',
      dataIndex: 'type',
      width: '15%',
      align: 'center',
      responsive: ['lg'],
      render: (text = '-', row) =>
        text.map((source) => setFlatform(source, row)),
      filters: filterValue,
      onFilter: (value, { type }) => type.includes(value),
    },
    {
      title: '제목',
      dataIndex: 'title',
      width: '60%',
      align: 'left',
      render: (text, row) => (
        <TitleLink
          onClick={() => {
            if (isTablet) {
              window.open(row.link);
            } else {
              setIframeLink(`${row.link}`);
            }
          }}
        >
          <TabletIcons>{renderIconByRowType(row.type[0]).icon}</TabletIcons>
          <TitleText>{text}</TitleText>
        </TitleLink>
      ),
      filters: isTablet && filterValue,
      onFilter: (value, { type }) => type.includes(value),
    },
    {
      title: '게시일',
      dataIndex: 'date',
      width: '25%',
      align: 'center',
      render: (text = '-') => <SDate>{text}</SDate>,
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => new Date(a.date) - new Date(b.date),
      },
    },
  ];

  return (
    <TableBody
      rowKey={(data) => `${data.link}${data.title}`}
      columns={columns}
      dataSource={contentList}
      showSorterTooltip={false}
      pagination={false}
      sticky
      locale={{
        emptyText:
          !loading && '키워드를 입력하면 콘텐츠 결과를 볼 수 있습니다.',
        filterConfirm: '적용',
        filterReset: '초기화',
        filterEmptyText: '결과가 없습니다.',
      }}
    />
  );
};

export default TableComponent;

const TabletIcons = styled.span`
  display: none;
  @media ${(props) => props.theme.tablet} {
    display: inline;
  }
`;
const TitleLink = styled.div`
  width: fit-content;
`;

const TitleText = styled.span`
  :hover {
    cursor: pointer;
    background: linear-gradient(to top, #ffd94f84 38%, transparent 35%);
  }
`;

const CategoryName = styled.span`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlatformText = styled.span`
  font-size: 0.8rem;
`;

const SNaverBlog = styled.div`
  background: url('${NaverBlog}') no-repeat 50%;
  background-size: 15px 15px;
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-bottom;
  margin-right: 3px;
  flex-shrink: 0;
  padding-top: -5px;
`;

const SNaverCafe = styled.div`
  background: url('${NaverCafe}') no-repeat 50%;
  background-size: 15px 15px;
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-bottom;
  margin-right: 3px;
  flex-shrink: 0;
`;

const SKakao = styled.div`
  background: url('${Kakao}') no-repeat 50%;
  background-size: 15px 15px;
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-bottom;
  margin-right: 3px;
  flex-shrink: 0;
`;

const SYoutube = styled.div`
  background: url('${Youtube}') no-repeat 50%;
  background-size: 15px 15px;
  display: inline-block;
  width: 14px;
  height: 14px;
  vertical-align: text-bottom;
  margin-right: 3px;
  flex-shrink: 0;
`;

const SDate = styled.div`
  margin-left: -1em;
`;

const TableBody = styled(Table)`
  & thead > tr:nth-child(1) > th {
    font-size: 0.8rem;
    background: ${(props) => props.theme.colors.white};
    border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  }

  .ant-table-cell {
    font-size: 0.8rem;
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }
    ::before {
      background-color: transparent !important;
    }
  }

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-table-filter-trigger:hover {
    background: #fff;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover,
  .ant-table-thead th.ant-table-column-sort {
    background: #fff;
  }

  td.ant-table-column-sort {
    background: #fff;
  }
`;
