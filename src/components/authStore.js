import { browser } from "$app/environment"; // SvelteKit helper
import { writable } from "svelte/store";

// Safely parse user from localStorage (only in browser)
const storedUser = browser
  ? (() => {
      try {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
      } catch (err) {
        console.error("Error parsing stored user:", err);
        return null;
      }
    })()
  : null;

export const user = writable(storedUser);

let storageWritePending = false;
user.subscribe((value) => {
  if (!browser) return; // Only write to localStorage in browser
  if (storageWritePending) return;

  storageWritePending = true;
  requestAnimationFrame(() => {
    try {
      localStorage.setItem("user", JSON.stringify(value));
    } catch (err) {
      console.error("Error saving user to localStorage:", err);
    }
    storageWritePending = false;
  });
});

export function logout() {
  if (browser) {
    try {
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Error removing user from localStorage:", err);
    }
  }
  user.set(null);
}
