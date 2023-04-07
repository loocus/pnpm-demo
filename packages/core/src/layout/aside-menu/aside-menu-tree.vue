<template>
  <template v-for="node in tree">
    <el-sub-menu v-if="node.children?.length > 0" :key="node.id" :index="node.name">
      <template #title>
        <span>{{ t(`menu.${node.name}`) }}</span>
      </template>
      <aside-menu-tree :tree="node.children"></aside-menu-tree>
    </el-sub-menu>
    <el-menu-item v-else :key="node.name" :index="menuNameMap.get(node.name)?.path ?? ''">{{ t(`menu.${node.name}`) }}</el-menu-item>
  </template>
</template>

<script setup lang="ts">
import * as menusAPI from '@/apis/menus';
import { menuNameMap } from '@/routers';

const props = defineProps<{
  tree: menusAPI.MenuTreeType[]
}>();

const { tree } = toRefs(props);
const { t } = useI18n();

</script>

<style></style>