import React, { useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import AWS from 'aws-sdk';
import s3DefaultConfig from 'config';
import { LoadingOutlined } from '@ant-design/icons';

const s3 = new AWS.S3(s3DefaultConfig);

function index() {
  // 전체 엑셀 다운로드 속도 느려서 버튼에 로딩 추가
  const [excelLoading, setExcelLoading] = useState(false);
  const { selectReal, category1List } = useSelector((state) => state.discover);
  const { loading, lastUpdated } = useSelector((state) => state.keywordChart);

  // s3에서 엑셀 다운로드 받아오기
  async function downloadS3File(params, name) {
    return new Promise((resolve, reject) => {
      // 파일이 존재하는지 체크
      s3.headObject(params, async (err) => {
        setExcelLoading(true);
        // 파일 없으면 알림창 띄우기
        if (err) {
          if (name !== '전체') {
            setExcelLoading(false);
            Swal.fire({
              // html: '🚨 엑셀 데이터가 없습니다.<br />오류가 계속되면 1:1문의 주세요!',
              html: '앗, 일시적으로 문제가 생겨 개발자들이 열심히 복구 중입니다! 🔥<br />이용에 불편을 드려 죄송합니다.',
              confirmButtonText: `확인`,
              confirmButtonColor: '#FFC83A',
              width: 650,
              allowEnterKey: false,
            });
          }

          reject();
        } else {
          s3.getObject(params, (error, res) => {
            const csvBlob = new Blob([res.Body], {
              type: res.ContentType,
            });

            resolve({ csv: csvBlob, name });
          });
        }
      });
    });
  }

  function downloadFileForATag({ result }) {
    const fileDate = `${new Date().getFullYear()}-${`0${
      new Date().getMonth() + 1
    }`.slice(-2)}-${`0${new Date().getDate()}`.slice(-2)}`;

    // 파일 이름에는 오늘 날짜 넣기
    for (let i = 0; i < result?.length; i += 1) {
      // Convert your blob into a Blob URL
      const blobUrl = URL.createObjectURL(result[i].csv);
      const link = document.createElement('a');
      link.href = blobUrl;
      const fileName =
        result[i].name === '전체'
          ? '셀하 아이템 발굴 EXCEL_전체.xlsx'
          : `셀하 아이템 발굴 EXCEL_${result[i].name}_${fileDate}.csv`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      // 다운로드 후 링크 삭제
      document.body.removeChild(link);

      if (result.length === i + 1) {
        // 다운로드 완료 후 로딩 해제
        setExcelLoading(false);
      }
    }
  }

  async function allCategoryExcelFile({ excelDate, fileData }) {
    const promise = [];
    // 카테고리 1의 모든 엑셀 데이터 다운로드
    for (let i = 0; i < category1List.length; i += 1) {
      const allParams = {
        Bucket: `sellha-excel`,
        Key: `keywordData1/EXCEL_${excelDate}/${category1List[i].id}_${excelDate}.csv`,
      };
      const download = downloadS3File(allParams, category1List[i].name);
      promise.push(download);
    }

    const result = await Promise.all(promise);
    downloadFileForATag({ result, fileData });
  }

  /**
   * s3에서 엑셀 파일 다운로드 이벤트
   * 전체: 테이블 상단 데이터 업데이트 옆에 있는 날짜 이용해서 엑셀 다운로드
   * 그 외: crawledDate 이용해서 엑셀 다운로드
   * 작성자: 장다영
   * 업데이트: 2022.07.07
   */
  async function excelDownload() {
    let date = '';

    if (!selectReal.crawledDate) {
      // 전체
      // 데이터 업데이트 날짜 - 7
      const time = new Date(lastUpdated).getTime() - 1000 * 60 * 60 * 24 * 7;
      const day = new Date(time);
      const yyyymmdd = `${day.getFullYear()}-${`0${day.getMonth() + 1}`.slice(
        -2,
      )}-${`0${day.getDate()}`.slice(-2)}`;
      date = yyyymmdd.toString();
    } else {
      // 전체 제외 모두
      date = selectReal.crawledDate;
    }

    const excelDate = date.replaceAll('-', '').substr(2);

    const file =
      selectReal.id === 'all'
        ? 'sellha_all.xlsx'
        : `${selectReal.id}_${excelDate}.csv`;

    const params = {
      Bucket: `sellha-excel`,
      Key: `keywordData1/EXCEL_${excelDate}/${file}`,
    };

    const promise = [];
    promise.push(
      downloadS3File(params, selectReal.name || selectReal.fullPath),
    );

    try {
      const result = await Promise.all(promise);
      downloadFileForATag({ result });
    } catch {
      // 전체 엑셀파일 없으면 1분류 카테고리의 엑셀파일 전체 가져오기
      if (selectReal.id === 'all') allCategoryExcelFile({ excelDate });
    }
  }

  return (
    /**
     * 버튼 disabled 이유:
     * loading: 로딩 완료되기 전에는 lastUpdated를 가져올 수 없어서 전체 데이터 가져올 수 없음
     * excelLoading: 전체 데이터 가져올때 오래걸려서 로딩 보여주면서 기능 막기
     * 작성자: 장다영
     * 업데이트: 2022.07.07
     */
    <Excel disabled={loading || excelLoading} onClick={() => excelDownload()}>
      {!excelLoading ? '엑셀' : '받아오는 중'}
      {excelLoading && <LoadingOutlined />}
    </Excel>
  );
}

export default index;

const Excel = styled(Button)`
  width: fit-content;
  height: 3em;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.green};
  border: 0.1em solid ${(props) => props.theme.colors.green};
  border-radius: 1em;
  font-size: 0.9em;
  &:hover,
  &:focus,
  &:active {
    font-weight: 600;
    border: 0.1em solid ${(props) => props.theme.colors.green};
    color: ${(props) => props.theme.colors.green};
    box-shadow: none;
  }

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
