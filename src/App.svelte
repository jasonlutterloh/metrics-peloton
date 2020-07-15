<script>
	import DataIngestion from './DataIngestion.svelte';
	import OutputChart from './chart/OutputChart.svelte';
	import AverageOutputChart from './chart/AverageOutputChart.svelte';
	import AppMessage from './AppMessage.svelte';
	import PersonalRecords from './analytics/PersonalRecords.svelte';
	import {mappedData, averageOutputs} from './store/store.js';
	import OptionsWrapper from './options/OptionsWrapper.svelte';
</script>

<main>
	<h1><span>Peloton</span> Metrics</h1>
	{#if $mappedData.length > 0}
		<OptionsWrapper />
		<OutputChart />
		<AverageOutputChart />
		<PersonalRecords />
	{:else}
		<AppMessage />
	{/if}
	<DataIngestion />
	<p>This app was built by a Peloton user and is just for fun. It is provided as-is and is not endorsed or sponsored in any way by Peloton. <br/>
	Note: Analysis is only done on the data pasted into the form (which by default is the last 100 rides).</p>
	<p>This is an open-source project. <a href="https://github.com/jasonlutterloh/metrics-peloton">GitHub Link</a></p>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
	}
	h1 {
		letter-spacing: 4px;
		text-transform: uppercase;
		line-height: 52px;
		font-weight: 100;
		font-size: 22px;
		margin: 0 10px;
		padding: 0;
	}
	h1 > span {
		font-weight: 700;
		letter-spacing: 2px;
	}
	p {
		max-width: 1200px;
		margin: 0 auto 10px;
		text-align: center;
	}
</style>