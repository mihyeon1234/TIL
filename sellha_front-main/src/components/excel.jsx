import React, { useEffect, useState } from 'react';
import ReactExport from 'react-data-export';
import styled from 'styled-components';
import { Button } from 'antd';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ExcelFile;

// 아이템 발굴 - 카테고리 차트, 마케팅 도구 - 추천 키워드, 아이템 분석 - 연관 키워드에서 사용합니다

/**
 * antd table column 값을 이용해서 열 제목 만드는 함수
 * 작성자: 장다영
 * 업데이트: 2022.06.30
 * @param {JSON} header antd table column 값
 * @returns excel column 값
 */
function columnDataProcessing(header) {
  const columnData = [];
  // 데이터를 가져올 키
  const dataIdx = [];

  // 열 제목 column 스타일
  const columnStyle = {
    border: { bottom: { style: 'thick', color: { rgb: 'FFDA4F' } } },
    font: { sz: '12', bold: true },
  };

  for (let i = 0; i < header?.length; i += 1) {
    // antd 테이블 열 제목 가져오기(키워드, 매력도, 카테고리, 경쟁률 등등...)
    let title = header[i].title.props.children;
    // title 값이 json을 받아올 경우
    if (typeof title !== 'string') {
      title = header[i].title.props.children[0].props.children;
    }

    // 저장 컬럼은 제외하기 위한 조건
    if (header[i].dataIndex) {
      // 데이터를 가져올때 이용할 키 값 저장
      dataIdx.push(header[i].dataIndex);

      // full path 카테고리 width 넓게 설정
      const customWidth = header[i].dataIndex === 'categoryName' ? 400 : 150;

      columnData.push({
        title,
        width: { wpx: customWidth },
        style: columnStyle,
      });
    }
  }

  return { data: columnData, dataIdx };
}

/**
 * 데이터를 엑셀 데이터로 가공해주는 함수
 * 작성자: 장다영
 * 업데이트: 2022.06.30
 * @param {Array} relatedData
 * @param {Array} dataIdx
 * @returns
 */
function dataProcessing(relatedData, dataIdx) {
  const allData = [];
  for (let i = 0; i < relatedData?.length; i += 1) {
    const rowData = [];

    for (let j = 0; j < dataIdx?.length; j += 1) {
      // 카테고리 이름에 full path 카테고리 넣어주기
      const text =
        dataIdx[j] === 'categoryName'
          ? relatedData[i].fullPath
          : relatedData[i][dataIdx[j]];

      // null 값 오류 처리 및 -1 '-' 로 변경
      if (!text || text === -1) {
        rowData.push({ value: '-' });
      }
      // 소스 일 때: 소스 데이터는 배열이라서 배열 처리 필요
      else if (text && typeof text === 'object') {
        let source = '';
        for (let k = 0; k < text?.length; k += 1) {
          source += text[k];

          if (text.length - 1 !== k) {
            source += '/';
          }
        }
        rowData.push({ value: source });
      } else {
        rowData.push({ value: text });
      }
    }

    allData.push(rowData);
  }

  return allData;
}

function index({ keyword, header, rowData, service }) {
  const [check, setCheck] = useState(false);
  const [excelData, setExcelData] = useState();

  // 파일 이름에 오늘 날짜 넣기 위함
  const formatDate = `${new Date().getFullYear()}-${`0${
    new Date().getMonth() + 1
  }`.slice(-2)}-${`0${new Date().getDate()}`.slice(-2)}`;

  useEffect(() => {
    if (rowData?.length > 0) {
      try {
        // 컬럼 데이터 가공
        const result = columnDataProcessing(header);
        // 값 데이터 가공
        const data = dataProcessing(rowData, result.dataIdx);

        // 시트 데이터
        const sheetData = [
          {
            columns: result.data,
            data,
          },
        ];

        setExcelData(sheetData);
        setCheck(true);
      } catch {
        setCheck(false);
      }
    } else {
      setCheck(false);
    }
  }, [rowData]);

  return (
    <Container>
      <ExcelFile
        element={
          <ExcelButton type="button" disabled={!check}>
            엑셀
          </ExcelButton>
        }
        filename={`셀하_${service || ''}_EXCEL_${keyword}_${formatDate}`}
      >
        {check && <ExcelSheet dataSet={excelData} name="sellha_keyword" />}
      </ExcelFile>
    </Container>
  );
}

export default index;

const Container = styled.div`
  width: fit-content;
`;

const ExcelButton = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.green};
  border: 0.1em solid ${(props) => props.theme.colors.green};
  border-radius: 1em;
  font-size: 0.9em;
  margin: 0.85em 0;
  &:hover:enabled,
  &:focus:enabled,
  &:active:enabled {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.green};
    box-shadow: none;
  }
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
