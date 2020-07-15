<script>
    import { getContext } from 'svelte';
    import Instructions from './Instructions.svelte';
    import Button from '../components/Button.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(Instructions);
	};
</script>

<div>
    <Button clickHandler={showModal} title="Instructions" />
</div>

<style>
    div {
        float: right;
    }
</style>