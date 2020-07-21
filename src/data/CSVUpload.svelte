<script>
  import { onMount } from "svelte";
  import Card from "../components/Card.svelte";
  import InfoMessage from "../components/InfoMessage.svelte";
  import { csvData } from "../store/store.js";
  import Instructions from "./instructions/Instructions.svelte";
  import demoData from './demoData.json';

  let files;
  let errorStatus = false;
  let isCollapsed = false;
  let y = 0;

  onMount(async () => {
    let localStorageData = localStorage.getItem("savedData");

    if (localStorageData) {
      updateData(JSON.parse(localStorageData));
    }
  });

  const updateData = json => {
    try {
      csvData.set(json);
      errorStatus = false;
      isCollapsed = true;
      y = 0;
      localStorage.setItem("savedData", JSON.stringify(json));
    } catch (error) {
      errorStatus = true;
    }
  };
  const clearData = () => {
    localStorage.clear();
    csvData.set();
    errorStatus = false;
  };

  const CSVtoJSON = csv => {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      let currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  };

  const upload = () => {
    if (files && files.length > 0) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let json = CSVtoJSON(e.target.result);
        console.log(JSON.stringify(json));
        updateData(json);
      };
      reader.readAsText(files[0]);
    }
  };
  const loadDemoMode = () =>{
    updateData(demoData);
  }
</script>

<style>
  form {
    text-align: center;
  }
  div {
    margin: 0 auto;
    max-width: 400px;
  }
  label {
    margin: 20px 0;
  }
</style>

<svelte:window bind:scrollY={y} />

<Card>
  <h2>Data</h2>
  <Instructions />

  <form on:submit|preventDefault={upload}>
    <label>
      CSV Upload:
      <input required type="file" bind:files />
    </label>
    <div>
      <button type="submit">Update</button>
      <button type="button" on:click={clearData}>Clear My Data</button>
      <button class="link-button" on:click={() => loadDemoMode()}><span class="sr-only">Activate </span>Demo Mode</button>
    </div>
    <InfoMessage>
      Note: Your data is not sent anywhere or stored remotely. This app runs in
      the browser and uses local storage on your device.
    </InfoMessage>
  </form>
</Card>
