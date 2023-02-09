import React from "react";
// @ts-ignore
import { Chart, CategoryScale, LinearScale, registerables } from "chart.js";
Chart.register(CategoryScale, LinearScale, ...registerables);

export default function BarChart() {
  const chartValues = (arrayLength = 30) => {
    const array = [];

    for (let i = 0; i < arrayLength; i++) {
      array.push(Math.floor(Math.random() * 100));
    }
    return array;
  }


  const days = Array.from({length: 30}, (_, i) => i + 1);
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: 'Delivered',
            backgroundColor: "#8284FF",
            borderColor: "#8284FF",
            data: chartValues(),
            fill: false,
            barThickness: 5,
          },
          {
            label: 'Bounced',
            backgroundColor: "#FA7670",
            borderColor: "#FA7676",
            data: chartValues(),
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
    // @ts-ignore
    let ctx = document.getElementById("bar-chart").getContext("2d");

    // @ts-ignore
    const barChart = new Chart(ctx, config);
    // @ts-ignore
    window.myBar = barChart

    return () => {
      barChart.destroy();
    }
  }, []);
  return (
    <>
      <div className="inboxwp-flex inboxwp-flex-col inboxwp-min-w-0 inboxwp-break-words inboxwp-bg-white inboxwp-w-full inboxwp-mb-6">
        <div className="inboxwp-rounded-t inboxwp-mb-0 inboxwp-px-4 inboxwp-py-3 inboxwp-bg-transparent">
          <div className="inboxwp-flex inboxwp-flex-wrap inboxwp-items-center">
            <div className="inboxwp-w-full inboxwp-max-w-full inboxwp-flex-grow inboxwp-flex-1">
              <h2 className="inboxwp-text-blueGray-700 inboxwp-text-lg inboxwp-font-semibold">
                Log for last 30 days
              </h2>
            </div>
          </div>
        </div>
        <div className="inboxwp-p-6 inboxwp-absolute inboxwp-m-auto inboxwp-h-[95%] inboxwp-top-8 inboxwp-w-full inboxwp-h-full">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
    </>
  );
}
