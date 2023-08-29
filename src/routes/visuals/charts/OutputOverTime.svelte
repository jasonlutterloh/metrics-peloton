<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import { organizedRidesByDuration } from "../../store/store.js";
  import { getPlotPointsByDate } from "../../utils/chartUtils";
  import AverageOutputsByDuration from "../AverageOutputsByDuration.svelte";
  import { getColorBasedOnArrayLengthAndIndex } from "../../utils/colorUtils";

  const getDatasets = (ridesByDuration) => {
    const datasets = [];
    const durations = Object.keys(ridesByDuration);

    for (const [i, duration] of durations.entries()) {
      const rides = ridesByDuration[duration];
      const workouts = getPlotPointsByDate(rides, "output", "date");
      const color = getColorBasedOnArrayLengthAndIndex(durations.length, i);
      const label = duration + " Minute Workouts";

      const dataset = {
        borderColor: color,
        label: label,
        data: workouts,
        fill: false,
        pointBackgroundColor: color,
        trendlineLinear: {
          style: color,
          lineStyle: "dotted",
          width: 1
        }
      };

      datasets.push(dataset);
    }
    return {
      datasets: datasets
    };
  };

  let datasets;
  let chartReference;
  let isError = false;
  const ERROR_MESSAGE = "There was an error generating the output over time chart.";

  try {
    datasets = getDatasets($organizedRidesByDuration);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  organizedRidesByDuration.subscribe((value) => {
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

<section>
  <div class="section-wrapper">
    {#if isError}
      <p>{ERROR_MESSAGE}</p>
    {:else}
      <h2>Output Over Time</h2>
      <LineChart title="Output Over Time" {datasets} bind:chartReference />
      <AverageOutputsByDuration />
    {/if}
  </div>
</section>

<style>
  .section-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 10px 60px;
  }
</style>
