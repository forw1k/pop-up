<template>
  <form
    novalidate="true"
    class="flex flex-col p-5 m-auto bg-white rounded-lg mobile:w-11/12"
  >
    <h2 class="mobile:mb-9 tablet:mb-7 mb-1.5 text-2xl font-medium">
      Заказать звонок
    </h2>
    <div class="flex flex-col relative">
      <div
        class="flex mobile:flex-col tablet:flex-wrap tablet:flex-row tablet:justify-between"
      >
        <div class="flex flex-col mobile:mb-5 tablet:w-31-5-p">
          <label class="mb-1 font-medium">Имя *</label>
          <input
            :value="name"
            @input="setName"
            type="text"
            placeholder="Иван Иванов"
            class="form-control block md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div class="flex flex-col mobile:mb-5 tablet:w-31-5-p">
          <label class="mb-1 font-medium">Телефон *</label>
          <input
            :value="phone"
            @input="setPhone"
            type="tel"
            placeholder="+7(___) ___-__-__"
            v-mask="'+7(###) ###-##-##'"
            class="form-control block md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        <div class="flex flex-col mobile:mb-5 tablet:w-31-5-p">
          <label class="mb-1 font-medium">Email *</label>
          <input
            :value="email"
            @input="setEmail"
            type="email"
            placeholder="you@example.com"
            class="form-control block md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div class="flex flex-col mobile:mb-5 tablet:w-66-p tablet:mb-0">
          <label class="mb-1 font-medium">Город *</label>
          <select
            @change="setOption"
            class="form-control block md:w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option
              v-for="option in sortedOptions"
              :key="option.id"
              :value="option.id"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
      </div>
      <my-button
        @pushTheButton="submitForm"
        :disabled="!isFormValid"
        type="button"
        class="mobile:w-full tablet:absolute tablet:bottom-0 tablet:right-0 tablet:w-31-5-p bg-green-600 hover:bg-green-700 focus:bg-green-800 active:bg-green-800"
        >Отправить</my-button
      >
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex';
import { validateLength, validateEmail } from '@/utils/validate';
import { preparePhoneNumber } from '@/utils/regExp';
import MyButton from '@/components/MyButton';

export default {
  name: 'my-form',
  components: {
    MyButton,
  },
  computed: {
    ...mapState(['currentOptionId', 'email', 'phone', 'name']),
    ...mapGetters(['sortedOptions']),
    isFormValid() {
      return (
        validateEmail(this.email) && validateLength(this.phone, 12) && this.name
      );
    },
  },
  methods: {
    ...mapActions(['sendData']),
    ...mapMutations([
      'SET_PHONE',
      'SET_NAME',
      'SET_EMAIL',
      'SET_CURRENT_OPTION_ID',
    ]),
    setName(e) {
      const name = e.target.value;
      this.$store.commit('SET_NAME', name);
    },
    setPhone(e) {
      const phone = e.target.value;
      const prepPhone = preparePhoneNumber(phone);
      this.$store.commit('SET_PHONE', prepPhone);
    },
    setEmail(e) {
      const email = e.target.value;
      this.$store.commit('SET_EMAIL', email);
    },
    setOption(e) {
      this.$store.commit('SET_CURRENT_OPTION_ID', e.target.value);
    },
    submitForm() {
      if (this.isFormValid) {
        this.$store.commit('SET_CURRENT_MODAL', 'my-message');
        this.$store.dispatch('sendData');
      }
    },
  },
};
</script>
