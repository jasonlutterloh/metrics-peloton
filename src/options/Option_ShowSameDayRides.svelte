<script>
    import { showSameDayRides } from '../store/store.js';
    import OptionLabel from './OptionLabel.svelte';
</script>

<OptionLabel>
    <input type="checkbox" bind:checked={$showSameDayRides} class="option-field" />
    Show Same Day Rides (By default, only shows highest output per day)
</OptionLabel>