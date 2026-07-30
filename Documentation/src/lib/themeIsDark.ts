import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'theme-preference';

function getInitialTheme() {
  if (!browser) {
    return true;
  }

  const storedPreference = window.localStorage.getItem(STORAGE_KEY);
  if (storedPreference === 'dark') {
    return true;
  }
  if (storedPreference === 'light') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const themeIsDark = writable(getInitialTheme());

if (browser) {
  themeIsDark.subscribe((value) => {
    window.localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
  });
}
