<script>
  import { onMount } from "svelte";
  import { organizedRidesSortedByOutput } from "../store/store.js";
  import TopFiveRides from "./TopFiveRides.svelte";
  import { getColorBasedOnArrayLengthAndIndex } from "../utils/colorUtils";

  let durations = Object.keys($organizedRidesSortedByOutput).reverse();

  onMount(async () => {
    organizedRidesSortedByOutput.subscribe((value) => {
      durations = Object.keys(value).reverse();
    });
  });
</script>

<section class="top-five-container">
  {#each durations.reverse() as duration, i}
    <div class="top-five-card">
      <div class="section-wrapper">
        <h2 style="color:{getColorBasedOnArrayLengthAndIndex(durations.length, i)}">
          Top
          {duration}
          Min Rides
        </h2>
        <div>
          <TopFiveRides
            rides={$organizedRidesSortedByOutput[duration].slice(0, 5)}
            color={getColorBasedOnArrayLengthAndIndex(durations.length, i)}
          />
        </div>
      </div>
    </div>
  {/each}
</section>

<style>
  h2 {
    margin-bottom: 20px;
  }
  .top-five-container {
    margin: 30px 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
  }
  .section-wrapper {
    padding: 0 10px;
  }
  .top-five-card {
    flex: 1 1 300px;
    margin: 30px;
    max-width: 600px;
  }
  @media only screen and (max-width: 768px) {
    .top-five-card {
      margin: 20px;
    }
  }
</style>
