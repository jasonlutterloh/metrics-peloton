<script>
    import { ridesToShow, csvData } from '../store/store.js';
    import OptionLabel from './OptionLabel.svelte';
</script>

<OptionLabel>
    Max Rides To Show (Feature Coming Soon)
    <input type="number" bind:value={$ridesToShow} disabled class="option-field" />
</OptionLabel>