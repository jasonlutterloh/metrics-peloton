<script>
  import {averagesByLength} from "../store/store.js";
</script>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 20px 0 0 0;
    padding: 0;
    list-style: none;
  }
  li {
    flex: 1 1 auto;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    text-shadow: 0 0 1px #222;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span{
    flex: 0 1 auto;
    text-align: center;
  }
  span:nth-of-type(2){
    font-size: 3em;
    font-weight: 200;
  }
</style>

<h3 class="sr-only">Averages By Ride Length</h3>
<ul>
  {#each $averagesByLength as average}
    <li style="background-color:{average.color}">
      <span>{average.duration} Minute Average</span>
      <span>{average.value}</span>
    </li>
  {/each}
</ul>
