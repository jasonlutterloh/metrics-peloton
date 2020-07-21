<script>
    import { getContext } from 'svelte';
    import OptionsForm from './OptionsForm.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(OptionsForm);
	};

</script>

<div>
    <button type="button" on:click={showModal}>Options</button>
</div>
<style>
    div{
        position: absolute;
        right: 20px;
        top: 10px;
    }
</style>