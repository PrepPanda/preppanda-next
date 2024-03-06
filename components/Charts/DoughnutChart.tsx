import { useEffect, useRef } from "react";
import Chart from "chart.js";

const DoghnutChart = ({ data }: any) => {
    const colors = [
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)"
    ];

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: data.labels,
                        datasets: [{
                            data: data.data,
                            borderColor: colors.slice(0, data.labels.length),
                            backgroundColor: colors.slice(0, data.labels.length),
                            borderWidth: 2,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,

                        scales: {
                            xAxes: [{
                                display: false,
                            }],
                            yAxes: [{
                                display: false,
                            }],
                        },
                        legend: {
                            display: true,
                            labels: {
                                fontSize: 12, // Adjust the font size of the legend labels
                            },
                        },
                        plugins: {
                            datalabels: {
                                color: '#fff', // Color of data labels
                                font: {
                                    size: 12 // Font size of data labels
                                }
                            }
                        }

                    },
                });
                console.log(data);
            }
        }
    }, [data, colors]);

    return (
        <>
            <div className="m-20">
                <h1 className="text-sm font-semibold capitalize">{data.name}</h1>
                <div className="w-[300px] h-[300px] ">
                    <div className='border border-gray-400 pt-0 rounded-xl p-10'>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoghnutChart;

