<script>
    import CSVUpload from '../data/CSVUpload.svelte';
	import OutputChart from '../chart/OutputChart.svelte';
	import AverageOutputChart from '../chart/AverageOutputChart.svelte';
	import ErrorMessage from '../components/ErrorMessage.svelte';
	// import PersonalRecords from '../analytics/PersonalRecords.svelte';
	import {mappedCSVData} from '../store/store.js';
	import Options from '../options/Options.svelte';
</script>

<main>
	{#if $mappedCSVData.length > 0}
		<Options />
        
        <OutputChart />
        <AverageOutputChart />
        <!-- <PersonalRecords /> // May use this again but needs styling-->
	{:else}
		<ErrorMessage>Looks like you haven't added your data yet. Click the "Instructions" button to begin.</ErrorMessage>
	{/if}
	<CSVUpload />
</main>

<style>
	main {
		max-width: 1200px;
        margin: 0 auto;
        padding: 0 10px;
	}
</style>