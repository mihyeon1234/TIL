import React from 'react';
import styled from 'styled-components';
import { CrownFilled } from '@ant-design/icons';

export default function index({ popular, recent, tabSelect }) {
  return (
    <StyledImage>
      <Content>
        {tabSelect === 1 && popular && (
          <Item postList={popular} type="popular" />
        )}
        {recent && recent[tabSelect] && (
          <Item postList={recent[tabSelect]} type="recent" />
        )}
      </Content>
    </StyledImage>
  );
}

const StyledImage = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    width: 387px;
  }

  div {
    margin: 5px;

    button {
      padding: 0;
      background-color: unset;

      :hover {
        background-color: unset;
        opacity: 0.8;
      }

      img {
        border-radius: 10px;
        width: 11em;
        height: 11em;
        object-fit: cover;
      }
    }

    .crown-icon {
      position: absolute;
      margin: 10px;
      font-size: 18px;
      color: #ffda4f;
    }
  }
`;

function Item({ postList, type }) {
  const itemList = postList.map((post, idx) => {
    const redirect = post.link ? post.link : post.redirectUrl;
    const feedImage = post.imageBase64
      ? `data:image/png;base64,${post.imageBase64}`
      : post.imageUrl || post.thumbnail;

    return (
      <div key={`${post.title}${idx.toString()}`}>
        {type === 'popular' && <CrownFilled className="crown-icon" />}
        <button
          type="button"
          onClick={() => {
            window.open(redirect, '_blank');
          }}
        >
          <img
            src={feedImage}
            alt="img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </button>
      </div>
    );
  });

  return itemList;
}
