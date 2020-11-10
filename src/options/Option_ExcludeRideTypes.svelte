<script>
    import {rideTypes, rideTitleFilters} from "../store/store.js";
    import OptionLabel from "./OptionLabel.svelte";

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

<h3>Exclude Ride Types</h3>
<div>
    {#each $rideTypes as type}
    <OptionLabel>
        <input type="checkbox" on:change={(e)=>handleChange(type, e.target.checked)} checked={$rideTitleFilters.includes(type) ? "checked" : false} class="option-field"/>
        {type}
    </OptionLabel>
    {/each}
</div>

<style>
div{
	column-count: 2;
}
@media only screen and (max-width: 768px) {
    div{
        column-count: 1;
    }
}
</style>