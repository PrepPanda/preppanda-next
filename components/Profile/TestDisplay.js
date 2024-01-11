"use client";
import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";
import testSet from "../../public/questions_stats.json";

const Profile = () => {
  useEffect(() => {
    const subjects = Object.keys(testSet[0].subjects); // Assuming subjects are the same for all tests
    const subjectColorMap = generateSubjectColorMap(subjects);

    function generateSubjectColorMap(subjects) {
      const colorMap = {};
      const fixedColors = [
        "rgb(255, 99, 132, 0.5)",
        "rgb(54, 162, 235, 0.5)",
        "rgb(255, 205, 86, 0.5)",
        "rgb(75, 192, 192, 0.5)",
      ];

      subjects.forEach((subject, index) => {
        colorMap[subject] = fixedColors[index % fixedColors.length];
      });

      return colorMap;
    }

    const allChartsContainer = document.createElement("div");
    document.body.appendChild(allChartsContainer);
    allChartsContainer.classList.add(
      "all-chart-container",
      "flex",
      "flex-wrap"
    );

    testSet.forEach((test) => {
      const labels = Object.keys(test.subjects);
      const data = labels.map((subject) => test.subjects[subject].time_spent);
      const colors = labels.map((subject) => subjectColorMap[subject]);

      const chartContainer = document.createElement("div");
      allChartsContainer.appendChild(chartContainer);
      chartContainer.classList.add(
        "chart-container",
        "w-[500px]",
        "mx-auto",
        "my-auto"
      );

      const canvasElement = document.createElement("canvas");
      chartContainer.appendChild(canvasElement);

      const ctx = canvasElement.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              label: "Time Taken (seconds)",
              borderColor: colors,
              backgroundColor: colors,
              borderWidth: 2,
            },
          ],
        },
      });

      return () => {
        myChart.destroy();
        chartContainer.remove();
      };
    });

    return () => {
      allChartsContainer.remove();
    };
  }, []); // Ensure that this effect runs only once

  return (
    <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize">
      Time Taken vs Question ID
    </h1>
  );
};

export default Profile;
