<script>
  import {averageOutputsByDuration} from "../store/store.js";
</script>

<style>
  div{
    margin-top: 30px;
  }
  h3{
    color: rgb(1, 58, 99);
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    text-align: center;
    margin: 0 0 20px;
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
    font-size: 1.2em;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 3px;
  }

</style>

<div>
<h3>Average Outputs By Ride Length</h3>
<ul>
  {#each $averageOutputsByDuration as average}
    <li style="background-color:{average.color}">
      <span class="sr-only">{average.duration} Minute Average:</span> {average.value}
    </li>
  {/each}
</ul>
</div>
