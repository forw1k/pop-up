<template>
  <div class="bg-white m-auto rounded-lg mobile:w-11/12 tablet:w-fit p-4">
    <div
      v-if="requestData"
      v-html="requestData"
      class="flex items-center justify-center min-h-100px"
    ></div>
    <div
      v-if="requestError"
      v-html="requestError"
      class="flex items-center justify-center min-h-100px"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'my-message',
  computed: {
    ...mapState(['requestData', 'requestError']),
  },
};
</script>
