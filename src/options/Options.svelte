<script>
    import { showAverages } from '../store/store.js';
    import ShowAverages from './ShowAverages.svelte';
    import ExcludeRideTypes from './ExcludeRideTypes.svelte';
</script>


<h2>Options</h2>
<form>
    <ShowAverages />
    <ExcludeRideTypes />
</form>

<style>
    form {
        margin-left: 10px;
    }
</style>
    