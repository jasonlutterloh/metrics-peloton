<script>
  import {showSameDayRides} from "../store/store.js";
</script>

<style>
  .option-label {
    margin-bottom: 10px;
  }
</style>

<label class="option-label">
  <input
    type="checkbox"
    bind:checked={$showSameDayRides}
    class="option-field" />
  Show Same Day Rides (By default, only shows highest output per day)
</label>
