  <script>
    import { onMount } from 'svelte';
    import { user } from './authStore.js';
    let googleDiv = null;
  
    onMount(() => {
      if ($user) return; // Skip if already logged in
  
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
  
          window.google.accounts.id.initialize({
            client_id: '1070255023214-gc25jf1quuc0bgu7vut9e2g4nghlhtbs.apps.googleusercontent.com',
            callback: handleCredentialResponse
          });
  
          window.google.accounts.id.renderButton(googleDiv, {
            theme: 'outline',
            size: 'large',
            width: 100 ,
            
          });
  
          window.google.accounts.id.prompt(); // optional: shows One Tap UI
        }
      }, 100);
  
      return () => clearInterval(interval); // Clean up
    });
  
    function handleCredentialResponse(response) {
      try {
        const token = response.credential;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
  
        user.set({
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          phoneNumber: payload.phoneNumber || '',
        });
  
        window.location.href = '/dashboard'; // redirect after login
      } catch (err) {
        console.error('Login error:', err);
      }
    }
  </script>
  
  <div class="h-screen flex items-center justify-center text-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96 text-center">
      <h1 class="text-2xl font-bold mb-6">Welcome to Back my page !</h1>
      <div bind:this={googleDiv} class="flex justify-center w-[180px] mx-auto"></div>
    </div>
  </div>