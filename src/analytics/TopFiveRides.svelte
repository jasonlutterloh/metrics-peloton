<script>
    import ProgressBar from './ProgressBar.svelte';
    import {trimRideTitle} from './utils';
    export let rides;
    export let color;
</script>

{#each rides as ride}
    <ProgressBar barLabel={ride.output} leftLabel={trimRideTitle(ride.title)} rightLabel={ride.instructor} fillColor={color} percentage={(ride.output/rides[0].output) * 100}/>
{/each}