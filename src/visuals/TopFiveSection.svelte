<script>
  import {onMount} from "svelte";
  import {organizedRidesSortedByOutput} from "../store/store.js";
  import TopFiveRides from "./TopFiveRides.svelte";
  import {getColorBasedOnArrayLengthAndIndex} from "../utils/colorUtils";

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
    margin: 60px 10px;
  }
  .top-five-card {
    max-width: 600px;
    margin: 0 auto 30px;
  }
  .section-wrapper {
    padding: 20px 0;
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

<section class="top-five-container">
  {#each durations as duration, i}
    <div class="top-five-card">
      <div class="section-wrapper">
        <h2
          style="color:{getColorBasedOnArrayLengthAndIndex(durations.length, i)}">
          Top
          {duration}
          Min Rides
        </h2>
        <div>
          <TopFiveRides
            rides={$organizedRidesSortedByOutput[duration].slice(0, 5)}
            color={getColorBasedOnArrayLengthAndIndex(durations.length, i)} />
        </div>
      </div>
    </div>
  {/each}
  </section>
