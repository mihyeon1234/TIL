import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { CloseOutlined, PaperClipOutlined } from '@ant-design/icons';
import AWS from 'aws-sdk';

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Table } from 'antd';
import { removeProject } from 'http-api';
import { DeleteButton } from 'containers/item-research/keyword-research/keyword-list/style';
import Swal from 'sweetalert2';
import s3DefaultConfig from '../../../../../config/index';

const s3 = new AWS.S3(s3DefaultConfig);

export default function index({
  target,
  setModalPage,
  setUploadForm,
  setIsModalVisible,
  fetchList,
}) {
  const { teamData, userData, loading } = useSelector((state) => state.project);
  const { teamId, id } = useSelector((state) => state.user);
  const { email } = useSelector((state) => state.user);
  const [visibleIds, setVisibleIds] = useState([]);

  const isVisible = (rowId) => visibleIds.includes(rowId);
  const readFiledata = (value, isEmail = true) => {
    s3.headObject(
      {
        Bucket: 'sellerbee',
        Key: `marketanalysis/${isEmail ? `${email}/${value}` : value}`,
      },
      (error) => {
        if (error) {
          Swal.fire({
            html: '🚨 파일 데이터가 없습니다.',
            confirmButtonText: `확인`,
            confirmButtonColor: '#FFC83A',
            allowEnterKey: false,
          });
        } else {
          const defaultUrl = `https://sellerbee.s3.ap-northeast-2.amazonaws.com/marketanalysis/`;
          window.open(
            `${defaultUrl}${
              isEmail
                ? `${encodeURIComponent(email)}/${encodeURIComponent(value)}`
                : encodeURIComponent(value)
            }`,
          );
        }
      },
    );
  };

  const columns = [
    {
      title: <LStitle>키워드</LStitle>,
      dataIndex: 'mainKeyword',
      width: '15%',

      render: (text) => {
        if (!text) {
          return '-';
        }
        return `${text.replace(/\s/gi, '')}`;
      },
    },
    {
      title: <LStitle>세부 키워드</LStitle>,
      dataIndex: 'subKeywords',
      width: '21%',
      render: (text = []) => {
        if (!text) {
          return '-';
        }
        return text.join(', ');
      },
    },

    {
      title: <LStitle>진행 단계</LStitle>,
      dataIndex: 'progress',
      width: '15%',
      render: (text, row) => {
        if (!text) {
          return '-';
        }
        return (
          <>
            <span data-tip data-for={row.updatedAt}>
              {text}
            </span>
            <ReactTooltip id={row.updatedAt} place="right">
              <span>{row.projectType}</span>
            </ReactTooltip>
          </>
        );
      },
    },
    {
      title: <LStitle>참고 내용</LStitle>,
      dataIndex: 'contents',
      width: '15%',
      responsive: ['lg'],
      render: (text) => {
        if (!text) {
          return '-';
        }
        return text;
      },
    },
    {
      title: <CStitle>담당자</CStitle>,
      dataIndex: 'managerNames',
      align: 'center',
      width: '10%',
      responsive: ['lg'],
      render: (text) => {
        if (!text) {
          return '-';
        }
        return text[0];
      },
    },
    {
      title: <CStitle>종료일</CStitle>,
      dataIndex: 'closingDate',
      align: 'center',
      width: '10%',

      render: (text) => {
        if (!text) {
          return '-';
        }
        return text;
      },
      sorter: {
        compare: (a, b) => new Date(a.closingDate) - new Date(b.closingDate),
      },
    },
    {
      title: <CStitle>파일</CStitle>,
      dataIndex: 'files',
      align: 'center',
      width: '70px',
      responsive: ['lg'],
      // eslint-disable-next-line consistent-return
      render: (data = [], row) => {
        if (data && data.length > 0 && data[0] !== null) {
          // return <PaperClipOutlined onClick={() => window.open(data[0])} />;
          return (
            <>
              <PaperClipOutlined
                onClick={() =>
                  // 클릭한 파일의 id 저장(보여줄 파일 id)
                  setVisibleIds((prev) =>
                    prev.includes(row.id)
                      ? prev.filter((v) => v !== row.id)
                      : [...prev, row.id],
                  )
                }
              />
              {data.map((value) => (
                <FileDiv
                  key={value?.toString()}
                  data-tip
                  data-for="tooltip-flie"
                  visible={isVisible(row.id).toString()}
                  onClick={() => {
                    if (value.includes('https://')) {
                      readFiledata(`${value?.toString().split('/')[4]}`, false);
                    } else {
                      readFiledata(value);
                    }
                  }}
                >
                  {value.includes('https://')
                    ? value?.toString().split('/')[4]
                    : value}
                  <ReactTooltip id="tooltip-flie" place="bottom" effect="solid">
                    클릭하여 열기
                  </ReactTooltip>
                </FileDiv>
              ))}
            </>
          );
        }

        return <></>;
      },
    },

    {
      width: '4%',
      align: 'center',
      responsive: ['lg'],
      render: (row) =>
        row.userId === id ? (
          <DeleteButton
            onClick={async (e) => {
              e.stopPropagation();
              if (row.files && row.files.length > 0 && row.files[0] !== null) {
                await s3.deleteObject(
                  {
                    Bucket: 'sellerbee',
                    Key: row.files[0].includes('https://')
                      ? `marketanalysis/${row.files[0]}`
                      : `marketanalysis/${email}/${row.files[0]}`,
                  },
                  async (err) => {
                    if (!err) {
                      await removeProject(row.id);
                      fetchList();
                    } else {
                      Swal.fire('삭제를 실패했습니다.', '', 'error');
                    }
                  },
                );
              } else {
                await removeProject(row.id);
                fetchList();
              }
            }}
          >
            <CloseOutlined />
          </DeleteButton>
        ) : null,
    },
  ];

  return (
    <ResultDiv>
      <TableHeader>
        <STitle>
          결과 {target === 'team' ? teamData.length : userData.length}개
        </STitle>
        <KeywordButton
          onClick={() => {
            setModalPage(1);
            setUploadForm({
              teamId: target === 'team' ? teamId : null,
              projectType: '',
              mainKeyword: '',
              subKeyword: '',
              manager: '',
              closingDate: '',
              status: '시장조사',
              content: '',
              files: [],
            });
            setIsModalVisible(true);
          }}
        >
          키워드 업로드
        </KeywordButton>
      </TableHeader>
      <TableBody>
        <Table
          showSorterTooltip={false}
          columns={columns}
          dataSource={target === 'team' ? teamData : userData}
          loading={loading}
          rowKey="id"
        />
      </TableBody>
    </ResultDiv>
  );
}

const ResultDiv = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: 0 3px 5px lightgray;
  padding: 2em;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const TableBody = styled.div`
  margin-top: 2em;

  & thead > tr:nth-child(1) > th {
    position: sticky;
    top: 0px;
    font-size: 13px;
    z-index: 2;
    background: #fff;
    border-bottom: 2px solid #646464;
    text-align: center;
  }

  .ant-table-cell {
    .ant-table-filter-column > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
    }
    .ant-table-column-sorters > span {
      justify-content: center;
      display: table;
      margin-left: auto;
    }
    .ant-table-column-sorters > span > span {
      width: 20px;
    }
  }

  .ant-pagination-item-active {
    border: none;
    font-weight: bolder;
  }

  .ant-table-filter-trigger-container {
    background: #fff;
  }

  .ant-pagination-options-size-changer.ant-select {
    display: none;
  }

  .ant-table-thead th.ant-table-column-has-sorters:hover,
  .ant-table-thead th.ant-table-column-sort {
    background: #fff;
    color: #646464;
  }

  .ant-table-filter-trigger:hover {
    /* background: #fff; */
  }

  table > tbody.ant-table-tbody {
    font-size: 13px;
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-pagination-item {
    border: none;
  }

  .ant-table-pagination-right {
    justify-content: center;
  }

  @media ${(props) => props.theme.mobile} {
    table > tbody.ant-table-tbody {
      font-size: 12px;
    }
    .ant-table-thead > tr {
      padding: 15px 5px;
    }
  }
`;

const FileDiv = styled.div`
  display: ${(props) => (props.visible === 'true' ? 'flex' : 'none')};
  word-wrap: break-word;
  word-break: break-all;
  width: 80px;
  font-size: 0.9em;
  margin-bottom: 1em;
  cursor: pointer;
`;

const CStitle = styled.div`
  font-weight: 700;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const LStitle = styled.div`
  font-weight: 700;
  text-align: left;
  @media ${(props) => props.theme.mobile} {
  }
`;

const STitle = styled.div`
  font-size: 15px;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    font-size: 13px;
    width: 30%;
  }
`;

const KeywordButton = styled(Button)`
  width: 130px;
  height: 40px;
  border-color: none;
  background-color: #2d54b899;
  color: white;
  margin-top: -3px;
  border-radius: 10px;
  &:hover,
  &:focus {
    border-color: #2d54b899;
    border-color: #2d54b899;
    background-color: #2d54b899;
    color: white;
  }
`;
