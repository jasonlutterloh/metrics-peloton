<script>
    import { getContext } from 'svelte';
    import OptionsForm from './OptionsForm.svelte';

    const { open } = getContext('simple-modal');
    const showModal = () => {
		open(OptionsForm);
	};

</script>

<div>
    <button type="button" on:click={showModal}><span class="sr-only">Options</span></button>
</div>
<style>
    div{
        position: absolute;
        right: 15px;
        top: 10px;
    }
    button{
        background-image: url(/images/settings-icon.svg);
        background-repeat: no-repeat;
        background-size: 24px;
        height: 30px;
        width: 30px;
        background-position: center center;
        border: 0;
        background-color: transparent;
        transition: .5s all;
        border-radius: 100%;
        cursor: pointer;
    }
    button:hover,
    button:focus{
        transform: rotate(90deg);
        background-color: #cccccc;
    }
    button:active{
        background-color: #bbbbbb;
    }
</style>