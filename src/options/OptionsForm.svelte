<script>
  import ExcludeRideTypes from "./Option_ExcludeRideTypes.svelte";
  import ShowSameDayRides from "./Option_ShowSameDayRides.svelte";
  import RidesToShow from "./Option_RidesToShow.svelte";
</script>

<style>
  form {
    margin-left: 10px;
  }
</style>

<h2>Options</h2>

  <RidesToShow />
<form>
  <ShowSameDayRides />
  <ExcludeRideTypes />
</form>
