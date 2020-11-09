<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import Card from "../../components/Card.svelte";
  import { averageOutputs } from "../../store/store.js";
  import { getPlotPointsByDate } from "../../chart/utils.js";
  import { colors } from "../../utils/colorUtils";

  const getDatasets = (data) => {
    let averageData = getPlotPointsByDate(data, "average", "createdAt");
    return {
      datasets: [
        {
          borderColor: colors.green,
          label: "Average Output Per Minute",
          data: averageData,
          fill: false,
          lineTension: 0,
        },
      ],
    };
  };

  let datasets;
  let chartReference;
  let isError = false;
  const ERROR_MESSAGE =
    "There was an error generating the Average Output chart.";

  try {
    datasets = getDatasets($averageOutputs);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  averageOutputs.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets(value);
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
      title="Average Output Per Minute Over Time"
      {datasets}
      bind:chartReference />
  {/if}
</Card>
