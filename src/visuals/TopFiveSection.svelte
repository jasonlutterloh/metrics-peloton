<script>
  import {onMount} from "svelte";
  import {organizedRidesSortedByOutput} from "../store/store.js";
  import TopFiveRides from "./TopFiveRides.svelte";
  import {getColorBasedOnArrayLengthAndIndex} from "../utils/colorUtils";
  import Card from "../components/Card.svelte";

  let durations = Object.keys($organizedRidesSortedByOutput).reverse();

  onMount(async () => {
    organizedRidesSortedByOutput.subscribe((value) => {
      durations = Object.keys(value).reverse();
    });
  });
</script>

<style>
  h2 {
    margin-bottom: 20px;
  }
  .top-five-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
  .top-five-card {
    flex: 0 1 calc(50% - 10px);
    margin: 0 20px 0 0;
  }
  .top-five-card:nth-of-type(even) {
    margin-right: 0;
  }
  @media only screen and (max-width: 768px) {
    .top-five-container {
      flex-direction: column;
    }
    .top-five-card {
      margin: 0;
    }
  }
</style>

<div class="top-five-container">
  {#each durations as duration, i}
    <div class="top-five-card">
      <Card>
        <h2>Top {duration} Min Rides</h2>
        <div>
          <TopFiveRides
            rides={$organizedRidesSortedByOutput[duration].slice(0, 5)}
            color={getColorBasedOnArrayLengthAndIndex(durations.length, i)} />
        </div>
      </Card>
    </div>
  {/each}
</div>
