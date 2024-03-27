<template>
  <li :key="item?.name">
    <img :src="item?.icon" :alt="$t(item?.name)" />
    <span>{{ $t(item?.name) }}</span>
  </li>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'MenuItemContent'
});

defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});
</script>
