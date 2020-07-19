<script>
    import { getContext } from 'svelte';
    import OptionsForm from './OptionsForm.svelte';
    import Button from '../components/Button.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(OptionsForm);
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