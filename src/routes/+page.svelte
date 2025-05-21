
<script>
    import {user} from "../components/authStore.js";
  import Dashboard from "../components/Dashboard.svelte";
    import Login from "../components/Login.svelte";
    import "../app.css";
</script>

  {#if $user}
  <Dashboard/>
  {:else}
  <Login/>
  {/if}