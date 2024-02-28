"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import testSet from "../../public/questions_stats.json";

const AllTestDisplay = () => {
  useEffect(() => {
    const subjects = Object.keys(testSet[0].subjects); // Assuming subjects are the same for all tests

    const allChartsContainer = document.createElement("div");
    document.body.appendChild(allChartsContainer);
    allChartsContainer.classList.add(
      "all-chart-container",
      "flex",
      "flex-wrap"
    );

    const aggregatedData = {};

    subjects.forEach((subject) => {
      aggregatedData[subject] = {
        correct: 0,
        wrong: 0,
        attempted: 0,
      };
    });

    testSet.forEach((test) => {
      subjects.forEach((subject) => {
        aggregatedData[subject].correct += test.subjects[subject].right;
        aggregatedData[subject].wrong += test.subjects[subject].wrong;
        aggregatedData[subject].attempted += test.subjects[subject].attempted;
      });
    });

    const labels = subjects;
    const correctData = subjects.map(
      (subject) => aggregatedData[subject].correct
    );
    const wrongData = subjects.map((subject) => aggregatedData[subject].wrong);
    const attemptedData = subjects.map(
      (subject) => aggregatedData[subject].attempted
    );

    const chartContainer = document.createElement("div");
    allChartsContainer.appendChild(chartContainer);
    chartContainer.classList.add(
      "chart-container",
      "w-[800px]",
      "mx-auto",
      "my-auto"
    );

    const canvasElement = document.createElement("canvas");
    chartContainer.appendChild(canvasElement);

    const ctx = canvasElement.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Attempted Questions",
            data: attemptedData,
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue for attempted questions
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
          },
          {
            label: "Correct Questions",
            data: correctData,
            backgroundColor: "rgba(109, 253, 181, 0.5)", // Green for correct questions
            borderColor: "rgb(109, 253, 181)",
            borderWidth: 1,
          },
          {
            label: "Wrong Questions",
            data: wrongData,
            backgroundColor: "rgba(255, 99, 132, 0.5)", // Red for wrong questions
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
      chartContainer.remove();
    };
  }, []); // Ensure that this effect runs only once

  return <></>;
};

export default AllTestDisplay;
