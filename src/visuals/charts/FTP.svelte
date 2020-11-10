<script>
    import LineChart from "../../components/charts/LineChart.svelte";
    import Card from "../../components/Card.svelte";
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
            borderColor: "#00cc00",
            label: "FTP Tests",
            data: getPlotPoints(data),
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
  
  {#if $ftpAverageOutputs.length > 0}
  <Card>
    {#if isError}
      <p>{ERROR_MESSAGE}</p>
    {:else}
      <LineChart
        title="Function Threshold Power (FTP) Over Time"
        {datasets}
        bind:chartReference />
    {/if}
  </Card>
  {/if}
  