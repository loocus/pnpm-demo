import { createApp } from 'vue';
import router from '@/routers/index';
import App from './App.vue';
import { createPinia } from 'pinia';
import i18n from '@/locales';
import '@/scss/index.scss';

(async () => {
	if (__MOCK__) {
		const mock = await import('@/mock');
		mock.default();
	}

	const app = createApp(App);
	app.config.globalProperties.__DEV__ = __DEV__;
	app.config.globalProperties.__PROD__ = __PROD__;
	app
		.use(router)
		.use(i18n)
		.use(createPinia())
		.mount('#app');
})();