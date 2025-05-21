<script>
    import { onMount } from 'svelte';
    import { user, logout } from './authStore.js';
    import { goto } from '$app/navigation';
  import "../app.css"
    let isSidebarOpen = false;
  
    // Check login
    onMount(() => {
      if (!$user) goto('/');
    });
  
    function toggleSidebar() {
      isSidebarOpen = !isSidebarOpen;
    }
  
    function handleLogout() {
      logout();
      goto('/');
    }
  
    // Phone number edit state
    let isEditingPhone = true;
    let phoneInput = $user?.phoneNumber || '';
  
    function startEditPhone() {
      phoneInput = $user?.phoneNumber || '';
      isEditingPhone = true;
    }
  
    function savePhone() {
      user.update(u => ({ ...u, phoneNumber: phoneInput }));
      isEditingPhone = false;
    }
  </script>
  
  <!-- Hamburger button -->
  {#if $user}
    <button
      on:click={toggleSidebar}
      class="fixed top-4 left-4 cursor-pointer z-50 bg-blue-600 text-white p-2 rounded-md shadow-md focus:outline-none"
    >
      <!-- Hamburger icon -->
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  {/if}
  
  <!-- Sidebar -->
  {#if $user}
    <div
      class={`fixed top-0 left-0 h-full w-80  bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div class="p-6 h-full">
        <h1 class="text-2xl font-bold mb-4 pl-20">Profile</h1>
        <div class="flex flex-col items-center mb-4 gap-8">
          <img src={$user.picture} alt="Profile" class="w-20 h-20 rounded-full mr-4" />
          <div>
            <h2 class="text-lg font-bold">UserName : {$user.name}</h2>
            <p class="text-lg font-bold">Email: {$user.email}</p>
          </div>
        </div>
  
        <!-- Phone number -->
        <div class="mb-4">
          {#if isEditingPhone}
            <div class="flex items-center gap-2">
              <input
                type="number"
                bind:value={phoneInput}
                class="border px-2 py-1 rounded w-full text-lg"
                placeholder="Enter phone number"
              />
              <button on:click={savePhone} class="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
            </div>
          {:else}
            <div class="flex items-center gap-4">
              <span class="text-lg font-bold">PhoneNo : {phoneInput || 'Not provided'}</span>
              <button on:click={startEditPhone} class="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Edit</button>
            </div>
          {/if}
        </div>
  
        <button
          on:click={handleLogout}
          class="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  {/if}
  
  <!-- Main content background -->
  {#if isSidebarOpen}
    <div
      class="fixed inset-0 bg-black bg-opacity-40 z-30"
      on:click={toggleSidebar}
    ></div>
  {/if}
  