<script>
  import {ridesToShow} from "../store/store.js";

  let ridesShown = $ridesToShow;
  const updateRidesShown = () => {
    ridesToShow.set(ridesShown);
  };
</script>

<style>
  form{
    text-align: center;
  }
  div{
    margin-bottom: 20px;
  }
  .option-label, button{
    display: inline-block;
  }
  .option-label {
    margin-bottom: 10px;
  }
</style>

<div>
  <h3>Set Max Rides To Show</h3>
  <p><strong>Use with Caution!</strong> This controls the maximum number of rides to display, beginning with the most recent date (ie. If value was 50, last 50 rides would show). This will potentially override the date filter.</p>
  <form on:submit|preventDefault={updateRidesShown}>
    <label class="option-label">
      Max Rides To Show
      <input
        type="number"
        bind:value={ridesShown}
        class="option-field" />
    </label>
    <button class="normal-button" type="submit">Set</button>
    </form>
</div>

