<script>
import { onMount } from "svelte";
import Chart from "chart.js";
import {convertStringToID} from '../../utils/stringUtils';

export let title;
export let datasets;
export let chartReference = "";

const ERROR_MESSAGE = "An error occurred creating the Output Chart";
const chartID = "chart-" + convertStringToID(title);
let isError = false;

let config = {
    type: "doughnut",
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0
      }
    },
  };

try {
  config.data = datasets;
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

<style>
  div {
    position: relative;
    min-height: 50vh;
  }
</style>

<h2>{title}</h2>
{#if isError}
  <p>{ERROR_MESSAGE}</p>
{:else}
  <div class="chart-wrapper">
      <canvas id={chartID} />
</div>
{/if}
