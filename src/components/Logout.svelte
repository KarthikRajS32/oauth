<script>
    import { logout } from './authStore.js';
    import { goto } from '$app/navigation'; // SvelteKit's navigation
  
    // Perform logout on mount
    import { onMount } from 'svelte';
    onMount(() => {
      logout();
      goto('/login'); // Redirect to login page
    });
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96 text-center">
      <h1 class="text-2xl font-bold mb-4">Logging out...</h1>
      <p class="text-gray-600">You're being signed out!</p>
    </div>
  </div>