<script>
  import {onMount} from "svelte";
  import Chart from "chart.js";
  import * as ChartAnnotation from "chartjs-plugin-annotation";
  import {convertStringToID} from "../../utils/stringUtils";

  export let title;
  export let datasets;
  export let annotations = {};
  export let isDarkMode = false;

  export let chartReference = "";
  const ERROR_MESSAGE = "An error occurred creating the line chart";
  const chartID = "chart-" + convertStringToID(title);
  let isError = false;

  const config = {
    type: "line",
    options: {
      animation: {
        duration: 0,
      },
      borderJoinStyle: "round",
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontSize: 16,
          fontColor: "#222",
          padding: 20,
        },
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {},
            ticks: {},
          },
        ],
        xAxes: [
          {
            type: "time",
            distribution: "linear",
            bounds: "data",
            time: {
              unit: "month",
              tooltipFormat: "MMM DD YYYY",
            },
            gridLines: {},
            ticks: {},
          },
        ],
      },
    },
  };

  if (isDarkMode) {
    config.options.legend.fontColor = "#efefef";
    config.options.scales.xAxes[0].gridLines.color = "#efefef";
    config.options.scales.xAxes[0].ticks.fontColor = "#efefef";
    config.options.scales.yAxes[0].gridLines.color = "#efefef";
    config.options.scales.yAxes[0].ticks.fontColor = "#efefef";
  }
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
      const ctx = document.getElementById(chartID);
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
