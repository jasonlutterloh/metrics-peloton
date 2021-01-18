<script>
  import ExcludeRideTypes from "./Option_ExcludeRideTypes.svelte";
  import ShowSameDayRides from "./Option_ShowSameDayRides.svelte";
  import RidesToShow from "./Option_RidesToShow.svelte";
  import OptionDates from "./Option_Dates.svelte";
  import {fly} from "svelte/transition";

  export let isSidebarOpen = false;
</script>

{#if isSidebarOpen}
<aside transition:fly="{{x: 200, duration: 500}}" class:open = {isSidebarOpen}>
  <div>
    <h2>Options</h2>
      <OptionDates />
      <RidesToShow />
    <form>
      <ExcludeRideTypes />
      <ShowSameDayRides />
    </form>
  </div>
</aside>
<div class="overlay" on:click={() => isSidebarOpen = !isSidebarOpen}></div>
{/if}

<style>
  aside{
    top: 0;
    height: 100vh;
    width: 30vw;
    position: fixed;
    background: #efefef;
    z-index: 99998;
    overflow: scroll;
  }
  .open{
    left: 70vw;
    box-shadow: -1px 0 2px #777;
  }
  aside > div{
    padding: 20px;
  }
  .overlay{
    position:fixed;
    top:0;    
    left:0;
    width:100%;
    height: 100vh;
    background:rgba(0,0,0,.5);
    z-index: 9997;
  }
  @media only screen and (max-width: 768px) {
    aside{
      width: 90vw;
    }
    .open{
      left: 10vw;
    }
  }
</style>