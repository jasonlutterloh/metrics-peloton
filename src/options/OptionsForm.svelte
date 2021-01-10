<script>
  import ExcludeRideTypes from "./Option_ExcludeRideTypes.svelte";
  import ShowSameDayRides from "./Option_ShowSameDayRides.svelte";
  import RidesToShow from "./Option_RidesToShow.svelte";
  import OptionDates from "./Option_Dates.svelte";
</script>

<h2>Options</h2>
  <OptionDates />
  <RidesToShow />
<form>
  <ExcludeRideTypes />
  <ShowSameDayRides />
</form>
