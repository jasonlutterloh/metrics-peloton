<script>
  import {onMount} from "svelte";
  import Chart from "chart.js/auto";
  import chartTrendline from "chartjs-plugin-trendline";
  import 'chartjs-adapter-moment';
  import {convertStringToID} from "../../utils/stringUtils";

  export let title;
  export let datasets;
  export let isDarkMode = false;

  export let chartReference = "";
  const ERROR_MESSAGE = "An error occurred creating the line chart";
  const chartID = "chart-" + convertStringToID(title);
  let isError = false;
  let screenWidth = 0;
  const config = {
    type: "line",
    options: {
      scales: {
        xAxis: {
          grid:{},
          ticks:{},
          type: 'time',
          time: {
            tooltipFormat: "MMM DD YYYY",
          },
        },
        yAxis:{
          grid:{},
          ticks:{},
        }
      },
      plugins:{
        legend:{
          display: false
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            const item = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return item.title + ": " + item.y;
          },
        },
      },
    },
  };

  if (isDarkMode) {
    config.options.scales.xAxis.grid["color"] = "rgba(239,239,239,.1)";
    config.options.scales.xAxis.ticks["color"] = "#efefef";
    config.options.scales.yAxis.grid["color"] = "rgba(239,239,239,.1)";
    config.options.scales.yAxis.ticks["color"] = "#efefef";
  }

  try {
    config.data = datasets;
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  onMount(async () => {
    try {
      const ctx = document.getElementById(chartID);
      if (screenWidth < 768) {
        Chart.defaults.elements.point.radius = 0;
        Chart.defaults.elements.line.borderWidth = 2;
      }

      chartReference = new Chart(ctx, config);
    } catch (e) {
      isError = true;
      console.error(ERROR_MESSAGE, e);
    }
  });
</script>
<svelte:window bind:innerWidth={screenWidth}/>
{#if isError}
  <p>{ERROR_MESSAGE}</p>
{:else}
  <div class="chart-wrapper"><canvas id={chartID} /></div>
{/if}
