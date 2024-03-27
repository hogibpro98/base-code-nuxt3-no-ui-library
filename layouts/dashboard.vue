<template>
  <div class="layout">
    <div class="left-menu">
      <Logo :collapsed="collapsed" />
<!--      <AppDrawer :collapsed="collapsed" :theme="getTheme" />-->
<!--      <user-info v-if="isLoggedIn" />-->
    </div>
    <div class="right-menu">
      <slot />
      <Popup v-if="userStore.getIsAuthenticated">
        <span class="content-error">{{ userStore.getMessageError }}</span>
      </Popup>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import AppDrawer from '~/components/layouts/app-drawer/index.vue';
import UserInfo from '~/components/layouts/user-info/index.vue';
import Logo from '@/components/layouts/logo/index.vue';
import { getKeylocalStorage } from '@/utils/storage';
import { LOCAL_STORAGE_TOKEN } from '@/constants/axios';
import Popup from '~/components/popup/message.vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
// is login
const isLoggedIn = computed(() => getKeylocalStorage(LOCAL_STORAGE_TOKEN, false));
const collapsed = ref<boolean>(false);
// Custom width of the sidebar menu when collapsed and expanded
const getTheme = computed(() => 'dark');
</script>
