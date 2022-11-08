/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';

import { GoChevronRight } from 'react-icons/go';
import { RiArrowRightSFill } from 'react-icons/ri';
import { format } from 'date-fns';
import ReactTooltip from 'react-tooltip';

function index({ history, ChangeDate }) {
  return (
    <ChangeContainer>
      <ChangeSection>
        <ChangeTitleBox>
          <ChangeTitle>변경 전</ChangeTitle>
          <ChangeDay>
            {format(
              new Date(ChangeDate).setDate(new Date(ChangeDate).getDate() - 1),
              'MM. dd',
            )}
          </ChangeDay>
        </ChangeTitleBox>
        <ChangeContentBox>
          {history[ChangeDate].map(({ change_content, before_content }) => {
            if (change_content === 'price') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>가격</ContentTitle>
                  <Content>
                    {parseInt(before_content, 10).toLocaleString()}원
                  </Content>
                </ChangeContent>
              );
            }
            if (change_content === 'title') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>제목</ContentTitle>
                  <Content>{before_content}</Content>
                </ChangeContent>
              );
            }
            if (change_content === 'image') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>이미지</ContentTitle>
                  <ImageBox>
                    <BeforeImage
                      src={before_content}
                      alt="beforeImage"
                      data-tip
                      data-for={before_content}
                    />
                    <ArrowRightIcon />
                    <span>마우스를 올려 이미지를 확인해보세요</span>
                  </ImageBox>
                  <ImageTooltip
                    id={before_content}
                    place="right"
                    effect="solid"
                    type="light"
                    delayShow={200}
                    border
                    borderColor="#ebebeb"
                  >
                    <BeforeOriginImage
                      src={before_content}
                      alt="img-origin-before"
                    />
                  </ImageTooltip>
                </ChangeContent>
              );
            }
            if (change_content === 'tag') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>태그</ContentTitle>
                  <Content>{before_content}</Content>
                </ChangeContent>
              );
            }
            if (change_content === 'category') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>카테고리</ContentTitle>
                  <Content>{before_content}</Content>
                </ChangeContent>
              );
            }
            return null;
          })}
        </ChangeContentBox>
      </ChangeSection>
      <ChangeRightIcon />
      <ChangeSection>
        <ChangeTitleBox>
          <ChangeTitle>변경 후</ChangeTitle>
          <ChangeDay>{ChangeDate}</ChangeDay>
        </ChangeTitleBox>
        <ChangeContentBox>
          {history[ChangeDate].map(({ change_content, after_content }) => {
            if (change_content === 'price') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>가격</ContentTitle>
                  <Content>
                    {parseInt(after_content, 10).toLocaleString()}원
                  </Content>
                </ChangeContent>
              );
            }
            if (change_content === 'title') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>제목</ContentTitle>
                  <Content>{after_content}</Content>
                </ChangeContent>
              );
            }
            if (change_content === 'image') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>이미지</ContentTitle>
                  <ImageBox>
                    <BeforeImage
                      src={after_content}
                      alt="beforeImage"
                      data-tip
                      data-for={after_content}
                    />
                    <ArrowRightIcon />
                    <span>마우스를 올려 이미지를 확인해보세요</span>
                  </ImageBox>
                  <ImageTooltip
                    id={after_content}
                    place="right"
                    effect="solid"
                    type="light"
                    delayShow={200}
                    border
                    borderColor="#ebebeb"
                  >
                    <BeforeOriginImage
                      src={after_content}
                      alt="img-origin-before"
                    />
                  </ImageTooltip>
                </ChangeContent>
              );
            }
            if (change_content === 'tag') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>태그</ContentTitle>
                  <Content>{after_content}</Content>
                </ChangeContent>
              );
            }
            if (change_content === 'category') {
              return (
                <ChangeContent key={change_content}>
                  <ContentTitle>카테고리</ContentTitle>
                  <Content>{after_content}</Content>
                </ChangeContent>
              );
            }
            return null;
          })}
        </ChangeContentBox>
      </ChangeSection>
    </ChangeContainer>
  );
}

export default index;

const ChangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 18vh;
`;

const ChangeSection = styled.div`
  width: 42%;
  min-height: 10em;
  padding: 1.25em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1.25em;
`;

const ChangeTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.7em;
`;

const ChangeTitle = styled.span`
  font-size: 0.95em;
  font-weight: 600;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ChangeDay = styled.span`
  margin-left: 0.5em;
  font-size: 0.75em;
`;

const ChangeContentBox = styled.div`
  margin-top: 0.5em;
`;

const ChangeContent = styled.div`
  display: flex;
  align-items: center;
`;

const ContentTitle = styled.span`
  font-size: 0.85em;
  font-weight: 600;
  text-align: center;
  width: 8em;
`;

const ImageBox = styled.span`
  display: flex;
  align-items: center;
  > span {
    font-size: 0.8em;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

const ArrowRightIcon = styled(RiArrowRightSFill)`
  color: ${(props) => props.theme.colors.darkGray};
`;

const BeforeImage = styled.img`
  width: 1em;
  height: 1em;
`;

const BeforeOriginImage = styled.img`
  width: 10em;
  height: 10em;
`;

const Content = styled.span`
  font-size: 0.85em;
`;

const ChangeRightIcon = styled(GoChevronRight)`
  margin: 0.9em;
  color: ${(props) => props.theme.colors.darkGray};
`;

const ImageTooltip = styled(ReactTooltip)`
  opacity: 1 !important;
`;
