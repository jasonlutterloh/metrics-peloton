<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../components/Card.svelte";
  import { averageCadence, averageResistance } from "../store/store.js";

  import { getLineChartByDateConfig, getPlotPointsByDate } from "./utils.js";
  import { colors } from "./colorPalette";

  const getChartData = (averageCadence, averageResistance) => {
    return {
      datasets: [
        {
          borderColor: colors.teal,
          label: "Average Cadence",
          data: getPlotPointsByDate(averageCadence, "average", "createdAt"),
          fill: false,
          lineTension: 0,
        },
        {
          borderColor: colors.pink,
          label: "Average Resistance (%)",
          data: getPlotPointsByDate(averageResistance, "average", "createdAt"),
          fill: false,
          lineTension: 0,
        },
      ],
    };
  };

  let averageCadenceResistanceChart;
  let chartData = getChartData($averageCadence, $averageResistance);
  let config = getLineChartByDateConfig(chartData);

  onMount(async () => {
    let ctx = document.getElementById("averageCadenceResistanceChart");
    averageCadenceResistanceChart = new Chart(ctx, config);

    averageCadence.subscribe((value) => {
      averageCadenceResistanceChart.data = getChartData(
        value,
        $averageResistance
      );
      averageCadenceResistanceChart.update();
    });

    averageResistance.subscribe((value) => {
      averageCadenceResistanceChart.data = getChartData($averageCadence, value);
      averageCadenceResistanceChart.update();
    });
  });
</script>

<Card>
  <h2>Average Cadence and Resistance (%) Over Time</h2>
  <div class="chart-wrapper"><canvas id="averageCadenceResistanceChart" /></div>
</Card>
