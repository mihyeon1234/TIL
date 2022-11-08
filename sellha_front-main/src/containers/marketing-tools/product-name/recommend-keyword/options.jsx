// import React from 'react';

// import { Link } from 'react-router-dom';

// import { Button } from 'antd';

// import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip';

// const SaveButton = styled(Button)`
//   border: 1.5px solid ${(props) => props.theme.colors.yellow};
//   border-radius: 0.65em;
//   padding: 0.35em 0.55em;
//   height: fit-content;
//   font-size: 0.95em;
//   align-items: center;
//   background-color: ${(props) =>
//     props.save === 'false'
//       ? props.theme.colors.white
//       : props.theme.colors.yellow};
//   color: ${(props) =>
//     props.save === 'false'
//       ? props.theme.colors.yellow
//       : props.theme.colors.white};
//   /* cursor: not-allowed; */
//   &:hover,
//   &:focus,
//   &:focus {
//     background-color: ${(props) =>
//       props.save === 'false'
//         ? props.theme.colors.white
//         : props.theme.colors.yellow};
//     color: ${(props) =>
//       props.save === 'false'
//         ? props.theme.colors.yellow
//         : props.theme.colors.white};
//   }
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
// const SourceTop = styled.span`
//   position: relative;
//   left: 3px;
//   color: #f38680;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #ffe3e1;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 600;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceShop = styled.span`
//   position: relative;
//   left: 3px;
//   color: #51d7a2;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #caf7e5;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceAd = styled.span`
//   position: relative;
//   left: 3px;
//   color: #7bcbea;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #d1eef9;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const SourceSearch = styled.span`
//   position: relative;
//   left: 3px;
//   color: #ffa638;
//   padding: 1px 5px;
//   text-align: center;
//   border: 1px solid #f5dcbe;
//   border-radius: 2px;
//   font-size: 10px;
//   font-weight: 500;
//   margin-right: 3px;
//   line-height: 4px;
// `;

// const columns = [
//   {
//     title: <>찜하기</>,
//     width: '6%',
//     align: 'center',
//     responsive: ['lg'],
//     render: (text) => {
//       if (!text) {
//         return '-';
//       }
//       return (
//         <SaveButton
//           save="true"
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         >
//           찜하기
//         </SaveButton>
//       );
//     },
//   },
//   {
//     title: <>키워드</>,
//     dataIndex: 'relKeyword',
//     width: '13%',

//     render: (text, row) => (
//       <Link
//         to="/keyword"
//         target="_blank"
//         onClick={() => {
//           localStorage.setItem('searchKeyword', text);
//         }}
//       >
//         <KeywordLink>
//           {text}
//           {row.source &&
//             row.source.map((tag) => {
//               if (tag === '광고') return <SourceAd key={tag}>{tag}</SourceAd>;
//               if (tag === '쇼핑')
//                 return <SourceShop key={tag}>{tag}</SourceShop>;
//               if (tag === '통합')
//                 return <SourceSearch key={tag}>{tag}</SourceSearch>;
//               if (tag === '인기') return <SourceTop key={tag}>{tag}</SourceTop>;
//               return <></>;
//             })}
//         </KeywordLink>
//       </Link>
//     ),
//   },
//   {
//     title: <>카테고리</>,
//     dataIndex: 'categoryName',
//     width: '10%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return (
//         <>
//           <span data-tip data-for={row.relKeyword}>
//             {row.categoryName}
//           </span>
//           <ReactTooltip id={row.relKeyword} place="right" effect="solid">
//             <span>{row.fullPath}</span>
//           </ReactTooltip>
//         </>
//       );
//     },
//     onFilter: (value, record) => record.source.indexOf(value) !== -1,
//   },
//   {
//     title: <>광고 경쟁 강도</>,
//     dataIndex: 'compIdx',
//     width: '10%',
//     responsive: ['lg'],
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.compIdx}`;
//     },
//   },
//   {
//     title: <>노출횟수</>,
//     dataIndex: 'exposedCount',
//     width: '10%',
//     align: 'center',
//     defaultSortOrder: 'descend',

//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.exposedCount}`;
//     },
//     sorter: {
//       compare: (a, b) => a.exposedCount - b.exposedCount,
//     },
//   },

//   {
//     title: <>경쟁률</>,
//     dataIndex: 'compete',
//     width: '8%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.compete.toLocaleString()}`;
//     },
//     sorter: {
//       compare: (a, b) => a.compete - b.compete,
//     },
//   },
//   {
//     title: <>월간 검색수</>,
//     dataIndex: 'searchAmount',
//     width: '10%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.searchAmount.toLocaleString()}`;
//     },
//     sorter: {
//       compare: (a, b) => a.searchAmount - b.searchAmount,
//     },
//   },
//   {
//     title: <>상품수</>,
//     dataIndex: 'productAmount',
//     width: '8%',
//     align: 'center',
//     render: (text, row) => {
//       if (!text) {
//         return '-';
//       }
//       return `${row.productAmount.toLocaleString()}`;
//     },
//     sorter: {
//       compare: (a, b) => a.productAmount - b.productAmount,
//     },
//   },
// ];

// // eslint-disable-next-line import/prefer-default-export
// export { columns, data };
