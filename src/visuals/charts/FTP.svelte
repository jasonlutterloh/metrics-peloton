<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import {ftpAverageOutputs} from "../../store/store.js";
  import {getReadableDate} from "../../utils/dateUtils";
  import {createPlotPoint, calculateFTP} from "../../utils/chartUtils";

  const getPlotPoints = (data) => {
    return data.map((ride) => {
      const ftpValue = calculateFTP(ride.average);
      const date = getReadableDate(ride.createdAt);
      return createPlotPoint(date, ftpValue);
    });
  };

  const getDatasets = (data) => {
    return {
      datasets: [
        {
          borderColor: "#fff",
          label: "FTP Tests",
          data: getPlotPoints(data),
          fill: false,
          lineTension: 0,
          pointBackgroundColor: "#fff",
          trendlineLinear: {
            style: "#fff",
            lineStyle: "dotted",
            width: 1,
          },
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
    datasets = getDatasets($ftpAverageOutputs);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  ftpAverageOutputs.subscribe((value) => {
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

<style>
  section {
    background: #04a6c2ff;
    color: #fff;
  }
</style>

{#if $ftpAverageOutputs.length > 0}
  <section>
    <div class="section-wrapper">
      {#if isError}
        <p>{ERROR_MESSAGE}</p>
      {:else}
        <h2>Function Threshold Power (FTP) Over Time</h2>
        <LineChart
          title="Function Threshold Power (FTP) Over Time"
          {datasets}
          isDarkMode=true
          bind:chartReference />
      {/if}
    </div>
  </section>
{/if}
