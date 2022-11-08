import React from 'react';
import { Bar } from 'react-chartjs-2';

function reveiwChart({ chart }) {
  const date = [];
  const dayAverage = [];
  const accuredAverage = [];
  const scoreOne = [];
  const scoreTwo = [];
  const scoreThree = [];
  const scoreFour = [];
  const scoreFive = [];
  const totalCount = [];

  chart.forEach((data) => {
    date.push(data.monitor_date.slice(5).replace('-', '. '));
    dayAverage.push(data.day_average_score);
    accuredAverage.push(data.average_review_score.toFixed(1));
    scoreOne.push(data.score1_review_count);
    scoreTwo.push(data.score2_review_count);
    scoreThree.push(data.score3_review_count);
    scoreFour.push(data.score4_review_count);
    scoreFive.push(data.score5_review_count);
    totalCount.push(data.total_review_count);
  });

  const reviewData = {
    labels: date,
    datasets: [
      {
        type: 'line',
        label: '일별 평균',
        borderColor: '#FFDA4F',
        borderWidth: 2,
        fill: false,
        data: dayAverage,
        yAxisID: 'y-axis-2',
      },
      {
        type: 'line',
        label: '누적 평균',
        borderColor: '#7fa0f3',
        borderWidth: 2,
        fill: false,
        data: accuredAverage,
        yAxisID: 'y-axis-3',
      },
      {
        type: 'bar',
        label: '1점',
        backgroundColor: '#edc7c1d8',
        borderColor: '#646464',
        data: scoreOne,
      },
      {
        type: 'bar',
        label: '2점',
        backgroundColor: '#ecd6bdb5',
        borderColor: '#646464',
        data: scoreTwo,
      },
      {
        type: 'bar',
        label: '3점',
        backgroundColor: '#d6cae0c3',
        borderColor: '#646464',
        data: scoreThree,
      },
      {
        type: 'bar',
        label: '4점',
        backgroundColor: '#cde4dddd',
        borderColor: '#646464',
        data: scoreFour,
      },
      {
        type: 'bar',
        label: '5점',
        backgroundColor: '#dce1ebdd',
        borderColor: '#646464',
        data: scoreFive,
      },
    ],
  };

  if (chart.length < 8) {
    return (
      <Bar
        data={reviewData}
        options={optionsUnder8}
        width={780}
        height={280}
        plugins={plugins}
      />
    );
  }
  return (
    <Bar
      data={reviewData}
      options={options}
      width={780}
      height={280}
      plugins={plugins}
    />
  );
}

export default reveiwChart;

const options = {
  legend: {
    labels: {
      boxWidth: 13,
    },
  },
  scales: {
    yAxes: [
      {
        id: 'y-axis-1',
        stacked: true,
        position: 'left',
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      },
      {
        id: 'y-axis-2',
        stacked: true,
        position: 'right',
        ticks: {
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
      {
        id: 'y-axis-3',
        stacked: true,
        position: 'right',
        display: false,
        ticks: {
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
  animation: {
    duration: 0, // 1000
  },
  plugins: {
    labels: false,
    datalabels: {
      display: false,
    },
  },
};

const optionsUnder8 = {
  datasets: {
    bar: {
      barPercentage: 0.4,
    },
  },
  scales: {
    yAxes: [
      {
        id: 'y-axis-1',
        stacked: true,
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
      },
      {
        id: 'y-axis-2',
        stacked: true,
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
      {
        id: 'y-axis-3',
        stacked: true,
        display: false,
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
      },
    ],
  },
  plugins: {
    labels: false,
    datalabels: {
      display: false,
    },
  },
};

const plugins = [
  {
    afterDraw: (chartData) => {
      const { ctx } = chartData.chart;
      ctx.save();
      ctx.font = '0.8em Noto Sans KR';
      ctx.fillStyle = 'gray';
      const y = 15;

      ctx.textAlign = 'left';
      ctx.fillText('(리뷰 수)', -1, y);

      ctx.textAlign = 'right';
      ctx.fillText('(평점)', chartData.chart.width, y);
      ctx.restore();
    },
  },
];
