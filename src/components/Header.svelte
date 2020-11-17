<script>
    import Options from "../options/Options.svelte";
</script>
<style>
  header {
    /* position: fixed; */
    width: 100%;
    display: flex;
    /* z-index: 9; */
    background: #222;

  }
  div{
    flex: 0 1 auto;
  }
  div:first-of-type{
    flex: 1 1 auto;
  }
  h1 {
    letter-spacing: 1px;
    text-transform: lowercase;
    line-height: 52px;
    font-weight: 300;
    font-size: 18px;
    margin: 0 0 0 20px;
    padding: 0;
    color: #efefef;
  }
</style>

<header>
<div>
  <h1><span>Peloton</span> Metrics</h1>
</div>
  <div>
  <Options />
</div>
</header>
