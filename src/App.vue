<template>
  <div id="app" class="p-4 box-border">
    <div>
      <my-button
        class="mobile:w-full tablet:w-fit mobile:mb-4 tablet:mb-0 bg-blue-500 tablet:mr-4 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-800"
        @click.native="toggleDialog(), setDefaultOption(1)"
        >Заказать в Москву</my-button
      >
      <my-button
        class="mobile:w-full tablet:w-fit bg-teal-600 hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-800"
        @click.native="toggleDialog(), setDefaultOption(2)"
        >Заказать в Санкт-Петербург</my-button
      >
    </div>
    <my-dialog @toggleDialog="toggleDialog" :show="dialogVisible">
      <component :is="currentModal"></component>
    </my-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import MyButton from './components/MyButton.vue';
import MyDialog from './components/MyDialog.vue';
import MyForm from './components/MyForm.vue';
import MyMessage from './components/MyMessage.vue';

export default {
  name: 'App',
  components: {
    MyButton,
    MyForm,
    MyDialog,
    MyMessage,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState([
      'options',
      'requestData',
      'currentModal',
      'requestData',
      'requestError',
    ]),
    ...mapGetters(['sortedOptions']),
  },
  methods: {
    ...mapMutations(['SET_CURRENT_OPTION_ID', 'SET_REQUEST_DATA']),
    toggleDialog() {
      this.dialogVisible = !this.dialogVisible;
      this.$store.commit('SET_CURRENT_OPTION_ID', null);
      this.$store.commit('SET_REQUEST_DATA', '');
      this.$store.commit('SET_REQUEST_ERROR', '');
      this.$store.commit('SET_CURRENT_MODAL', 'my-form');
    },
    setDefaultOption(id) {
      const defaultOption = this.options.filter((item) => item['id'] === id);
      this.$store.commit('SET_CURRENT_OPTION_ID', defaultOption[0].id);
    },
  },
};
</script>
