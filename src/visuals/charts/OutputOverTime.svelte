<script>
  import LineChart from "../../components/charts/LineChart.svelte";
  import Card from "../../components/Card.svelte";
  import {organizedRidesByLength} from "../../store/store.js";
  import {getAverageFromArray} from "../../utils/dataUtils.js";
  import {getPlotPointsByDate} from "../../utils/chartUtils";
  import AveragesByLength from "../AveragesByLength.svelte";
  import {getColorBasedOnArrayLengthAndIndex} from "../../utils/colorUtils";

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
        lineTension: 0.2,
      };

      datasets.push(dataset);
    }

    return {
      datasets: datasets,
    };
  };

  const getAnnotations = (ridesByDuration) => {
    const annotations = [];
    const durations = Object.keys(ridesByDuration);

    for (const [i, duration] of durations.entries()) {
      const rides = ridesByDuration[duration];
      const average = getAverageFromArray(rides, "output");
      const color = getColorBasedOnArrayLengthAndIndex(durations.length, i);

      const annotation = {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: average,
        borderColor: color,
        borderWidth: 0.5,
      };
      annotations.push(annotation);
    }

    return {
      drawTime: "afterDatasetsDraw",
      annotations: annotations,
    };
  };

  let datasets;
  let annotations;
  let chartReference;
  let isError = false;
  const ERROR_MESSAGE = "There was an error generating the output over time chart.";

  try {
    datasets = getDatasets($organizedRidesByLength);
    annotations = getAnnotations($organizedRidesByLength);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  organizedRidesByLength.subscribe((value) => {
    try {
      if (chartReference) {
        chartReference.data = getDatasets(value);
        chartReference.options.annotation = getAnnotations(value);
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
    title="Output Over Time"
    {datasets}
    {annotations}
    bind:chartReference />
  <AveragesByLength />
  {/if}
</Card>
