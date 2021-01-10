<script>
  import {rideTypes, rideTitleFilters} from "../store/store.js";

  const handleChange = (filter, value) => {
    if (value) {
      $rideTitleFilters.push(filter);
    } else {
      const filterToRemove = $rideTitleFilters.indexOf(filter);
      $rideTitleFilters.splice(filterToRemove, 1);
    }

    rideTitleFilters.set($rideTitleFilters);
  };
</script>

<style>
  div {
    column-count: 2;
  }
  @media only screen and (max-width: 768px) {
    div {
      column-count: 1;
    }
  }
  .option-label {
    margin-bottom: 10px;
  }
</style>

<div>
<h3>Exclude Ride Types</h3>
<div>
  {#each $rideTypes as type}
    <label class="option-label">
      <input
        type="checkbox"
        on:change={(e) => handleChange(type, e.target.checked)}
        checked={$rideTitleFilters.includes(type) ? "checked" : false}
        class="option-field" />
      {type}
    </label>
  {/each}
</div>
</div>
