<script>
    import {csvData} from "../store/store.js";

    const clearData = () => {
      localStorage.clear();
      csvData.set();
};
</script>

<button class="footer-button" type="button" on:click={clearData}>Clear My Data</button>