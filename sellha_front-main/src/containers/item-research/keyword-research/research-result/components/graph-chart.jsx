import React from 'react';
import { Line } from 'react-chartjs-2';

function GraphChart({ graph, searchAmount }) {
  if (!graph || graph.length === 0) {
    return <></>;
  }

  const graphLabels = [];
  const graphValue = [];

  /**
   * 0으로 나누면 결과값 Infinity 나옴, com 값 오류로 차트 안나와서 수정
   * 기존 코드 : const com = searchAmount / graph[graph.length - 1].value;
   * 수정자 : 장다영
   * 수정일 : 21.08.18
   */
  const com = Number.isFinite(searchAmount / graph[graph.length - 1].value)
    ? searchAmount / graph[graph.length - 1].value
    : 1;
  for (let i = 0, j = graph.length; i < j; i += 1) {
    graphLabels.push(
      `${graph[i].period.substr(2, 2)}-${graph[i].period.substr(4, 2)}`,
    );
    graphValue.push(Math.round(com * graph[i].value));
  }

  const dataChart = {
    labels: graphLabels,
    legend: 'none',
    datasets: [
      {
        label: '검색량',
        backgroundColor: 'rgba(255,255,255,0)',
        borderColor: '#FFC83A',
        borderWidth: 1.5,
        radius: 2,
        data: graphValue,
      },
    ],
    tooltips: {
      options: {
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              let label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ' : ';
              }

              return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
          },
        },
      },
    },
  };

  return (
    <Line data={dataChart} options={chartOptions} width={500} height={360} />
  );
}

export default GraphChart;

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          fontSize: 10,
          beginAtZero: true,
          min: 0,
          callback(value) {
            if (parseInt(value, 10) >= 1000) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return value;
          },
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
        ticks: {
          fontSize: 10,
        },
      },
    ],
  },
  legend: {
    display: false,
    position: 'left',
    labels: {
      boxWidth: 10,
    },
  },
  tooltips: {
    intersect: false,
    callbacks: {
      label(tooltipItem, data) {
        const label = `${
          data.datasets[tooltipItem.datasetIndex].label
        }:${tooltipItem.yLabel.toLocaleString()}`;

        return label;
      },
    },
  },
  plugins: {
    display: false,
    labels: false,

    datalabels: {
      display: false,
      color: 'white',
    },
  },
};
