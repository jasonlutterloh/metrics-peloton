<script>
    import { showAverages } from '../store/store.js';
    import OptionLabel from './OptionLabel.svelte';
</script>

<OptionLabel>
    <input type="checkbox" bind:checked={$showAverages} class="option-field" />
    Show Average Line On Graph 
</OptionLabel>