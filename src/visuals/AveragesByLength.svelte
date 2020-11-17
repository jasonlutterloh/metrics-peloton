<script>
  import {averagesByLength} from "../store/store.js";
</script>

<style>
  h2 {
    margin-top: 20px;
    font-size: 24px;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    flex: 1 1 auto;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    text-shadow: 0 0 1px #222;
  }
</style>

<h2>Averages By Ride Length</h2>
<ul>
  {#each $averagesByLength as average}
    <li style="background-color:{average.color}">
      <span class="sr-only">{average.duration} Min Average:</span>
      {average.value}
    </li>
  {/each}
</ul>
