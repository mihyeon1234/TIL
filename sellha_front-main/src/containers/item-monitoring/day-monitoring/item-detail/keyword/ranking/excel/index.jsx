import React from 'react';
import ReactExport from 'react-data-export';
import { useSelector } from 'react-redux';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;

const ExcelComponent = () => {
  const { excel } = useSelector((state) => state.keywordMonitor);
  const { data, extra } = excel;

  const formatDate = `${new Date().getFullYear()}-${`0${
    new Date().getMonth() + 1
  }`.slice(-2)}-${`0${new Date().getDate()}`.slice(-2)}`;

  const originColumns = Object.keys(data[0]);

  const newColumns = [];
  const emptyColumns = [];
  const newData = [];
  const newExtra = [];

  // 엑셀 컬럼 너비 지정
  originColumns.forEach((element) => {
    newColumns.push({
      title: element,
      width: { wpx: 350 },
    });
    emptyColumns.push({
      title: '',
    });
  });

  // 순위 모니터링 테이블 데이터 스타일링
  data.forEach((element, index) => {
    const dataColumn = Object.keys(element);

    if (index === 0) {
      newData.push(
        dataColumn.map((value) => ({
          value: element[value] || '1600',
          style: {
            border: { top: { style: 'thick', color: { rgb: 'FFDA4F' } } },
          },
        })),
      );
    } else {
      newData.push(
        dataColumn.map((value) => ({
          value: element[value] || '1600',
        })),
      );
    }
  });

  // 메모 및 변경내역 테이블 데이터 스타일링
  extra.forEach((element) => {
    const extraColumn = Object.keys(element);

    newExtra.push(
      extraColumn.map((value, index) =>
        index === 0
          ? {
              value: element[value] || undefined,
              style: {
                font: { sz: '12', bold: true },
              },
            }
          : {
              value: element[value] || undefined,
            },
      ),
    );
  });

  const dataSet = [
    {
      columns: newColumns,
      data: newData,
    },
    {
      ySteps: 0,
      columns: emptyColumns,
      data: newExtra,
    },
  ];

  return (
    <ExcelFile
      hideElement
      filename={`셀하 키워드 모니터링 EXCEL ${formatDate}`}
    >
      <ExcelSheet dataSet={dataSet} name="셀하 키워드 모니터링" />
    </ExcelFile>
  );
};

export default ExcelComponent;
