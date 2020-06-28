<script>
    let pelotonUserId;
</script>

<h1>Getting Your Peloton Data</h1>
<p>I know this isn't ideal. Working on an easier way.</p>
<ol>
    <li>
        <a target="_blank" href="https://members.onepeloton.com/preferences">Click here to visit your Peloton profile</a>
        <p>(Login if you aren't already)</p>
    </li>
    <li>Find the field labeled "USER ID" (It will be a long string of random characters) and copy/paste the value here: 
        <form>
            <input type="text" bind:value={pelotonUserId} />
        </form>
    </li>
    <li>Once you've pasted your User ID, <a href="https://api.onepeloton.com/api/user/{pelotonUserId}/workouts?joins=ride&limit=100&page=0" target="_blank">click this link to load your Peloton data in a new tab</a>
    </li>
    <li>You don't have to know what all this text means, just select it all, copy it, return here, and paste the data in the form below.</li>
    <li>Click "Update"!</li>
</ol>

<style>
    input {
        display: block;
    }
    p {
        display: inline-block;
        font-style: italic;
        margin: 0;
    }
</style>