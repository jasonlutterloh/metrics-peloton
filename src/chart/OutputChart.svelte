<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../components/Card.svelte";
  import * as ChartAnnotation from "chartjs-plugin-annotation";
  import { showAverages, organizedRidesByLength } from "../store/store.js";
  import {
    getAverageFromArray,
    getPlotPointsByDate,
    getLineChartByDateConfig,
  } from "./utils.js";
  import AveragesByLength from "./AveragesByLength.svelte";
  import { getColorBasedOnArrayLengthAndIndex } from "./colorPalette";

  const getChartData = (ridesByDuration) => {
    let datasets = [];
    const durations = Object.keys(ridesByDuration);
    for (const [i, duration] of durations.entries()) {
      let rides = ridesByDuration[duration];
      let workouts = getPlotPointsByDate(rides, "output", "date");
      let dataset = {
        borderColor: getColorBasedOnArrayLengthAndIndex(durations.length, i),
        label: duration + " Minute Workouts",
        data: workouts,
        fill: false,
        lineTension: 0.2,
      };
      datasets.push(dataset);
    }

    let chartData = {
      datasets: datasets,
    };

    return chartData;
  };

  const getAnnotations = (ridesByDuration) => {
    let annotations = [];
    const durations = Object.keys(ridesByDuration);
    for (const [i, duration] of durations.entries()) {
      let rides = ridesByDuration[duration];
      let average = getAverageFromArray(rides, "output");
      let annotation = {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: average,
        borderColor: getColorBasedOnArrayLengthAndIndex(durations.length, i),
        borderWidth: 0.5,
      };
      annotations.push(annotation);
    }

    return {
      drawTime: "afterDatasetsDraw",
      annotations: annotations,
    };
  };

  let outputChart;
  let chartData = getChartData($organizedRidesByLength);
  let config = getLineChartByDateConfig(chartData);
  config.plugins = [ChartAnnotation];
  config.options.annotation = getAnnotations($organizedRidesByLength);

  onMount(async () => {
    let ctx = document.getElementById("outputChart");
    outputChart = new Chart(ctx, config);

    showAverages.subscribe((value) => {
      outputChart.options.annotation.drawTime = value
        ? "afterDatasetsDraw"
        : null;
      outputChart.update();
    });

    organizedRidesByLength.subscribe((value) => {
      outputChart.data = getChartData(value);
      outputChart.options.annotation = getAnnotations(value);
      outputChart.options.annotation.drawTime = $showAverages
        ? "afterDatasetsDraw"
        : null;
      outputChart.update();
    });
  });
</script>

<Card>
  <h2>Output Over Time</h2>
  <div class="chart-wrapper"><canvas id="outputChart" /></div>
  <AveragesByLength />
</Card>
