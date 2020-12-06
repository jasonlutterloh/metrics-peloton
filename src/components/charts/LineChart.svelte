<script>
  import {onMount} from "svelte";
  import Chart from "chart.js";
  import chartTrendline from "chartjs-plugin-trendline";
  import {convertStringToID} from "../../utils/stringUtils";

  export let title;
  export let datasets;
  export let isDarkMode = false;

  export let chartReference = "";
  const ERROR_MESSAGE = "An error occurred creating the line chart";
  const chartID = "chart-" + convertStringToID(title);
  let isError = false;

  const config = {
    type: "line",
    options: {
      borderJoinStyle: "round",
      maintainAspectRatio: false,
      legend: {
        display: false,
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
            gridLines: {
              zeroLineColor: "rgba(255,255,255,0)",
            },
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
              tooltipFormat: "MMM DD",
            },
            gridLines: {
              zeroLineColor: "rgba(255,255,255,0)",
            },
            ticks: {},
          },
        ],
      },
    },
  };

  if (isDarkMode) {
    config.options.legend.fontColor = "#efefef";
    config.options.scales.xAxes[0].gridLines.color = "rgba(239,239,239,.1)";
    config.options.scales.xAxes[0].ticks.fontColor = "#efefef";
    config.options.scales.yAxes[0].gridLines.color = "rgba(239,239,239,.1)";
    config.options.scales.yAxes[0].ticks.fontColor = "#efefef";
  }

  try {
    config.data = datasets;
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  onMount(async () => {
    try {
      Chart.plugins.register(chartTrendline);
      const ctx = document.getElementById(chartID);
      chartReference = new Chart(ctx, config);
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>

{#if isError}
  <p>{ERROR_MESSAGE}</p>
{:else}
  <div class="chart-wrapper"><canvas id={chartID} /></div>
{/if}
