import React from "react";
import moment from 'moment/moment.js'
import Loader from './Skeletons/BarChart'
// @ts-ignore
import { Chart, CategoryScale, LinearScale, registerables } from "chart.js";
Chart.register(CategoryScale, LinearScale, ...registerables);

export default function BarChart({stats, loading}) {
  const days = Array.from({length: 30}, (_, i) => moment().add(- i, 'days').format('YYYY-MM-DD'));
  const chartValues = (stats, name, arrayLength = 30) => {
    if (!stats || ! Object.keys(stats).length) {
      return [];
    }

    const datas = [];
    for (let i of stats.Days) {
      datas[i.Date] = i[name]
    }

    const chartData = [];
    for (let date of days) {
      if (datas[date]) {
        chartData.push(datas[date]);
      } else {
        chartData.push(0);
      }
    }
    return chartData;
  }

  let config = {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          label: 'Delivered',
          backgroundColor: "#8284FF",
          borderColor: "#8284FF",
          data: chartValues(stats.sent, 'Sent'),
          fill: false,
          barThickness: 5,
        },
        {
          label: 'Bounced',
          backgroundColor: "#FA7670",
          borderColor: "#FA7676",
          data: chartValues(stats.bounce, 'HardBounce'),
          fill: false,
          barThickness: 5,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "top",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: false,
        text: "Log Chart",
      },
      tooltips: {
        mode: "index",
        intersect: true,
      },
      hover: {
        // mode: "nearest",
        // intersect: false,
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "",
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: "rgba(33, 37, 41, 0.3)",
            zeroLineColor: "rgba(33, 37, 41, 0.3)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: false,
            labelString: "",
          },
          gridLines: {
            borderDash: [2],
            drawBorder: false,
            borderDashOffset: [2],
            color: "rgba(33, 37, 41, 0.2)",
            zeroLineColor: "rgba(33, 37, 41, 0.15)",
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
          },
        },
      },
    },
  };

  React.useEffect(() => {
    if (loading) {
      return ;
    }

    // @ts-ignore
    let ctx = document.getElementById("bar-chart").getContext("2d");

    // @ts-ignore
    const barChart = new Chart(ctx, config);
    // @ts-ignore
    window.myBar = barChart

    return () => {
      barChart.destroy();
    }
  }, [config]);
  return (
    <>
      {
        loading ? <Loader /> :
            <div className="inboxwp-h-full inboxwp-relative inboxwp-bg-white inboxwp-w-full inboxwp-mb-6">
              <div className="inboxwp-rounded-t inboxwp-mb-0 inboxwp-px-4 inboxwp-py-3 inboxwp-bg-transparent">
                <h2 className="inboxwp-text-blue-gray-700 inboxwp-text-lg inboxwp-font-semibold">
                  Log for last 30 days
                </h2>
              </div>
              <div className="inboxwp-m-auto inboxwp-absolute inboxwp-h-[85%] inboxwp-w-full">
                <canvas id="bar-chart"></canvas>
              </div>
            </div>
      }
    </>
  );
}
