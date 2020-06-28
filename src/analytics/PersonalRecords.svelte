<script>
import {bestRides} from '../store/store.js'; 
import PersonalRecordRideCard from './PersonalRecordRideCard.svelte';
</script>

<div>
    <h2>Personal Records</h2>
    <div class="flex-container">
        {#each $bestRides as ride}
        <PersonalRecordRideCard ride={ride} />
        {/each}
    </div>
</div>

<style>
    h2 {
        margin-left: 20px;
    }
    .flex-container {
        flex-wrap: wrap;
    }
</style>