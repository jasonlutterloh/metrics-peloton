<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../components/Card.svelte";
  import { averageOutputs } from "../store/store.js";
  import { getLineChartByDateConfig, getPlotPointsByDate } from "./utils";
  import { colors } from "./colorPalette";

  const getChartData = (data) => {
    return {
      datasets: [
        {
          borderColor: colors.green,
          label: "Average Output Per Minute",
          data: getPlotPointsByDate(data, "average", "createdAt"),
          fill: false,
          lineTension: 0,
        },
      ],
    };
  };

  let averageOutputChart;
  let chartData = getChartData($averageOutputs);
  let config = getLineChartByDateConfig(chartData);

  onMount(async () => {
    let ctx = document.getElementById("averageOutputChart");
    averageOutputChart = new Chart(ctx, config);

    averageOutputs.subscribe((value) => {
      averageOutputChart.data = getChartData(value);
      averageOutputChart.update();
    });
  });
</script>

<Card>
  <h2>Average Output Per Minute Over Time</h2>
  <div class="chart-wrapper"><canvas id="averageOutputChart" /></div>
</Card>
