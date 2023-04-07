<template>
  <el-menu class="aside-menu" router :default-active="route.path">
    <aside-menu-tree :tree="menuStore.menuTree"></aside-menu-tree>
  </el-menu>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores';

const menuStore = useMenuStore();
const route = useRoute();

</script>

<style scoped lang="scss">
.aside-menu {
	height: calc(100vh - 60px)
}
</style>