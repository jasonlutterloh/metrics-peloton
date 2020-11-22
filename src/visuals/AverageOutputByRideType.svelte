<script>
  import {averageOutputByRideType} from "../store/store";

</script>

<section>
  <div class="section-wrapper">
    <h2>Average Output By Ride Type</h2>
    <div class="chart-wrapper">
      {#each $averageOutputByRideType as rideType}
        <div class="chart-value">
          <p>
            {rideType.type}
            <span>{rideType.averageOutput}</span></p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section{
    background: #048ba8ff;
    color: #fff;
  }
  .chart-wrapper{
    display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 30px;
  }
  .chart-wrapper > div::before {
  content: "";
  padding-bottom: 100%;
  display: block;
}
  .chart-value{
    background: #fff;
    color: #048ba8ff;
    font-size: 16px;
    position: relative;
  }
  p{
    text-align: center;
    position: absolute;
  max-width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  }
  span{
    display: block;
    font-weight: 100;
    font-size: 36px;
  }
</style>