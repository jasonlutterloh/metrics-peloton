<script>
  import DemoMode from "../data/demo/DemoMode.svelte";
  import ClearData from "../data/ClearData.svelte";
</script>
<style>
  footer{
    /* background-color: #012A4A; */
    /* color: #fff; */
    background: #013A63;
    color: white;
  }
  footer a{
    color: white;
    text-decoration: underline;
  }
  footer h2{
    font-size: 16px;
    text-align: left;
    margin-bottom: 10px;
  }
  .footer-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .column{
    flex: 1 1 auto;
    padding: 20px 20px 0;
    box-sizing: border-box;
    /* max-width: 600px; */
  }
  .right{
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    align-items: stretch;
  }
  @media only screen and (max-width: 768px) {
    .footer-wrapper{
      flex-direction: column;
    }
  }
</style>

<footer>
  <div class="footer-wrapper">
    <div class="column">
      <h2>Peloton Metrics</h2>
  <p>
    This app was built by a Peloton user and is just for fun. It is provided
    as-is and is not endorsed or sponsored in any way by Peloton.
  </p>
  <p>
    This is an open-source project.
    <a href="https://github.com/jasonlutterloh/metrics-peloton">View it on
      GitHub</a>
  </p>
</div>
<div class="column right">
  <DemoMode />
  <ClearData />
</div>
  
</div>
</footer>
