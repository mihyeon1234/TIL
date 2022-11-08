import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const PlatFormChart = ({ data: { naver, kakao } }) => {
  const platformDataChart = {
    legend: 'none',
    labels: ['label'],
    datasets: [
      {
        label: '네이버',
        backgroundColor: '#2db40037',
        data: [naver && naver.total],
      },
      {
        label: '카카오',
        backgroundColor: '#f9e0004b',
        data: [kakao && kakao.total],
      },
    ],
  };
  return (
    <HorizontalBar
      data={platformDataChart}
      options={options}
      height={40}
      width={280}
    />
  );
};

export default PlatFormChart;

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    display: false,
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
        scaleLabel: {
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
      align: 'center',
      anchor: 'center',
      clamp: true,
      color: '#FFFFF',
      labels: {
        title: {
          font: {
            weight: '500',
            lineHeight: 2,
            size: 11,
          },
        },
      },
      formatter(value, context) {
        return `${context.dataset.label} ${value}%`;
      },
    },
  },
  tooltips: {
    intersect: false,
    enabled: false,
  },
};
