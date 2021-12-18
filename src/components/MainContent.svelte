<script>
  import CSVUpload from "../data/CSVUpload.svelte";
  import OutputOverTime from "../visuals/charts/OutputOverTime.svelte";
  import FTP from "../visuals/charts/FTP.svelte";
  import AverageOutput from "../visuals/charts/AverageOutput.svelte";
  import AverageCadenceVsResistance from "../visuals/charts/AverageCadenceVsResistance.svelte";
  // import AverageOutputByInstructor from "../visuals/charts/AverageOutputByInstructor.svelte";
  import ClassesTakenByInstructor from "../visuals/charts/ClassesTakenByInstructor.svelte";
  import ErrorMessage from "../components/ErrorMessage.svelte";
  import {mappedCSVData, isError} from "../store/store.js";
  import TopFiveSection from "../visuals/TopFiveSection.svelte";
  import TotalsSection from "../visuals/TotalsSection.svelte";
import InfoMessage from "./InfoMessage.svelte";
import AverageOutputByRideType from "../visuals/AverageOutputByRideType.svelte";
  import AverageTotalOutputByInstructor from "../visuals/charts/AverageTotalOutputByInstructor.svelte";
</script>

<style>
  main {
    margin: 0 auto;
    padding-top: 50px;
  }
</style>

<main>
  {#if $isError}
    <ErrorMessage>
      Sorry, an error occurred while processing your file. Please try again.
    </ErrorMessage>
    {/if}

    {#if $mappedCSVData.length > 0}
      <TotalsSection /> 
      <OutputOverTime />
      <AverageOutput />
      <FTP />
      <ClassesTakenByInstructor />
      <!-- <AverageOutputByInstructor /> Hiding this for now-->
      <AverageTotalOutputByInstructor />
      <AverageCadenceVsResistance />
      <AverageOutputByRideType />
      <TopFiveSection />
      
      {:else}
      <InfoMessage>Upload your Peloton rides to see your output over time, averages, top rides, and more!</InfoMessage>
      <CSVUpload />

    {/if}
  
</main>
