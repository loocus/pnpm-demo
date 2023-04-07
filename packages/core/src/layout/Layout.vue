<template>
  <el-container>
    <el-header class="custom-header">
      <div class="icon-container">
        <img src="https://element-plus.gitee.io/images/element-plus-logo.svg" />
      </div>
      <el-dropdown @command="onChangeLanguage">
        <el-link :underline="false">
          <el-icon :size="25"
            ><i-mdi-spoken-language></i-mdi-spoken-language
          ></el-icon>
        </el-link>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="lang in localeStore.langList"
              :key="lang.name"
              :command="lang.value"
              >{{ lang.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container class="auto-container">
      <el-aside width="220px">
        <el-scrollbar height="100%">
          <aside-menu></aside-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <el-breadcrumb style="padding-bottom: 20px" separator="/">
            <el-breadcrumb-item
              v-for="curumb in menuStore.crumbs"
              :key="curumb.name"
              ><el-link :underline="false">{{
                t(`menu.${curumb.name}`)
              }}</el-link></el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view v-slot="{ Component }">
            <keep-alive>
            
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { SupportLangType } from '@/locales';
import { useLocaleStore, useMenuStore } from '@/stores';

const { t } = useI18n();
const localeStore = useLocaleStore();
const menuStore = useMenuStore();

const onChangeLanguage = async (cmd: SupportLangType) => {
	localeStore.initLocale(cmd);
};
</script>

<style scoped lang="scss">
.custom-header {
  border-bottom: fn-getCssVar('border');
  display: flex;
  justify-content: space-between;

  .icon-container {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 120px;
    }
  }
}

.auto-container {
  height: calc(100vh - 60px);
}

.menu-container {
  width: 220px;
}
</style>
