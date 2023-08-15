<script>
  import {averageOutputByRideType} from "../store/store";

</script>

<section>
  <div class="section-wrapper">
    <h2>Top 8 Average Outputs By Ride Type</h2>
    <ul class="list-wrapper">
      {#each $averageOutputByRideType.slice(0, 8) as rideType}
        <li class="chart-value">
            {rideType.type}
            <span>{rideType.averageOutput}</span>
          </li>
      {/each}
      </ul>
  </div>
</section>

<style>
  section{
    background: #048ba8ff;
    color: #fff;
  }
  .list-wrapper{
    padding: 0;
    max-width: 480px;
    margin: 0 auto;
  }
  .chart-value{
    background: #fff;
    color: #048ba8ff;
    font-size: 16px;
    padding: 1em 1.4em;
    line-height: 24px;
    margin-bottom: 10px;
  }
  span{
    font-weight: 100;
    font-size: 24px;
    float: right;
  }
</style>
