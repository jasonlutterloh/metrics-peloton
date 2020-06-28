<script>
    import { getContext } from 'svelte';
    import Instructions from './Instructions.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(Instructions);
	};
</script>

<button on:click={showModal}>Instructions</button>

<style>
    button {
        float: right;
    }
</style>