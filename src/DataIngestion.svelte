<script>
    import { onMount } from "svelte";
    import {rawData} from './store/store.js';
    import InstructionsWrapper from './instructions/InstructionsWrapper.svelte';
    
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
</script>

<svelte:window bind:scrollY={y} />

{#if !isCollapsed}
<div class="card">
    <InstructionsWrapper />
    <form id="dataIngestion">
        <label>
            <h2>Data</h2>
            <textarea id="dataEntry" bind:value={data} />
        </label>
        <p class="info">Note: Your data is not sent anywhere or stored remotely. This app runs in the browser and uses local storage on your device. </p>
        {#if errorStatus}
            <p class="error">There was an error parsing your Peloton data.</p>
        {/if}
        <button type="button" on:click={updateData}>Update</button>
        <button type="button" on:click={clearData}>Clear My Data</button>
    </form>
</div>
{:else}
<div class="edit-button-container">
    <button type="button" on:click={()=>{isCollapsed = false}}>Edit My Data</button>
</div>
{/if}

<style>
    textarea {
        width: 100%;
        height: 50vh;
    }
    button {
        background-color: rgba(71, 106, 111, .1);
        border: .5px solid rgba(71, 106, 111, .6);
        padding: 10px;
        transition: .5s background;
    }
    button:hover,
    button:focus {
        background-color: rgba(71, 106, 111, .3);
    }
    button:active {
        background-color: rgba(71, 106, 111, .5);
    }
    .edit-button-container {
        margin: 0 auto 20px;
        text-align: center;
    }
</style>