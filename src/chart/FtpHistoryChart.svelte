<script>
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import Card from "../components/Card.svelte";
    import * as ChartAnnotation from "chartjs-plugin-annotation";
    import { ftpAverageOutputs } from "../store/store.js";
    import moment from "moment";

    const getPlotPoints = (data) => {
        return data.map((ride) => {
            // Functional Threshold Power (FTP) is average output over 1h in 20m tests discount by 5%
            return {
                y: Math.floor(ride.average * 0.95),
                x: moment(ride.createdAt, "YYYY-MM-DD"),
            };
        });
    };

    const getChartData = (data) => {
        return {
            datasets: [
                {
                    borderColor: "#00cc00",
                    label: "FTP Tests",
                    data: getPlotPoints(data),
                    fill: false,
                    lineTension: 0,
                },
            ],
        };
    };

    let ftpHistoryChart;

    let config = {
        type: "line",
        plugins: [ChartAnnotation],
        data: getChartData($ftpAverageOutputs),
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                xAxes: [
                    {
                        type: "time",
                        distribution: "series",
                        bounds: "data",
                        time: {
                            unit: "day",
                            tooltipFormat: "MMM DD YYYY",
                        },
                    },
                ],
            },
        },
    };

    onMount(async () => {
        let ctx = document.getElementById("ftpHistoryChart");
        ftpHistoryChart = new Chart(ctx, config);

        ftpAverageOutputs.subscribe((value) => {
            ftpHistoryChart.data = getChartData(value);
            ftpHistoryChart.update();
        });
    });
</script>

<style>
    div {
        min-height: 90vh;
    }
</style>

<Card>
    <h2>Function Threshold Power (FTP) Over Time</h2>
    <div><canvas id="ftpHistoryChart" /></div>
</Card>
