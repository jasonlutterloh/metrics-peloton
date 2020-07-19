<script>
    import { showAverages } from '../store/store.js';
    import ShowAverages from './Option_ShowAverages.svelte';
    import ExcludeRideTypes from './Option_ExcludeRideTypes.svelte';
    import ShowSameDayRides from './Option_ShowSameDayRides.svelte';
</script>


<h2>Options</h2>
<form>
    <ShowAverages />
    <ShowSameDayRides />
    <ExcludeRideTypes />
</form>

<style>
    form {
        margin-left: 10px;
    }
</style>
    