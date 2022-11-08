/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';

import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { getTip } from 'http-api';

function Tip() {
  const routeMatch = useRouteMatch();
  const [isOpen, setIsOpen] = useState(false);
  const [tipContent, setTipContent] = useState('');

  useEffect(() => {
    getTip(routeMatch.path)
      .then((res) => setTipContent(res.data))
      .catch(() => setTipContent('일시 오류'));
  }, []);

  const handleTipPopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <TipIcon onClick={handleTipPopup} data-tip data-for="tipToolTip">
        TIP
      </TipIcon>
      <ReactTooltip
        id="tipToolTip"
        type="light"
        effect="solid"
        event="click"
        globalEventOff="click"
        offset="{'left': 160}"
        getContent={() => (
          <div
            className="tip-content-box"
            dangerouslySetInnerHTML={{ __html: tipContent.content }}
          />
        )}
        multiline
        border
        borderColor="#d9d9d9"
        scrollHide={false}
        clickable
      />
    </Container>
  );
}

export default Tip;

const Container = styled.div`
  .tip-content-box {
    width: 370px;
    height: 500px;
    overflow-y: auto;
    box-sizing: border-box;
    padding-right: 20px;
  }

  #tipToolTip {
    padding: 20px 0px 25px 20px;
    border-radius: 10px;
    background-color: white;
    opacity: 1;
  }

  #tipToolTip::before,
  #tipToolTip::after {
    left: 90.7%;
  }

  .tip-content-box::-webkit-scrollbar {
    width: 16px;
  }

  .tip-content-box::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border: 4px solid transparent;
    border-radius: 10px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }

  .tip-content-box::-webkit-scrollbar-track {
    background-color: transparent;
    width: 100px;
  }
`;

const TipIcon = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 50px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  font-weight: bold;

  &:focus {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:hover,
  &:active {
    background-color: ${(props) => props.theme.colors.warning};
  }
`;
