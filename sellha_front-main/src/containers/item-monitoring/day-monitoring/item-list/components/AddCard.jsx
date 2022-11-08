import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Modal, notification } from 'antd';
import { BiPlus } from 'react-icons/bi';

import { useItemCard } from '../../hooks';

const AddCard = () => {
  const {
    message,
    visibleAddModal,
    urlValue,
    onClickAddButton,
    onCancelModal,
    onChangeInput,
    onClickSubmitAdd,
    onCloseNoti,
  } = useItemCard();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    notification.success({
      message: '상품 등록 완료!',
      key,
      closeIcon: <></>,
      duration: 5,
      style: {
        borderRadius: 10,
      },
      onClose: onCloseNoti,
      description: (
        <NotiContainer>
          <NotiText>상품이 등록되었습니다.</NotiText>
          <NotiText>상세 페이지로 바로 이동하시겠습니까?</NotiText>
          <NotiButtonBox>
            <NotiConfirmButton
              onClick={() => {
                window.open(`/monitoring/${message.productId}`);
                notification.close(key);
              }}
              onKeyDown={() => {
                window.open(`/monitoring/${message.productId}`);
                notification.close(key);
              }}
              role="button"
              tabIndex="0"
            >
              이동하기
            </NotiConfirmButton>
            <NotiDenyButton onClick={() => notification.close(key)}>
              닫기
            </NotiDenyButton>
          </NotiButtonBox>
        </NotiContainer>
      ),
    });
  };

  useEffect(() => {
    if (message.productId) {
      openNotification();
    }
  }, [message.productId]);

  return (
    <AddSection>
      <AddTitle>모니터링하고 싶은 아이템을 추가하세요.</AddTitle>
      <ButtonSection>
        <AddButton onClick={onClickAddButton}>
          <BiPlus size="18" color="white" />
          <AddText>추가하기</AddText>
        </AddButton>
        <Modal
          width={650}
          visible={visibleAddModal}
          onCancel={onCancelModal}
          centered
          footer={null}
          bodyStyle={{
            height: 400,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ModalContainer>
            <ModalTitle>스마트스토어 상품 링크를 입력해주세요</ModalTitle>
            <ModalNotice>
              * 모니터링 데이터는 매일 오전 7시 30분에 업데이트됩니다.
            </ModalNotice>
            <ModalInput
              placeholder="URL 입력"
              value={urlValue}
              onChange={onChangeInput}
            />
            {message.code === 1 && (
              <Message>🚨 이미 추가되어 있는 상품입니다.</Message>
            )}
            {message.code === 2 && (
              <Message>
                🚨 현재는 스마트스토어 상품만 등록할 수 있습니다.
              </Message>
            )}
          </ModalContainer>
          <ModalButton onClick={onClickSubmitAdd}>등록</ModalButton>
        </Modal>
      </ButtonSection>
    </AddSection>
  );
};

export default AddCard;

const AddSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 200px;
  border: 2px dashed ${(props) => props.theme.colors.lightGray};
  border-radius: 1.25em;
  box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.1);
  min-height: 18em;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const AddTitle = styled.div`
  font-size: 0.95em;
`;

const ButtonSection = styled.div`
  width: 65%;
  margin-top: 1.125em;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    width: 75%;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 4em;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    border: none;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    box-shadow: 2px 0px 10px rgba(146, 146, 146, 0.4);
    background: #ffdd63;
  }
`;

const AddText = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-weight: 600;
  letter-spacing: 0.1em;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2.2em;
  @media ${(props) => props.theme.mobile} {
    margin: 0.5em;
  }
`;

const ModalTitle = styled.span`
  font-size: 1.5em;
  font-weight: 600;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2em;
  }
`;

const ModalNotice = styled.span`
  font-size: 0.8em;
  margin: 0.6em 0;
`;

const ModalInput = styled.input`
  margin-top: 2.45em;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 1em;
  :focus {
    outline: none;
  }
`;

const ModalButton = styled.button`
  width: 30%;
  height: 57px;
  border-radius: 1em;
  background: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  font-weight: 400;
  :hover,
  :focus {
    border: none;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background: #ffdd63;
  }
`;

const Message = styled.span`
  font-size: 0.9em;
  margin: 0.5em 0;
  color: ${(props) => props.theme.colors.danger};
  animation: fadein 0.8s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NotiContainer = styled.div`
  margin: 15px 0;
`;

const NotiText = styled.div`
  font-size: 0.85rem;
`;

const NotiButtonBox = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  gap: 10px;
`;

const NotiConfirmButton = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #ffc83a;
  color: #ffffff;
  border-radius: 5px;
  padding: 8px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
`;

const NotiDenyButton = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 6px 8px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
`;
