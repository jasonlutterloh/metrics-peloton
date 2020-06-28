<script>
    import { getContext } from 'svelte';
    import Options from './Options.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(Options);
	};

</script>

<button on:click={showModal}>Options</button>

<style>
    button{
        position: absolute;
        right: 20px;
        top: 10px;
    }
</style>