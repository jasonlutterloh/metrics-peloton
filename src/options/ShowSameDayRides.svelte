<script>
    import { showSameDayRides } from '../store/store.js';
</script>

<label class="option-label">
    <input type="checkbox" bind:checked={$showSameDayRides} class="option-field" />
    Show Same Day Rides (By default, only shows highest output per day)
</label>