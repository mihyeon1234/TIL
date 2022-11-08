import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import { addProject } from 'http-api';
import Swal from 'sweetalert2';
import First from './first';
import Second from './second';
import Third from './third';
import s3DefaultConfig from '../../../../../config/index';

const s3 = new AWS.S3(s3DefaultConfig);

export default function index({
  uploadForm,
  setUploadForm,
  modalPage,
  setModalPage,
  isModalVisible,
  setIsModalVisible,
  fetchList,
}) {
  const [addLoading, setAddLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const { email } = useSelector((state) => state.user);

  const handleAddButton = async () => {
    setAddLoading(true);

    try {
      const newUploadForm = JSON.parse(JSON.stringify(uploadForm));
      if (files && files.length > 0) {
        s3.headObject(
          {
            Bucket: 'sellerbee',
            Key: `marketanalysis/${email}/${files[0].name}`,
          },
          (error) => {
            if (error) {
              // 파일이 존재하지 않을때
              s3.upload(
                {
                  Bucket: 'sellerbee',
                  Body: files[0],
                  Key: `marketanalysis/${email}/${files[0].name}`,
                },
                async (err, data) => {
                  if (data) {
                    newUploadForm.files = [files[0].name];
                    await addProject({
                      ...newUploadForm,
                    });
                    Swal.fire('등록을 완료하였습니다.', '', 'success');
                    setIsModalVisible(false);
                    setFiles([]);
                    fetchList();
                  } else {
                    Swal.fire('등록에 실패하였습니다.', '', 'error');
                  }
                },
              );
            } else {
              // 파일이 존재할때
              Swal.fire(
                '파일명이 중복됩니다.<br/>파일명을 바꿔주세요.',
                '',
                'error',
              );
              setFiles([]);
            }
          },
        );
      } else {
        await addProject({
          ...newUploadForm,
        });
        Swal.fire('등록을 완료하였습니다.', '', 'success');
        setIsModalVisible(false);
        setFiles([]);
        fetchList();
      }
    } catch (error) {
      Swal.fire('등록에 실패하였습니다.', '', 'error');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <Modal
      width={800}
      closable
      centered
      destroyOnClose
      footer={null}
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      bodyStyle={{
        height: 600,
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        closeAfterTransition: 'false',
      }}
    >
      {modalPage === 1 && (
        <ModalTitleDiv>
          <ModalTitle>프로젝트 유형을 선택해주세요</ModalTitle>
          <ModalNum>
            <Highlight>1&nbsp;</Highlight> / 3
          </ModalNum>
        </ModalTitleDiv>
      )}
      {modalPage === 2 && (
        <ModalTitleDiv>
          {uploadForm.projectType === '중단 상태' && (
            <ModalTitle>중단된 프로젝트 정보를 입력하세요</ModalTitle>
          )}
          {uploadForm.projectType === '런칭 완료' && (
            <ModalTitle>런칭된 프로젝트 정보를 입력하세요</ModalTitle>
          )}
          <ModalNum>
            <Highlight>2&nbsp;</Highlight> / 3
          </ModalNum>
        </ModalTitleDiv>
      )}
      {modalPage === 3 && (
        <ModalTitleDiv>
          <ModalTitle>관련 자료가 있다면 첨부해주세요</ModalTitle>
          <ModalNum>
            <Highlight>3&nbsp;</Highlight> / 3
          </ModalNum>
        </ModalTitleDiv>
      )}
      {modalPage === 1 && <First setUploadForm={setUploadForm} />}
      {modalPage === 2 && (
        <Second uploadForm={uploadForm} setUploadForm={setUploadForm} />
      )}
      {modalPage === 3 && <Third files={files} setFiles={setFiles} />}
      <ButtonDiv>
        {modalPage !== 1 && (
          <NextButton onClick={() => setModalPage((prev) => prev - 1)}>
            이전
          </NextButton>
        )}
        {modalPage === 1 && (
          <NextButton
            disabled={!uploadForm.projectType || addLoading}
            onClick={() => setModalPage((prev) => prev + 1)}
          >
            다음
          </NextButton>
        )}
        {modalPage === 2 && (
          <NextButton
            disabled={
              !uploadForm.mainKeyword ||
              !uploadForm.manager ||
              !uploadForm.closingDate ||
              !uploadForm.status ||
              addLoading
            }
            onClick={() => setModalPage((prev) => prev + 1)}
          >
            다음
          </NextButton>
        )}
        {modalPage === 3 && (
          <NextButton onClick={handleAddButton}>등록</NextButton>
        )}
      </ButtonDiv>
    </Modal>
  );
}

const ModalTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalTitle = styled.div`
  font-size: 1.7em;
  font-weight: 600;
  margin-bottom: 0.5em;
`;

const ModalNum = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  font-size: 1.1em;
`;

const Highlight = styled.div`
  color: ${(props) => props.theme.colors.primary};
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const NextButton = styled(Button)`
  width: 80px;
  height: 45px;
  border-radius: 15px;
  margin: 0 2em;
  font-size: 1.1em;
`;
