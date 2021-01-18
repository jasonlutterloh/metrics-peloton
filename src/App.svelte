<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Sidebar from "./options/Sidebar.svelte";
	import MainContent from "./components/MainContent.svelte";

	let open = false;
</script>

<Header bind:sidebar = {open}/>
<Sidebar bind:open />
<MainContent />
<Footer />