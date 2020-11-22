<script>
  import {ridesToShow} from "../store/store.js";

  let ridesShown = $ridesToShow;
  const updateRidesShown = () => {
    ridesToShow.set(ridesShown);
  };
</script>

<style>
  form {
    margin-left: 10px;
  }
  .option-label, button{
    display: inline-block;
  }
  .option-label {
    margin-bottom: 10px;
  }
</style>

<form on:submit|preventDefault={updateRidesShown}>
<label class="option-label">
  Max Rides To Show
  <input
    type="number"
    bind:value={ridesShown}
    class="option-field" />
</label>
<button type="submit">Set</button>
</form>
