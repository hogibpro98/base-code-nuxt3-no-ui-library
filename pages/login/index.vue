<template>
  <div>
    <div class="login-box">
      <form ref="formRef">
        <div name="username">
          <span class="label_custom">{{ $t('lable_email_address') }}</span>
          <input v-model="state.username" size="large" :placeholder="$t('placeholder_email')" />
        </div>
        <div name="password">
          <span class="label_custom">{{ $t('label_password') }}</span>
          <input v-model="state.password" type="password" :placeholder="$t('placeholder_password')" />
        </div>
        <div>
          <button type="submit" @click="handleSubmit">
            {{ $t('login') }}
          </button>
        </div>
      </form>
    </div>
    <Popup v-if="userStore.getIsAuthenticated">
      <span class="content-error">{{ userStore.getMessageError }}</span>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import Popup from '@/components/popup/message.vue';
import { NO_SPACE_PATTERN } from '@/constants/regex';
import { DASHBOARD } from '@/constants/router';
import { LOCAL_STORAGE_EMAIL } from '@/constants/axios';

interface State {
  loading: boolean;
  username: string;
  password: string;
}

definePageMeta({
  middleware: 'is-logged-in'
});
const userStore = useUserStore();
const state = ref<State>({
  loading: false,
  username: '',
  password: ''
});
const handleSubmit = async () => {
  state.value.loading = true;
  try {
    await userStore.login(
        state.value.username,
        NO_SPACE_PATTERN.test(state.value.password) ? state.value.password : 1
    );
  } catch (e: any) {
    state.value.loading = false;
    console.log(e.message);
  }
  state.value.loading = false;
};
onMounted(async () => {
  const email = await localStorage.getItem(LOCAL_STORAGE_EMAIL);
  if (email) {
    const router = useRouter();
    router.push(DASHBOARD);
  } else {
    window.history.pushState(null, 'null', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, 'null', window.location.href);
    };
  }
});
</script>
