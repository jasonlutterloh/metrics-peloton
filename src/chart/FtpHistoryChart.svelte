<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../components/Card.svelte";
  import { ftpAverageOutputs } from "../store/store.js";
  import {
    calculateFTP,
    createPlotPoint,
    getReadableDate,
    getLineChartByDateConfig,
  } from "./utils";

  const getPlotPoints = (data) => {
    return data.map((ride) => {
      let ftpValue = calculateFTP(ride.average);
      let date = getReadableDate(ride.createdAt);
      return createPlotPoint(date, ftpValue);
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
  let chartData = getChartData($ftpAverageOutputs);
  let config = getLineChartByDateConfig(chartData);

  onMount(async () => {
    let ctx = document.getElementById("ftpHistoryChart");
    ftpHistoryChart = new Chart(ctx, config);

    ftpAverageOutputs.subscribe((value) => {
      ftpHistoryChart.data = getChartData(value);
      ftpHistoryChart.update();
    });
  });
</script>

<Card>
  <h2>Function Threshold Power (FTP) Over Time</h2>
  <div class="chart-wrapper"><canvas id="ftpHistoryChart" /></div>
</Card>
