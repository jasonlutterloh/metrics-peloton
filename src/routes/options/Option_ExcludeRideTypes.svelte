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

<div>
  <h3>Exclude Ride Types</h3>
  <div class="columns">
    {#each $rideTypes as type}
      <label class="option-label">
        <input
          type="checkbox"
          on:change={(e) => handleChange(type, e.target.checked)}
          checked={$rideTitleFilters.includes(type) ? "checked" : false}
          class="option-field"
        />
        {type}
      </label>
    {/each}
  </div>
</div>

<style>
  .columns {
    column-count: 2;
  }
  .option-label {
    margin-bottom: 10px;
  }
</style>
