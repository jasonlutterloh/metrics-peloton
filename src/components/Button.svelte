<script>
export let clickHandler;
export let title;
</script>

<button type="button" on:click={clickHandler}>{title}</button>

<style>

button {
    background-color: rgba(71, 106, 111, .1);
    border: .5px solid rgba(71, 106, 111, .6);
    padding: 10px;
    transition: .5s background;
}
button:hover,
button:focus {
    background-color: rgba(71, 106, 111, .3);
    outline: 0;
}
button:active {
    background-color: rgba(71, 106, 111, .5);
}
</style>