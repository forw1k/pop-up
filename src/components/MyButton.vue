<template>
  <button
    @click="$emit('pushTheButton')"
    class="btn text-white text-base px-2 py-2 rounded-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
};
</script>
