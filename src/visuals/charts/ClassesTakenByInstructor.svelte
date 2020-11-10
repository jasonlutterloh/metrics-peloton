<script>
  import DoughnutChart from "../../components/charts/DoughnutChart.svelte";
  import Card from "../../components/Card.svelte";
  import {classesTakenPerInstructor} from "../../store/store.js";
  import {getColorArrayBasedOnLength} from "../../utils/colorUtils";

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

  const getDatasets = (instructorsData) => {
    const backgroundColor = getColorArrayBasedOnLength(instructorsData.length);
    const data = getCounts(instructorsData);
    const labels = getCountsLabels(instructorsData);
    return {
      datasets: [
        {
          data,
          backgroundColor,
        },
      ],
      labels,
    };
  };

  let datasets;
  let isError = false;
  let chartReference;
  const ERROR_MESSAGE =
    "There was an error generating the output over time chart.";

  try {
    datasets = getDatasets($classesTakenPerInstructor);
  } catch (e) {
    isError = true;
    console.error(ERROR_MESSAGE, e);
  }

  classesTakenPerInstructor.subscribe((value) => {
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

<Card>
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <DoughnutChart
      title="Classes Taken Per Instructor"
      {datasets}
      bind:chartReference={chartReference} />
  {/if}
</Card>
