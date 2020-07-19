<script>
    import { getContext } from 'svelte';
    import InstructionsContent from './InstructionsContent.svelte';
    import Button from '../../components/Button.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(InstructionsContent);
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