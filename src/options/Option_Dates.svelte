<script>
  import {dateFilter} from "../store/store.js";

  let startDate = $dateFilter.startDate;
  let endDate = $dateFilter.endDate;

  const updateDateFilters = () => {
    dateFilter.set({startDate, endDate});
  };
</script>

<style>
  div{
    margin-bottom: 20px;
  }
  .option-label, button{
    display: inline-block;
  }
  .option-label {
    display: block;
    margin-bottom: 10px;
  }
  button{
    display:block;
  }
</style>

<div>
  <h3>Date Filter</h3>
<form on:submit|preventDefault={updateDateFilters}>
<label class="option-label">
  Start Date  <input
    type="date"
    bind:value={startDate}
    placeholder="yyyy-mm-dd"
    class="option-field" />
</label>
<label class="option-label">
  End Date  <input
    type="date"
    bind:value={endDate}
    placeholder="yyyy-mm-dd"
    class="option-field" />
</label>
<button type="submit">Set</button>
</form>
</div>