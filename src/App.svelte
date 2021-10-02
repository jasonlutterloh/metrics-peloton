<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Sidebar from "./options/Sidebar.svelte";
	import MainContent from "./components/MainContent.svelte";
	import {onMount} from "svelte";
	import {firebaseConfig} from "./firebase.config";
	import {initializeApp} from "firebase/app";
	import {getAnalytics} from "firebase/analytics";
	
	onMount(async () => {
	  if (firebaseConfig?.projectId) {
	    const app = initializeApp(firebaseConfig);
	    getAnalytics(app);
	  }
	});
	let isSidebarOpen = false;
</script>

<Header bind:isSidebarOpen />
<Sidebar bind:isSidebarOpen />
<MainContent />
<Footer />