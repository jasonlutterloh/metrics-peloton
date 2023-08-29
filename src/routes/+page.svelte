<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Sidebar from "./options/Sidebar.svelte";
  import MainContent from "./components/MainContent.svelte";
  let isSidebarOpen = false;
</script>

<Header bind:isSidebarOpen />
<Sidebar bind:isSidebarOpen />
<MainContent />
<Footer />
