<script>
  import CSVUpload from "../data/CSVUpload.svelte";
  import OutputOverTime from "../visuals/charts/OutputOverTime.svelte";
  import FTP from "../visuals/charts/FTP.svelte";
  import AverageOutput from "../visuals/charts/AverageOutput.svelte";
  import AverageCadenceVsResistance from "../visuals/charts/AverageCadenceVsResistance.svelte";
  import ClassesTakenByInstructor from "../visuals/charts/ClassesTakenByInstructor.svelte";
  import ErrorMessage from "../components/ErrorMessage.svelte";
  import {mappedCSVData, isError} from "../store/store.js";
  import TopFiveSection from "../visuals/TopFiveSection.svelte";
  import TotalsCard from "../visuals/TotalsCard.svelte";
import InfoMessage from "./InfoMessage.svelte";
import AverageOutputByRideType from "../visuals/AverageOutputByRideType.svelte";
</script>

<style>
  main {
    margin: 0 auto;
  }
</style>

<main>
  {#if $isError}
    <ErrorMessage>
      Sorry, an error occurred while processing the data. Please try again.
    </ErrorMessage>
  {:else}
    {#if $mappedCSVData.length > 0}
      <OutputOverTime />
      <AverageOutput />
      <FTP />
      <ClassesTakenByInstructor />
      <AverageCadenceVsResistance />
      <AverageOutputByRideType />
      <TopFiveSection />
      <TotalsCard />
      {:else}
      <InfoMessage>Upload your Peloton rides to see your output over time, averages, top rides, and more!</InfoMessage>
    {/if}
  {/if}
  <CSVUpload />
</main>
