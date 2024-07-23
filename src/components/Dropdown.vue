<template>
  <Transition name="dropdown">
    <div
      v-if="props.dropdown"
      key="dropdown"
      class="z-[70] fixed right-[3.5rem] top-[4.7rem] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <router-link
            to="/articles"
            class="block sm:hidden px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Beranda</router-link
          >
        </li>
        <li>
          <router-link
            to="/articles/saved"
            class="block sm:hidden px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Saved</router-link
          >
        </li>
      </ul>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps(['dropdown']);
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
}
</style>
<!-- create dropdown simple code -->