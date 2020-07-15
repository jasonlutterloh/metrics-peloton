<script>
    import { getContext } from 'svelte';
    import Options from './Options.svelte';
    import Button from '../components/Button.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(Options);
	};

</script>

<div>
    <Button clickHandler={showModal} title="Options" />
</div>
<style>
    div{
        position: absolute;
        right: 20px;
        top: 10px;
    }
</style>