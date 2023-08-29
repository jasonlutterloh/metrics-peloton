<script>
  import { slide } from "svelte/transition";
</script>

<p transition:slide>
  <slot />
</p>

<style>
  p {
    background-color: #d1495b;
    color: #fff;
    font-size: 16px;
    padding: 20px;
    margin: 0;
    text-align: center;
  }
</style>
