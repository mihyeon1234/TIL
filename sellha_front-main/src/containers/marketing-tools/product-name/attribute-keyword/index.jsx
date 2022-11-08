/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import ContentCard from './components/ContentCard';
import TagCard from './components/TagCard';

import { dummyProducts, dummyTags } from './dummy';

export default function Index() {
  const [inputText, setInputText] = useState('');
  const [productData, setProductData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingTag, setLoadingTag] = useState(false);

  let extensionFlag = false;

  const checkInput = () => {
    if (!inputText.trim()) {
      Swal.fire({
        text: '🚨 키워드를 입력하세요',
        showConfirmButton: false,
        timer: 1200,
        width: 500,
      });
    } else {
      return true;
    }
    return false;
  };

  const checkExtension = (flag) => {
    if (!flag) {
      Swal.fire({
        text: '서비스 이용을 위해서는 크롬 익스텐션 설치가 필요합니다.',
        showDenyButton: true,
        confirmButtonText: `설치하기`,
        denyButtonText: `취소`,
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster',
        },
        confirmButtonColor: '#FFC83A',
        denyButtonColor: '#D9D9D9',
        allowEnterKey: false,
      }).then(async (res) => {
        if (res.isConfirmed) {
          window.open(
            'https://chrome.google.com/webstore/detail/sellha/mglkfkclbnnnfepnmgeeggfmpllkjjga?hl=ko',
          );
          localStorage.setItem('confirmedExtension', true);
          setInputText('');
        }
      });
    } else {
      return true;
    }
    return false;
  };

  const onClickSearch = () => {
    const passInput = checkInput();
    const passExtension = checkExtension(extensionFlag);

    if (passInput && passExtension) {
      document.getElementById('tag-search').click();
      localStorage.removeItem('productnameData');
      localStorage.removeItem('hashTags');

      const products = setInterval(() => {
        setLoadingProduct(true);
        const data = JSON.parse(localStorage.getItem('productnameData'));

        if (data) {
          setProductData(data);
          clearInterval(products);
          setLoadingProduct(false);
        }
      }, 1000);

      const tags = setInterval(() => {
        setLoadingTag(true);

        const data = JSON.parse(localStorage.getItem('hashTags'));

        if (data) {
          setTagData(data);
          clearInterval(tags);
          setLoadingTag(false);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const sendExtensionCheck = () => {
      chrome.runtime?.sendMessage(
        'mglkfkclbnnnfepnmgeeggfmpllkjjga',
        // 'jcibpclpjagfmoafcggkpfdagdhmcnag',
        { message: 'test' },
        ({ test }) => {
          if (!chrome.runtime.lastError) {
            if (test) {
              extensionFlag = true;
            } else {
              extensionFlag = false;
            }
          }
          if (chrome.runtime.lastError) {
            extensionFlag = false;
          }
        },
      );
    };

    sendExtensionCheck();
  });

  useEffect(() => {
    localStorage.removeItem('confirmedExtension');
    const localProducts = JSON.parse(localStorage.getItem('productnameData'));
    const localTags = JSON.parse(localStorage.getItem('hashTags'));

    if (localProducts?.length > 0) {
      setProductData(localProducts);
    }
    if (localTags && Array.isArray(localTags)) setTagData(localTags);

    // 예시 상품, 예시 태그
    if (!localProducts && !localTags) {
      setProductData(dummyProducts);
      setTagData(dummyTags);
    }

    return () => {
      setLoadingTag(false);
      setInputText('');
    };
  }, []);

  return (
    <Container>
      <InputDiv>
        <InputBox
          id="keyword"
          allowClear
          disabled={loadingProduct}
          placeholder={
            localStorage.getItem('confirmedExtension')
              ? '⚠️ 익스텐션 설치 후 새로고침을 하고 검색을 해주세요.'
              : '키워드를 입력하면 노출 키워드를 확인할 수 있습니다.'
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onPressEnter={() => onClickSearch()}
          suffix={
            <SearchOutlined onClick={() => onClickSearch()} id="tag-search" />
          }
        />
      </InputDiv>
      {productData && (
        <>
          <TitleDiv>
            <TitleText>Top 40 상품 노출 키워드 결과</TitleText>
          </TitleDiv>
          <TagCard
            tagData={tagData}
            loadingTag={loadingTag}
            productData={productData}
            setProductData={setProductData}
          />
          {productData.length === 0 && (
            <NoContentBox>검색 결과가 없습니다.</NoContentBox>
          )}
          {productData.map((data) => (
            <ContentCard
              key={data.id}
              data={data}
              tagData={tagData}
              loadingTag={loadingTag}
              loadingProduct={loadingProduct}
              inputText={inputText}
            />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
`;

const InputBox = styled(Input)`
  max-width: 400px;
  height: 40px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

const TitleText = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

const NoContentBox = styled.div`
  display: flex;
  margin: 1.5rem auto;
  color: ${({ theme }) => theme.colors.darkGray};
`;
