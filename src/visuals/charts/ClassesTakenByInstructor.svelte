<script>
  import DoughnutChart from "../../components/charts/DoughnutChart.svelte";
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
    const backgroundColor = getColorArrayBasedOnLength(instructorsData.length).reverse();
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

<section>
  <div class="section-wrapper">
    <div class="left">
      <h2>Classes Taken Per Instructor</h2>
    </div>
    
    <div class="right">
  {#if isError}
    <p>{ERROR_MESSAGE}</p>
  {:else}
    <DoughnutChart
      title="Classes Taken Per Instructor"
      {datasets}
      bind:chartReference={chartReference} />
  {/if}
</div>
  </div>
</section>

<style>
  .section-wrapper{
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 10px;
    display: flex;
    align-items: center;
  }
  .left, .right{
    flex: 0 1 50%;
  }
  .left{
    margin: 0 auto;
  }
  .left{
    padding: 30px 20px;
  }
  @media only screen and (max-width: 768px) {
    .section-wrapper{
      flex-direction: column;
    }
  }
</style>
