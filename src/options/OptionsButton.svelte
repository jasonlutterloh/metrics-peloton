<script>
  import {getContext} from "svelte";
  import OptionsForm from "./OptionsForm.svelte";

  const {open} = getContext("simple-modal");
  const showModal = () => {
    open(OptionsForm);
  };
</script>

<style>

  button {
    background-image: url(/images/settings-icon.svg);
    background-repeat: no-repeat;
    background-size: 24px;
    height: 30px;
    width: 30px;
    background-position: center center;
    border: 0;
    background-color: transparent;
    transition: 0.5s all;
    border-radius: 100%;
    cursor: pointer;
    margin: 10px;
  }
  button:hover,
  button:focus {
    transform: rotate(90deg);
    /* background-color: #008ae6; */
  }
  button:active {
    /* background-color: #008ae6; */
  }
</style>


  <button type="button" on:click={showModal}><span
      class="sr-only">Options</span></button>

