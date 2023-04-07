<template>
  <div class="login-page">
    <div class="container">
      <div class="login-container">
        <span class="login-title">{{ t('loginPage.login') }}</span>
        <span class="hello-message">{{ t('loginPage.helloMessage') }}</span>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
          class="login-form"
          :label-position="'top'"
          size="large"
        >
          <el-form-item prop="username" :label="t('loginPage.username')">
            <el-input
              v-model="formData.username"
              :placeholder="t('loginPage.pleaseInputAUsername')"
            />
          </el-form-item>
          <el-form-item prop="password" :label="t('loginPage.password')">
            <el-input
              v-model="formData.password"
              type="password"
              :placeholder="t('loginPage.pleaseInputAPassword')"
            />
          </el-form-item>
          <el-form-item>
            <p
              style="width: 100%; display: flex; justify-content: space-between"
            >
              <el-checkbox
                v-model="check"
                size="large"
                :label="t('loginPage.rememberPassword')"
              />
              <el-link :underline="false">{{
                t('loginPage.forgotPassword')
              }}</el-link>
            </p>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              size="large"
              type="primary"
              @click="onLogin"
              >{{ t('loginPage.login') }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <p style="width: 100%; display: flex; justify-content: center">
              <el-space spacer="|">
                <el-link
                  v-for="lang in localeStore.langList"
                  :key="lang.value"
                  :underline="false"
                  @click="() => onChangeLang(lang)"
                  >{{ lang.name }}</el-link
                >
              </el-space>
            </p>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { useLocaleStore, useUserStore } from '@/stores';
import { SupportLangType } from '@/locales';
import { ACCOUNT_KEY, delValue, getValue, setValue } from '@/shared/db';

const { t } = useI18n();
const localeStore = useLocaleStore();
const formRef = ref<FormInstance>();
const formData = reactive<{
  username: string;
  password: string;
}>({
	username: '',
	password: ''
});
const rules = reactive<FormRules>({
	username: [
		{
			required: true,
			message: '用户名不能为空'
		}
	],
	password: [
		{
			required: true,
			message: '密码不能为空'
		}
	]
});
const check = ref(true);
const userStore = useUserStore();

const onLogin = async () => {
	try {
		await formRef.value.validate();
		if (check.value) {
			// 勾选记住密码后存储账户信息
			setValue(ACCOUNT_KEY, JSON.stringify(formData));
			// 登录
			userStore.login(formData);
		} else {
			delValue(ACCOUNT_KEY);
		}
	} catch(e) {
		if (__DEV__) console.error(e);
	}
};

const onChangeLang = (lang: { name: string, value: SupportLangType }) => {
	localeStore.initLocale(lang.value);
};

onMounted(() => {
	const value = getValue(ACCOUNT_KEY);
	try {
		const account: { username: string; password: string } = value ? JSON.parse(value) : null;
		formData.username = account.username;
		formData.password = account.password;
	} catch (e) {
		// if (__DEV__) console.error(e);
	}
});
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  background-image: url(../asset/images/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 450px;
    height: 600px;
    background-color: white;
    border-radius: fn-getCssVar('border-radius-round');
    padding: 25px;

    .login-container {
      display: flex;
      flex-direction: column;

      .login-title {
        color: fn-getCssVar('text-color-primary:');
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 25px;
      }

      .hello-message {
        color: fn-getCssVar('text-color-secondary');
        font-size: 13px;
      }

      .login-form {
        margin-top: 75px;
      }
    }
  }
}
.div {
  width: 100px;
  height: 100px;
}
</style>
