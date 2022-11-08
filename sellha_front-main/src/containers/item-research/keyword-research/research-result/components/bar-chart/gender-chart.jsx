import React from 'react';
import styled from 'styled-components';
import { HorizontalBar } from 'react-chartjs-2';

const NoDataText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  color: ${(props) => props.theme.colors.gray};
`;

function GenderChart({ data: { gender } }) {
  const genderDataChart = {
    legend: 'none',
    labels: ['label'],
    datasets: [
      {
        label: '여성',
        backgroundColor: '#ffda4f80', // '#ffc4a9',
        data: [Math.round(gender && gender.f * 100)],
      },
      {
        label: '남성',
        backgroundColor: '#eeeeee', // '#fcd5c4',
        data: [Math.round(gender && gender.m * 100)],
      },
    ],
  };

  if (!gender || (!gender.f && !gender.m)) {
    return <NoDataText>데이터 없음</NoDataText>;
  }

  return (
    <HorizontalBar
      data={genderDataChart}
      options={genderOptions}
      height={70}
      width={170}
    />
  );
}

export default GenderChart;

const genderOptions = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'top',
    labels: {
      boxWidth: 11,
      fontSize: 11,
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  plugins: {
    datalabels: {
      display: true,
      align: 'bottom',
      anchor: 'center',
      clamp: true,
      labels: {
        title: {
          font: {
            weight: '500',
            lineHeight: 2,
            size: 11,
          },
        },
      },
      formatter(value) {
        return `${value}%`;
      },
    },
  },
  tooltips: {
    intersect: false,
    enabled: false,
  },
};
