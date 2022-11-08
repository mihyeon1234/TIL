import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { HiStar } from 'react-icons/hi';
import ReactTooltip from 'react-tooltip';

import { getSellData, getKeywordChart } from 'http-api';
import ProgressBar, { IndicatorIcon, TipBox } from 'components/ProgressBar';
import naverlogo from 'assets/icon/shop_logo_naver.png';

const TableComponent = () => {
  const [saveList, setSaveList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [tip, setTip] = useState('');
  const keywords = useSelector((state) => state.keywordSearch.keyword);

  const columns = [
    {
      title: <STitle>순위</STitle>,
      dataIndex: 'rank',
      align: 'center',
      fixed: 'left',
      width: 80,
      responsive: ['lg'],
      render: (text, row) => {
        if (!text && !row.isBundle) {
          return '-';
        }

        if (row.isAd) {
          return (
            <>
              <SetAd>광고</SetAd>
            </>
          );
        }
        if (row.isBundle) {
          return (
            <>
              <SetBundle>{row.bundleIdx}</SetBundle>
            </>
          );
        }
        return <>{text}</>;
      },
    },
    {
      title: <STitle>이미지</STitle>,
      dataIndex: 'imageUrl',
      align: 'center',
      render: (text) => {
        if (!text) {
          return '-';
        }
        return (
          <>
            <img
              data-tip
              data-for={text}
              src={text}
              alt="이미지"
              style={{
                width: '50px',
                height: '50px',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            />
            <ReactTooltip
              id={text}
              place="left"
              backgroundColor="#FFF"
              effect="solid"
            >
              <img
                alt="이미지"
                src={text}
                style={{
                  width: '150px',
                  height: 'auto',
                }}
              />
            </ReactTooltip>
          </>
        );
      },
    },
    {
      title: <STitle>상품명</STitle>,
      dataIndex: 'productTitle',
      width: '30%',
      render: (text, row) => {
        if (!text) {
          return '-';
        }

        if (row.overseas) {
          return (
            <>
              <Set>해외</Set>
              {text}
            </>
          );
        }
        return <>{text}</>;
      },
    },
    {
      title: <STitle>카테고리</STitle>,
      dataIndex: 'categoryName',
      align: 'center',
      responsive: ['lg'],
      render: (text, row) => (
        <>
          <CategoryName data-tip data-for={String(row.rank)}>
            {text}
          </CategoryName>
          <ReactTooltip
            id={String(row.rank)}
            place="right"
            effect="solid"
            className="tooltipResult"
          >
            <span>{row.categoryFullPath}</span>
          </ReactTooltip>
        </>
      ),
    },
    {
      title: (
        <FlexDiv>
          <TitleDiv data-tip data-for="tooltipSevenDay">
            <STitle>예상매출 / 배송건수</STitle>
            <STitle small>(7일 기준)</STitle>
          </TitleDiv>
          <ReactTooltip
            id="tooltipSevenDay"
            className="tooltipCSS-WeekSales"
            place="top"
            effect="solid"
            backgroundColor="white"
            border
            borderColor="#ebebeb"
          >
            <div>
              <TitleText>예상매출</TitleText>
              <ContentText>
                최근 일주일 배송 건수를 기준으로 계산한 예상 매출
              </ContentText>
            </div>
            <div>
              <TitleText>배송건수</TitleText>
              <ContentText>최근 일주일 간의 배송 건수</ContentText>
            </div>
          </ReactTooltip>
        </FlexDiv>
      ),
      dataIndex: 'weekSales',
      align: 'center',
      width: 150,
      responsive: ['lg'],
      onCell: (_, index) => {
        if (index !== 0) {
          return {
            colSpan: 3,
          };
        }
        return { colSpan: 3 };
      },
      render: (text, row) => {
        if (!text && !row.isBundle) {
          return (
            <>
              <Sales product={row} />
            </>
          );
        }

        return (
          <FlexDiv>
            <STitle>{row.weekSales?.toLocaleString() ?? '외부'}</STitle>
            <STitle>{row.weekSellCount?.toLocaleString() ?? '외부'}</STitle>
            <STitle>{row.threeDaySellCount?.toLocaleString() ?? '외부'}</STitle>
            <STitle>
              {row.threeMonthSellCount?.toLocaleString() ?? '외부'}
            </STitle>
          </FlexDiv>
        );
      },
    },
    {
      title: (
        <FlexDiv>
          <TitleDiv data-tip data-for="tooltipThreeDay">
            <STitle>3일 판매량 </STitle>
          </TitleDiv>
          <ReactTooltip
            id="tooltipThreeDay"
            className="tooltipCSS-WeekSales"
            place="top"
            effect="solid"
            backgroundColor="white"
            border
            borderColor="#ebebeb"
          >
            <div>
              <TitleText>판매량</TitleText>
              <ContentText>최근 3일 동안의 판매 건수</ContentText>
            </div>
          </ReactTooltip>
        </FlexDiv>
      ),
      align: 'center',
      width: 100,
      responsive: ['lg'],
      onCell: (_, index) => {
        if (index !== 0) {
          return {
            colSpan: 0,
          };
        }
        return { colSpan: 0 };
      },
    },
    {
      title: (
        <FlexDiv>
          <TitleDiv data-tip data-for="tooltipThreeMonth">
            <STitle>3개월 판매량 </STitle>
          </TitleDiv>
          <ReactTooltip
            id="tooltipMonth"
            className="tooltipCSS-WeekSales"
            place="top"
            effect="solid"
            backgroundColor="white"
            border
            borderColor="#ebebeb"
          >
            <div>
              <TitleText>판매량</TitleText>
              <ContentText>최근 3개월동안의 판매 건수</ContentText>
            </div>
          </ReactTooltip>
        </FlexDiv>
      ),
      align: 'center',
      width: 100,
      responsive: ['lg'],
      onCell: (_, index) => {
        if (index !== 0) {
          return {
            colSpan: 0,
          };
        }
        return { colSpan: 0 };
      },
    },
    {
      title: <STitle>기본가</STitle>,
      dataIndex: 'price',
      align: 'center',
      render: (text) => {
        if (!text) {
          return '-';
        }
        return `${Number(text).toLocaleString()}`;
      },
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },

    {
      title: <STitle>리뷰</STitle>,
      dataIndex: 'reviewCount',
      align: 'center',
      responsive: ['lg'],
      render: (text, row) => {
        if (!text) {
          return '0';
        }

        return (
          <ReviewBox>
            <span>{Number(row.reviewCount).toLocaleString()}개</span>
            <ReviewScore>
              <HiStar size="1.1em" color="#00ae0099" />
              {row.scores}
            </ReviewScore>
          </ReviewBox>
        );
      },
      sorter: {
        compare: (a, b) => a.reviewCount - b.reviewCount,
      },
    },

    {
      title: <STitle>찜</STitle>,
      dataIndex: 'keepCount',
      align: 'center',
      responsive: ['lg'],
      render: (text) => {
        if (!text) {
          return '0';
        }

        return `${text.toLocaleString()}`;
      },
      sorter: {
        compare: (a, b) => a.keepCount - b.keepCount,
      },
    },

    {
      title: <STitle>등록일</STitle>,
      dataIndex: 'openDate',
      align: 'center',
      responsive: ['lg'],
      render: (text) => {
        if (!text) {
          return '-';
        }

        return `${text.slice(2, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
      },
      sorter: {
        compare: (a, b) => a.openDate - b.openDate,
      },
    },
    {
      title: <STitle>판매자</STitle>,
      dataIndex: 'seller',
      render: (text, row) => {
        if (!text) {
          return '판매중단';
        }
        if (typeof text === 'string') {
          const isNaver =
            row.url.includes('smartstore') ||
            row.url.includes('shopping.naver') ||
            row.url.includes('brand');
          return (
            <SellerDiv>
              <SellerName data-tip data-for={text}>
                {(row.isSmartStore || isNaver) && <NaverLogo />}
                {text}
              </SellerName>
              <SellerGrade>{row.mallGradeCode}</SellerGrade>
            </SellerDiv>
          );
        }
        if (!row.seller) return '-';

        return (
          <NameCenter>
            {row.isBrandStore === 0 && <LowPriceMall>최저가</LowPriceMall>}
            {row.isBrandStore === 1 && <BrandMall>브랜드</BrandMall>}
            {row.isSmartStore && <NaverLogo />}
            <SellCount>판매처 {row.mallCount.toLocaleString()}</SellCount>
          </NameCenter>
        );
      },
    },
  ];
  function Sales({ product }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [sellData, setSellData] = useState({});

    const [status, setStatus] = useState(false);

    const handleButton = useCallback(async (e) => {
      e.stopPropagation();

      setLoading(true);
      getSellData({ product })
        .then((data) => {
          setSellData(data);
          setSuccess(true);
          setStatus(0);
        })
        .catch((err) => {
          setSellData();
          setSuccess(false);
          setStatus(err.response.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    // 광고 태그
    if (product.isAd) {
      return <SetAd>광고</SetAd>;
    }

    // 외부 태그
    if (
      !product.url.includes('smartstore') &&
      !product.url.includes('shopping.naver')
    ) {
      return <OutsideMall>외부</OutsideMall>;
    }

    // 광고, 외부, 개인셀러가 아닌 경우
    if (typeof product.seller !== 'string' || status === 404) {
      // 브랜드 태그 or 묶음 태그
      return (
        <>
          {product.isBrandStore ? (
            <BrandMall>브랜드</BrandMall>
          ) : (
            <LowPriceMall>최저가</LowPriceMall>
          )}
        </>
      );
    }

    if (loading) {
      return <LoadingOutlined />;
    }

    if (!success) {
      return <CheckButton onClick={handleButton}>확인 🔍</CheckButton>;
    }

    if (!sellData.weekSellCount) {
      return (
        <FlexDiv>
          <NotDataTag data-tip data-for="tooltipNotData">
            데이터 없음
          </NotDataTag>
          <ReactTooltip
            id="tooltipNotData"
            place="right"
            effect="solid"
            className="tooltipCSS-NotData"
          >
            2주 내 배송 건수가 5건 미만인 상품은
            <br /> 데이터가 집계되지 않습니다.
          </ReactTooltip>
        </FlexDiv>
      );
    }

    return (
      <FlexDiv>
        <STitle>
          {sellData?.weekSales?.toLocaleString()} /{' '}
          {sellData?.weekSellCount?.toLocaleString()}
        </STitle>
        <STitle>{sellData?.threeDaySellCount?.toLocaleString()}</STitle>
        <STitle>{sellData?.threeMonthSellCount?.toLocaleString()}</STitle>
      </FlexDiv>
    );
  }

  const fetchList = async () => {
    setListLoading(true);

    const resRealTimeChart = await getKeywordChart({
      keyword: keywords,
    });
    setSaveList(resRealTimeChart);
    setListLoading(false);
  };

  const onClickRow = (row) => {
    if (row.url) {
      window.open(row.url);
    }
  };

  useEffect(() => {
    fetchList();
    return () => {
      setSaveList([]);
    };
  }, []);

  return (
    <>
      <ProgressBar isAnimating={listLoading} setTip={setTip} />
      <Table
        sticky="true"
        rowKey={(record) => record.url + record.rank + record?.bundleRank}
        columns={columns}
        dataSource={saveList}
        pagination={false}
        scroll={{
          x: 1400,
        }}
        loading={{
          indicator: <></>,
          spinning: listLoading,
          tip: (
            <>
              <IndicatorIcon />
              <TipBox>{tip}</TipBox>
            </>
          ),
        }}
        showSorterTooltip={false}
        rowClassName="product-row"
        onRow={(row) => ({
          onClick: () => onClickRow(row),
        })}
        expandable={{
          expandRowByClick: true,
          expandIcon: ({ expanded }) => (expanded ? <></> : <></>),
          // indentSize: 5,
        }}
      />
    </>
  );
};

export default TableComponent;
const TitleDiv = styled.div`
  cursor: pointer;
`;

const STitle = styled.div`
  font-size: ${(props) => props.small && '10px'};
  font-weight: 500;
  text-align: center;
  width: 100%;
  min-width: 25px;
  @media ${(props) => props.theme.mobile} {
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .tooltipCSS-NotData {
    width: 24em;
    font-size: 0.75em;
    font-weight: 300;
    border-radius: 1em;
  }
  .tooltipCSS-WeekSales {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 20rem;
    border-radius: 1em;
    padding: 0.7rem;
  }
`;

const TitleText = styled.span`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin: 0 5px 5px 0;
  padding: 0 5px;

  border-radius: 2px;

  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
  font-size: 0.7rem;
`;

const ContentText = styled.span`
  color: black;
  font-size: 0.7rem;
`;

const NaverLogo = styled.div`
  background: url('${naverlogo}') no-repeat 50%;
  background-size: 12px 12px;
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: text-bottom;
  margin-right: 2px;
  flex-shrink: 0;
`;

const Set = styled.span`
  line-height: 1.8;
  background-color: ${(props) => props.theme.colors.blue}; // #dbf4ff;
  color: ${(props) => props.theme.colors.white}; // #0077ff;
  border-radius: 0.5em;
  font-size: 0.55em;
  margin: 0.2em 0.2em 0.2em 0;
  padding: 0.3em 0.8em;
`;

const TagStyle = styled.span`
  width: fit-content;
  border-radius: 0.35em;
  padding: 4px 12px;
  font-size: 0.7rem;
`;

// const SetAd = styled.span`
//   line-height: 1.8;
//   border: 1px solid ${(props) => props.theme.colors.blue};
//   color: ${(props) => props.theme.colors.blue}; // #0077ff;
//   border-radius: 0.5em;
//   font-size: 0.55em;
//   margin: 0.2em 0.2em 0.2em 0;
//   padding: 0.3em 0.8em;
// `;

const SetAd = styled(TagStyle)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 2px;
`;

const LowPriceMall = styled(TagStyle)`
  background-color: #fff0de;
  color: #ffa636;
  letter-spacing: 2px;
`;

const BrandMall = styled(TagStyle)`
  background-color: #e8fff9;
  color: #59d4bb;
`;

const OutsideMall = styled(TagStyle)`
  background-color: #ebe4e1;
  color: black;
  letter-spacing: 2px;
`;

const CheckButton = styled(TagStyle)`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.black};

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const NotDataTag = styled.span`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.darkGray};
  border: 1px dashed ${(props) => props.theme.colors.gray};
  border-radius: 0.25em;
  padding: 0.1em 0.5em;
  width: fit-content;
  font-size: 0.85em;
`;

const SellCount = styled.span`
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 500;
  margin-left: 0.25em;
  font-size: 0.85em;
`;

const SellerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: 0.85rem;
  width: 85%;
  .tooltipGrade {
    border-radius: 1.25em;
    font-size: 0.95em;
    padding: 0.6em 1em;
  }
  @media ${(props) => props.theme.mobile} {
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
  }
`;

const SellerName = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const SellerGrade = styled.span`
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const NameCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;
  position: relative;
  left: 0.85rem;
  @media ${(props) => props.theme.mobile} {
    left: 0;
    align-items: center;
  }
`;

const CategoryName = styled.span`
  font-size: 0.9em;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 1em;
`;

const ReviewScore = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.85em;
`;

// const CheckButton = styled.button`
//   font-size: 0.73rem;
//   border-radius: 0.25rem;
//   width: 75px;
//   border: 1px solid ${({ theme }) => theme.colors.lightGray};
//   background: ${({ theme }) => theme.colors.white};
//   padding: 5px 3px;
//   :hover,
//   :focus {
//     background: ${({ theme }) => theme.colors.white};
//   }
// `;
const SetBundle = styled.span`
  line-height: 1.8;
  border: 1px solid ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.green};
  border-radius: 0.5em;
  font-size: 0.55em;
  margin: 0.2em 0.2em 0.2em 0;
  padding: 0.3em 0.8em;
`;
