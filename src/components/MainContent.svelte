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
</script>

<style>
  main {
    /* max-width: 1200px; */
    margin: 0 auto;
    /* padding: 20px 0; */
  }
</style>

<main>
  {#if $isError}
    <ErrorMessage>
      Sorry, an error occurred while processing the workout data.
    </ErrorMessage>
  {/if}
  {#if $mappedCSVData.length > 0}
  
    <OutputOverTime />
    <AverageOutput />

    <FTP />

    <!-- <PersonalRecords /> // May use this again but needs styling-->
    <ClassesTakenByInstructor />
    <AverageCadenceVsResistance />
    <TopFiveSection />
    <TotalsCard />
  {/if}
  <CSVUpload />
</main>
