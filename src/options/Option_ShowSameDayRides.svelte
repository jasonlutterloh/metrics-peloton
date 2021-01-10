<script>
  import {showSameDayRides} from "../store/store.js";
</script>

<style>
  .option-label {
    margin-bottom: 10px;
  }
</style>

<div>
  <h3>Exclude Same Day Rides</h3>
  <p>This is useful to filter out pre/post rides (such as cooldown rides, etc). By default, only the highest output ride for a day will be shown.</p>
  <label class="option-label">
    <input
      type="checkbox"
      bind:checked={$showSameDayRides}
      class="option-field" />
    Show Same Day Rides
  </label>
</div>

