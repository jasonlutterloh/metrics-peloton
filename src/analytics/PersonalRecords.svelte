<script>
  import { bestRides } from "../store/store.js";
  import PersonalRecordRideCard from "./PersonalRecordRideCard.svelte";
</script>

<style>
  h2 {
    margin: 20px 0 20px 10px;
  }
  div {
    display: flex;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  @media only screen and (max-width: 768px) {
    div {
      flex-direction: column;
    }
  }
</style>

<h2>Personal Records</h2>
<div>
  {#each $bestRides as ride}
    <PersonalRecordRideCard {ride} />
  {/each}
</div>
