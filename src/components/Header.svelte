<script>
    import OptionsButton from "../options/OptionsButton.svelte";
    import {mappedCSVData} from "../store/store.js";

    export let isSidebarOpen = false;
</script>
<style>
  header {
    width: 100%;
    display: flex;
    background: #013A63;
    position: fixed;
    z-index: 99999;
    box-shadow: 2px 0px 5px #013A63;
  }
  div{
    flex: 0 1 auto;
  }
  div:first-of-type{
    flex: 1 1 auto;
  }
  h1 {
    letter-spacing: 1px;
    text-transform: lowercase;
    line-height: 52px;
    font-weight: 300;
    font-size: 18px;
    margin: 0 0 0 20px;
    padding: 0;
    color: #efefef;
  }
</style>

<header>
<div>
  <h1><span>Peloton</span> Metrics</h1>
</div>
  <div>
    {#if $mappedCSVData.length > 0}
      <OptionsButton bind:isSidebarOpen />
  {/if}
</div>
</header>
