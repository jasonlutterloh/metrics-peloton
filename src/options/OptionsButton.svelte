<script>
  export let isSidebarOpen = false;
</script>

<style>

  button {
    background-image: url(/images/settings-icon.svg);
    background-repeat: no-repeat;
    background-size: 24px;
    height: 30px;
    width: 30px;
    background-position: center center;
    border: 0;
    background-color: transparent;
    transition: 0.5s all;
    border-radius: 100%;
    cursor: pointer;
    margin: 10px;
  }
  button:hover,
  button:focus {
    transform: rotate(30deg);
  }
  button.isSidebarOpen{
    transform: rotate(-90deg);
  }
</style>


  <button type="button" on:click={() => isSidebarOpen = !isSidebarOpen} class:isSidebarOpen><span
      class="sr-only">Options</span></button>

