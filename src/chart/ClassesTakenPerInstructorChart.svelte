<script>
  import { onMount } from "svelte";
  import Chart from "chart.js";
  import Card from "../components/Card.svelte";
  import { classesTakenPerInstructor } from "../store/store.js";
  import { getColorArrayBasedOnLength } from "./colorPalette";

  const getCounts = (data) => {
    return data.map((item) => {
      return item.count;
    });
  };
  const getCountsLabels = (data) => {
    return data.map((item) => {
      return item.instructor;
    });
  };

  const getChartData = (instructorsData) => {
    let backgroundColor = getColorArrayBasedOnLength(instructorsData.length);
    return {
      datasets: [
        {
          data: getCounts(instructorsData),
          backgroundColor,
        },
      ],
      labels: getCountsLabels(instructorsData),
    };
  };

  let instructorChart;

  let config = {
    data: getChartData($classesTakenPerInstructor),
    type: "doughnut",
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  onMount(async () => {
    let ctx = document.getElementById("instructorChart");
    instructorChart = new Chart(ctx, config);

    classesTakenPerInstructor.subscribe((value) => {
      instructorChart.data = getChartData(value);
      instructorChart.update();
    });
  });
</script>

<style>
  div {
    position: relative;
    min-height: 50vh;
  }
</style>

<Card>
  <h2>Classes Taken Per Instructor</h2>
  <div><canvas id="instructorChart" /></div>
</Card>
