<script>
    import { onMount } from "svelte";
    import {rawData} from '../store/store.js';
    import Card from '../components/Card.svelte';
    import Instructions from './instructions/Instructions.svelte';
    import Button from '../components/Button.svelte';
    import ErrorMessage from '../components/ErrorMessage.svelte';
    import InfoMessage from '../components/InfoMessage.svelte';
    import demoData from './sample-data.json';
    
    let data = JSON.stringify($rawData);
    let errorStatus = false;
    let isCollapsed = false;
    let y = 0;

    onMount(async () => {
        let localStorageData = localStorage.getItem("savedData"); 

        if (localStorageData){
            data = localStorageData;
            updateData();
        }
    });
    

    const updateData = () => {
        try{
            let parsedJson = JSON.parse(data);
            rawData.set(parsedJson);
            errorStatus = false;
            isCollapsed = true;
            y = 0;
            localStorage.setItem("savedData", data);
        } catch (error) {
            errorStatus = true;
        }
    }
    const clearData = () => {
        localStorage.clear();
        data = "";
        rawData.set();
        errorStatus = false;
    }
    const loadDemoMode = () =>{
        data = JSON.stringify(demoData);
        updateData();
    }
</script>

<svelte:window bind:scrollY={y} />

{#if !isCollapsed}
<Card>
    <Instructions />
    <form id="dataIngestion">
        <label>
            <h2>Data</h2>
            <textarea id="dataEntry" bind:value={data} />
        </label>
        <InfoMessage>Note: Your data is not sent anywhere or stored remotely. This app runs in the browser and uses local storage on your device. </InfoMessage>
        {#if errorStatus}
            <ErrorMessage>There was an error parsing your Peloton data.</ErrorMessage>
        {/if}
        <Button clickHandler={updateData} title="Update" />
        <Button clickHandler={clearData} title="Clear My Data" />
    </form>
    <button class="demo-link" on:click={() => loadDemoMode()}><span class="sr-only">Activate </span>Demo Mode</button>
</Card>
{:else}
<div class="edit-button-container">
    <Button clickHandler={()=>{isCollapsed = false}} title="Edit My Data" />
</div>
{/if}

<style>
    textarea {
        width: 100%;
        height: 50vh;
    }
    .edit-button-container {
        margin: 0 auto 20px;
        text-align: center;
    }
    .demo-link{
        background: none;
        border: 0;
        color: #333;
        cursor: pointer;
        padding: 10px;
        text-decoration: underline;
        position: absolute;
        right: 20px;
        bottom: 20px;
        transition: all .5s;
    }
    .demo-link:hover,
    .demo-link:focus{
        font-weight: bold;
    }
</style>