<script>
  import {onMount} from "svelte";
  import Card from "../components/Card.svelte";
  import InfoMessage from "../components/InfoMessage.svelte";
  import {csvData} from "../store/store.js";
  import Instructions from "./instructions/Instructions.svelte";
  import {csvToJson} from "../utils/fileUtils";

  import demoData from "./demoData.json";

  let files;
  let errorStatus = false;
  let isCollapsed = false;
  let y = 0;

  onMount(async () => {
    const localStorageData = localStorage.getItem("savedData");

    if (localStorageData) {
      updateData(JSON.parse(localStorageData));
    }
  });

  const updateData = (json) => {
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

  const upload = () => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const json = csvToJson(e.target.result);
        updateData(json);
      };
      reader.readAsText(files[0]);
    }
  };
  const loadDemoMode = () =>{
    updateData(demoData);
  };
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
    </div>
  </form>
  <div>
    <button class="link-button" on:click={() => loadDemoMode()}><span class="sr-only">Activate </span>Demo Mode</button>
    <InfoMessage>
      Note: Your data is not sent anywhere or stored remotely. This app runs in
      the browser and uses local storage on your device.
    </InfoMessage>
 </div>
</Card>
