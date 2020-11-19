<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import {averageOutputs} from "../../store/store.js";
  import {getPlotPointsByDate} from "../../utils/chartUtils";

  const getDatasets = (data) => {
    const averageData = getPlotPointsByDate(data, "average", "createdAt");
    return {
      datasets: [
        {
          borderColor: "#efefef",
          label: "Average Output Per Minute",
          data: averageData,
          fill: false,
          lineTension: 0,
          pointBackgroundColor: "#fff",
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
        chartReference.options.legend.display = false;
        chartReference.update();
      }
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>

<section>
  <div class="section-wrapper">
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <h2>Average Output Per Minute</h2>
    <LineChart
      title="Average Output Per Minute"
      {datasets}
      isDarkMode = true
      isSimpleDisplay = true
      bind:chartReference />
  {/if}
</div>
</section>

<style>
  section{
    background:#04A6C2;
    color: #fff;
  }

</style>