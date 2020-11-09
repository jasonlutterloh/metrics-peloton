<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import Card from "../../components/Card.svelte";
  import { averageResistance, averageCadence } from "../../store/store.js";
  import { getPlotPointsByDate } from "../../chart/utils.js";
  import { colors } from "../../utils/colorUtils";

  const getDatasets = (averageCadence, averageResistance) => {
    const cadenceData = getPlotPointsByDate(
      averageCadence,
      "average",
      "createdAt"
    );
    const resistanceData = getPlotPointsByDate(
      averageResistance,
      "average",
      "createdAt"
    );

    return {
      datasets: [
        {
          borderColor: colors.teal,
          label: "Average Cadence",
          data: cadenceData,
          fill: false,
          lineTension: 0,
        },
        {
          borderColor: colors.pink,
          label: "Average Resistance (%)",
          data: resistanceData,
          fill: false,
          lineTension: 0,
        },
      ],
    };
  };

  let datasets;
  let chartReference;
  let isError = false;
  const ERROR_MESSAGE = "There was an error generating the output over time chart."

  try {
    datasets = getDatasets($averageCadence, $averageResistance);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  averageCadence.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets(value, $averageResistance);
        chartReference.update();
      }
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });

  averageResistance.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets($averageCadence, value);
        chartReference.update();
      }
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>

<Card>
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <LineChart
      title="Average Cadence and Resistance (%) Over Time"
      {datasets}
      bind:chartReference />
  {/if}
</Card>
