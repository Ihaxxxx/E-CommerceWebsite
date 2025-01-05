// Select necessary DOM elements using attribute selectors
const sidebarBackdrop = document.querySelector('[class~="bg-gray-900/80"]');
const sidebar = document.querySelector('[class~="relative z-50"]');
const openSidebarButton = document.querySelector('#openSidebarButton'); // Replace with your button ID or class
const closeSidebarButton = document.querySelector('.absolute.left-full button');

// Function to open the sidebar
function openSidebar() {
  sidebar.classList.remove('hidden');
  sidebarBackdrop.classList.remove('opacity-0');
  sidebarBackdrop.classList.add('opacity-100');
  sidebar.querySelector('[class~="fixed inset-0 flex"]').classList.remove('-translate-x-full');
  sidebar.querySelector('[class~="fixed inset-0 flex"]').classList.add('translate-x-0');
}

// Function to close the sidebar
function closeSidebar() {
  sidebar.querySelector('[class~="fixed inset-0 flex"]').classList.add('-translate-x-full');
  sidebar.querySelector('[class~="fixed inset-0 flex"]').classList.remove('translate-x-0');
  sidebarBackdrop.classList.add('opacity-0');
  sidebarBackdrop.classList.remove('opacity-100');

  // Add a delay to hide the sidebar after the animation
  setTimeout(() => {
    sidebar.classList.add('hidden');
  }, 300); // Match the CSS transition duration
}

// Add event listeners
openSidebarButton.addEventListener('click', openSidebar);
closeSidebarButton.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);
