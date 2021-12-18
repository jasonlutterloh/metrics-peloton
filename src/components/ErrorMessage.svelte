<script>
  import { slide } from 'svelte/transition';
</script>
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

<p transition:slide>
  <slot />
</p>
