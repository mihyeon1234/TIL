// import React from 'react';
// import styled from 'styled-components';
// import { Button } from 'antd';
// import ReactTooltip from 'react-tooltip';
// import { Link } from 'react-router-dom';

// function convertCompete(compete) {
//   if (compete < 100) {
//     return `1 : ${compete.toFixed(2)}`;
//   }
//   return `1 : ${Math.round(compete)}`;
// }

// const LStitle = styled.div`
//   font-weight: 700;
//   text-align: left;
//   @media ${(props) => props.theme.mobile} {
//   }
// `;

// const CStitle = styled.div`
//   font-weight: 700;
//   text-align: center;
//   @media ${(props) => props.theme.mobile} {
//   }
// `;

// const SaveButton = styled(Button)`
//   border: 1.5px solid ${(props) => props.theme.colors.orange};
//   border-radius: 0.65em;
//   padding: 0.35em 0.55em;
//   height: fit-content;
//   font-size: 0.95em;
//   align-items: center;
//   background-color: ${(props) =>
//     props.save === 'false'
//       ? props.theme.colors.white
//       : props.theme.colors.orange};
//   color: ${(props) =>
//     props.save === 'false'
//       ? props.theme.colors.orange
//       : props.theme.colors.white};
//   cursor: not-allowed;

//   .tooltipSave {
//     border-radius: 1.25em;
//     font-size: 1em;
//     color: black;
//     padding: 0.6em 1em;
//   }
//   @media ${(props) => props.theme.mobile} {
//   }
// `;

// const TooltipContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   > div {
//     padding: 3px 0;
//     > span:nth-child(2) {
//       padding-left: 5px;
//     }
//   }
// `;

// const SourceTop = styled.span`
//   position: relative;
//   left: 3px;
//   color: #ff3e33;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #ffcac7;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 600;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceShop = styled.span`
//   position: relative;
//   left: 3px;
//   color: #39b584;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #88d2b4;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceAd = styled.span`
//   position: relative;
//   left: 3px;
//   color: #faad14;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #ffe6b4;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceSearch = styled.span`
//   position: relative;
//   left: 3px;
//   color: #03c75a;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #87e4b0;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const KeywordLink = styled.div`
//   width: fit-content;
//   font-size: 0.95em;
//   margin-right: 0.3em;

//   :hover {
//     cursor: pointer;
//     background: linear-gradient(
//       to top,
//       rgb(255, 222, 135) 30%,
//       transparent 30%
//     );
//   }
// `;
// const CategoryName = styled.span`
//   font-size: 0.9em;
// `;

// const columns = [
//   {
//     title: <CStitle>저장</CStitle>,
//     width: '6%',
//     align: 'center',
//     responsive: ['lg'],
//     render: () => (
//       <SaveButton
//         type="button"
//         save="false"
//         data-tip
//         data-for="tooltipSave"
//         onClick={() => {
//           // 저장하는 기능
//         }}
//       >
//         저장
//         <ReactTooltip
//           id="tooltipSave"
//           place="left"
//           effect="solid"
//           className="tooltipSave"
//           backgroundColor="#FFDA4F"
//           delayShow={100}
//         >
//           <span>준비 중🐝</span>
//         </ReactTooltip>
//       </SaveButton>
//     ),
//   },
//   {
//     title: <LStitle>키워드</LStitle>,
//     dataIndex: 'relKeyword',
//     width: '15%',

//     render: (text) => (
//       <Link
//         to="/keyword"
//         target="_blank"
//         onClick={() => {
//           localStorage.setItem('searchKeyword', text);
//         }}
//       >
//         <KeywordLink>{text}</KeywordLink>
//       </Link>
//     ),
//   },
//   {
//     title: (
//       <LStitle data-tip data-for="tooltip-source">
//         소스
//         <ReactTooltip
//           id="tooltip-source"
//           className="tooltip-source"
//           place="top"
//           effect="solid"
//         >
//           <div>네이버의 연관 키워드를 4가지로 분류해 제공합니다.</div>
//           <TooltipContent>
//             <div>
//               <SourceTop>인기</SourceTop>
//               <span>해당 키워드가 속한 대표 카테고리의 TOP 50 인기 키워드</span>
//             </div>
//             <div>
//               <SourceSearch>통합</SourceSearch>
//               <span>네이버 통합 검색의 연관 검색어</span>
//             </div>
//             <div>
//               <SourceShop>쇼핑</SourceShop>
//               <span>네이버 쇼핑 검색의 연관 검색어</span>
//             </div>
//             <div>
//               <SourceAd>광고</SourceAd>
//               <span>네이버 광고 시스템 키워드 도구의 연관 검색어</span>
//             </div>
//           </TooltipContent>
//         </ReactTooltip>
//       </LStitle>
//     ),

//     width: '12%',
//     dataIndex: 'source',
//     render: (source = []) => {
//       if (source && source.length > 0) {
//         // return <PaperClipOutlined onClick={() => window.open(data[0])} />;
//         return (
//           <>
//             {source &&
//               source.map((tag) => {
//                 if (tag === '광고') return <SourceAd>{tag}</SourceAd>;
//                 if (tag === '쇼핑') return <SourceShop>{tag}</SourceShop>;
//                 if (tag === '통합') return <SourceSearch>{tag}</SourceSearch>;
//                 if (tag === '인기') return <SourceTop>{tag}</SourceTop>;
//                 return <></>;
//               })}
//           </>
//         );
//       }
//       return <></>;
//     },

//     filters: [
//       {
//         text: '인기',
//         value: '인기',
//       },
//       {
//         text: '통합',
//         value: '통합',
//       },
//       {
//         text: '쇼핑',
//         value: '쇼핑',
//       },
//       {
//         text: '광고',
//         value: '광고',
//       },
//     ],
//     onFilter: (value, record) => record.source.indexOf(value) !== -1,
//   },
//   {
//     title: <CStitle>카테고리</CStitle>,
//     dataIndex: 'categoryName',
//     width: '10%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return (
//         <>
//           <CategoryName data-tip data-for={row.relKeyword}>
//             {text}
//           </CategoryName>
//           <ReactTooltip id={row.relKeyword} place="right" effect="solid">
//             <span>{row.fullPath}</span>
//           </ReactTooltip>
//         </>
//       );
//     },
//   },
//   {
//     title: <CStitle>광고 경쟁 강도</CStitle>,
//     dataIndex: 'compIdx',
//     width: '10%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.compIdx}`;
//     },
//   },
//   {
//     title: (
//       <CStitle data-tip data-for="tooltip-competive">
//         경쟁률
//         <ReactTooltip
//           id="tooltip-competive"
//           className="tooltip-competive"
//           place="top"
//           effect="solid"
//         >
//           상품수 대비 검색수가 많을수록 경쟁정도 수치가 높습니다.
//         </ReactTooltip>
//       </CStitle>
//     ),
//     dataIndex: 'compete',
//     align: 'center',
//     width: '10%',

//     render: (text) => {
//       if (!text) {
//         return '-';
//       }

//       return text.toLocaleString();
//     },
//     sorter: {
//       compare: (a, b) => a.compete - b.compete,
//     },
//   },
//   {
//     title: (
//       <CStitle data-tip data-for="tooltip-topcount">
//         노출 횟수
//         <ReactTooltip
//           id="tooltip-topcount"
//           className="tooltip-topcount"
//           place="top"
//           effect="solid"
//         >
//           네이버 쇼핑 상위 80개 상품의 상품명으로 노출된 횟수입니다.
//         </ReactTooltip>
//       </CStitle>
//     ),
//     dataIndex: 'exposedCount',
//     align: 'center',
//     width: '10%',
//     defaultSortOrder: 'descend',
//     render: (text) => {
//       if (!text) {
//         return '-';
//       }

//       return text.toLocaleString();
//     },
//     sorter: {
//       compare: (a, b) => a.exposedCount - b.exposedCount,
//     },
//   },
//   {
//     title: <CStitle>월간 검색수</CStitle>,
//     dataIndex: 'searchAmount',
//     align: 'center',
//     width: '15%',

//     render: (text) => {
//       if (!text) {
//         return '-';
//       }

//       return text.toLocaleString();
//     },
//     sorter: {
//       compare: (a, b) => a.searchAmount - b.searchAmount,
//     },
//   },
//   {
//     title: <CStitle>상품수</CStitle>,
//     dataIndex: 'productAmount',
//     align: 'center',
//     width: '15%',

//     render: (text) => {
//       if (!text) {
//         return '-';
//       }

//       return text.toLocaleString();
//     },
//     sorter: {
//       compare: (a, b) => a.productAmount - b.productAmount,
//     },
//   },
// ];

// eslint-disable-next-line import/prefer-default-export
// export { columns };
