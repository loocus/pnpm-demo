<template>
  <el-config-provider :locale="localeStore.langChunk.ep">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useLocaleStore, useMenuStore, useUserStore } from '@/stores';
// import { isWhiteList } from './shared';

const localeStore = useLocaleStore();
const menuStore = useMenuStore();
const userStore = useUserStore();
const router = useRouter();

localeStore.initLocale();

if (userStore.isLogin) {
	// 如果是动态追加的路由则只能通过 push 或 replace 进行跳转
	menuStore.initMenu().then(() => {
		router.push(location.pathname);
	});
	userStore.initUserInfo();
}

</script>

<style lang="scss" scoped>
span {
  color: fn-getCssVar('color-primary');
}
</style>
