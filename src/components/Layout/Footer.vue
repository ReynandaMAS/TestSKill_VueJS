<template>
    <footer id="footer" class="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-200 border-t border-gray-700 dark:border-gray-600">
      <div class="container mx-auto py-6 px-6 sm:px-14 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        
        <!-- Footer Text -->
        <p class="text-center sm:text-left">
          Created By 
          <a href="https://github.com/reynandamas" class="font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-300" target="_blank">
            Reynanda Mayuda Atil Surya
          </a> 
          &copy; 2024
        </p>
        
        <!-- Social Media Icons -->
        <div class="flex space-x-4">
          <a href="https://github.com/reynandamas" target="_blank" class="transition-transform transform hover:scale-110">
            <Icon icon="codicons:github" class="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/reynandamas" target="_blank" class="transition-transform transform hover:scale-110">
            <Icon icon="bi:linkedin" class="w-6 h-6" />
          </a>
          <a href="https://instagram.com/reynanda_ztq28" target="_blank" class="transition-transform transform hover:scale-110">
            <Icon icon="ri:instagram-fill" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  </template>

<style scoped>
/* Modern Footer Styling */
#footer {
  background-color: #1a202c; /* Darker background */
  color: #e2e8f0; /* Light text color */
}

#footer p {
  font-size: 1rem; /* Font size for text */
}

#footer a {
  color: #fbbf24; /* Orange link color */
  transition: color 0.3s ease; /* Smooth transition for color */
}

#footer a:hover {
  color: #fef3c7; /* Light orange on hover */
}

#footer .social-icons a {
  color: #e2e8f0; /* Light icon color */
  transition: transform 0.3s ease; /* Smooth scale transition */
}

#footer .social-icons a:hover {
  transform: scale(1.1); /* Slight zoom effect on hover */
}
</style>