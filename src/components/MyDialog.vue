<template>
  <div
    class="dialog bg-gray-500 bg-opacity-75 fixed flex inset-0"
    v-if="show"
    @click.stop="hideDialog"
  >
    <div @click.stop class="m-auto mobile:w-full tablet:w-fit">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('toggleDialog', false);
    },
  },
};
</script>
