// @ts-ignore
import {Chart} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React from "react";

export default function PieChart() {
  const days = Array.from({length: 30}, (_, i) => i + 1);
  React.useEffect(() => {
    let config = {
      type: "doughnut",
      data: {
        labels: [
          'Delivered',
          'Bounce',
        ],
        datasets: [{
          label: 'For Last 30 days',
          data: [300, 50],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
          ],
          hover: false,
          borderWidth: 0,
          weight: 2,
        }]
      },
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: "center",
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            labels: {
              title: {
                font: {
                  weight: 'bold'
                },
              },
              value: {
                color: '#fff'
              },
            },
            anchor: {
              radial: 'center'
            }
          }
        },
        responsive: true,
        title: {
          display: false,
          text: "Pie Chart",
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
        cutoutPercentage: 9,
      },
    };
    // @ts-ignore
    let ctx = document.getElementById("pie-chart").getContext("2d");
    // @ts-ignore
    const pieChart = new Chart(ctx, config);
    // @ts-ignore
    window.myPie = pieChart;

    return () => {
      pieChart.destroy();
    }
  }, []);
  return (
    <>
      <div className="inboxwp-min-w-0 inboxwp-break-words inboxwp-bg-white inboxwp-w-full inboxwp-mb-6">
        <div className="inboxwp-rounded-t inboxwp-mb-0 inboxwp-px-4 inboxwp-py-3 inboxwp-bg-transparent">
          <div className="inboxwp-flex inboxwp-flex-wrap inboxwp-items-center">
              <h2 className="inboxwp-text-blue-gray-700 inboxwp-text-lg inboxwp-text-xl inboxwp-font-semibold">
                Quick glance
              </h2>
          </div>
        </div>
        <div className="inboxwp-m-auto inboxwp-h-[300px] inboxwp-w-full inboxwp-pl-[10%]">
          <canvas id="pie-chart"></canvas>
        </div>
      </div>
    </>
  );
}
