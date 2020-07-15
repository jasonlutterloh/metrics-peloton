<script>
export let ride;
</script>

{#if ride}
<div class="card" style="background-image: url({ride.image});">
    <h3>{ride.title}</h3>
    <p>{ride.output}<p></p>
</div>
{/if}

<style>
    h3{
        font-weight: 300;
        position: absolute;
        right: 20px;
        font-size: 18px;
        bottom: 70px;
        text-shadow: 1px 1px 2px black;
    }
    .card{
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 300px;
        color: white;
        max-width: 50%;
        background-position: center;
        position: relative;
        padding: 0;
        box-sizing: border-box;
        flex: 0 1 calc(50% - 20px);
    }
    p {
        position: absolute;
        bottom: 20px;
        right: 20px;
        text-shadow: 0 0 10px black;
        font-size: 60px;
        line-height: 60px;
        padding: 0;
        font-weight: 600;
        margin: 0;
    }
</style>