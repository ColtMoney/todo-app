import Alpine from 'alpinejs';
import useLists from './viewmodels/useLists.ts';
import useList from './viewmodels/useList.ts';

// Make Alpine globally available
window.Alpine = Alpine;

// Register Alpine data components
document.addEventListener('alpine:init', () => {
  Alpine.data('listManager', () => useLists());

  Alpine.data('list', () => useList());
});

// Start Alpine.js
Alpine.start();
