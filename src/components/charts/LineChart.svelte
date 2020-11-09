<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../Card.svelte";
  import * as ChartAnnotation from "chartjs-plugin-annotation";
  import {convertStringToID} from '../../utils/stringUtils';

  export let title;
  export let datasets;
  export let annotations = {};

  export let chartReference = "";
  const ERROR_MESSAGE = "An error occurred creating the line chart";
  const chartID = "chart-" + convertStringToID(title);
  let isError = false;

  let config = {
    type: "line",
    options: {
      animation: {
        duration: 0
      },
      borderJoinStyle: "round",
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [
          {
            type: "time",
            distribution: "series",
            bounds: "data",
            time: {
              unit: "day",
              tooltipFormat: "MMM DD YYYY",
            },
          },
        ],
      },
    },
  };

  try {
    config.data = datasets;
    if (annotations) {
      config.plugins = [ChartAnnotation];
      config.options.annotation = annotations;
    }
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  onMount(async () => {
    try {
      let ctx = document.getElementById(chartID);
      chartReference = new Chart(ctx, config);
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>

  <h2>{title}</h2>
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <div class="chart-wrapper"><canvas id={chartID} /></div>
  {/if}
