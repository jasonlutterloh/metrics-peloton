<script>
  import OptionsButton from "./OptionsButton.svelte";
  import MenuButton from "./MenuButton.svelte";
  import OptionsSidebar from "../../options/OptionsSidebar.svelte";
  import MenuSidebar from "../../options/WorkoutTypeSelectionSidebar.svelte";
  import {activeWorkoutType, csvData, dateFilter} from "$lib/store/store";
  import {getFriendlyDate} from "$lib/utils/dateUtils";
</script>

<header>
  <div>
    {#if $csvData}
      <MenuButton />
      <MenuSidebar />
    {/if}
  </div>
  <div>
    <h1>Peloton Metrics{#if $csvData}&nbsp;| <span>{$activeWorkoutType}</span>{/if}</h1>
  </div>
  <div>
    {#if $csvData}
    <span class="time-period">
      <span class="sr-only">For dates: </span>{getFriendlyDate($dateFilter.startDate)} - {getFriendlyDate(
        $dateFilter.endDate
      )}
    </span> 
      <OptionsButton />
      <OptionsSidebar />
    {/if}
  </div>
</header>



<style>
  header {
    width: 100%;
    display: flex;
    background: #013a63;
    position: fixed;
    z-index: 99999;
    box-shadow: 2px 0px 5px #013a63;
  }
  div {
    flex: 0 1 auto;
  }
  div:nth-of-type(2) {
    flex: 1 1 auto;
  }
  h1 {
    letter-spacing: 0px;
    line-height: 52px;
    font-weight: 300;
    font-size: 18px;
    margin: 0 0 0 20px;
    padding: 0;
    color: #efefef;
  }
  h1 > span{
    font-weight: bold;
  }
  .time-period {
    color: #fff;
    text-align: right;
    font-size: 14px;
    display: inline-block;
    line-height: 50px;
    vertical-align: bottom;

  }
  @media only screen and (max-width: 768px) {
    .time-period {
      display: none;
    }
  }
</style>
