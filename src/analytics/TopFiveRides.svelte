<script>
    import ProgressBar from './ProgressBar.svelte';
    export let rides;
    export let color;

    let maxOutput = rides[0].output;

    const trimRideTitle = (title) => {
        let indexOfTextToRemove = title.indexOf("min") + 3;
        if (indexOfTextToRemove > 0){
            return title.substring(indexOfTextToRemove);
        }
        return title;
    }
</script>

{#each rides as ride}
    <ProgressBar barLabel={ride.output} leftLabel={trimRideTitle(ride.title)} rightLabel={ride.instructor} fillColor={color} percentage={(ride.output/maxOutput) * 100}/>
{/each}