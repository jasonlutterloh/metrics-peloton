<script>
  import {ridesToShow} from "../store/store.js";
</script>

<style>
  .option-label {
    margin-bottom: 10px;
  }
</style>

<label class="option-label">
  Max Rides To Show (Feature Coming Soon)
  <input
    type="number"
    bind:value={$ridesToShow}
    disabled
    class="option-field" />
</label>
