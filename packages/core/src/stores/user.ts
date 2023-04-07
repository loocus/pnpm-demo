import { TOKEN_KEY, getValue, setValue } from '@/shared/db';
import * as usersApi from '@/apis/users';
import { useMenuStore } from '.';

export default defineStore('user', () => {
	const token = ref<string>(getValue(TOKEN_KEY));
	const userInfo = ref<RecordType>(null);
	const isLogin = computed(() => !!token.value);
	const menuStore = useMenuStore();
	const router = useRouter();
	const route = useRoute();

	const initUserInfo = async () => {
		const { data: res } = await usersApi.getCurrentUser();

		if (res.success) {
			userInfo.value = res.data;
		}
	};

	const login = async (formData: {
		username: string;
		password: string;
	}) => {
		// 获取 token
		const { data: res } = await usersApi.login(formData);

		if (res.success) {
			ElMessage({
				type: 'success',
				message: res.message
			});
			token.value = res.data;
			// 重新设置本地 token
			setValue(TOKEN_KEY, token.value);
			// 初始化用户信息
			initUserInfo();
			// 初始化用户菜单
			menuStore.initMenu().then(() => {
				// 跳转页面
				router.push({
					path: route.query.redirect as string ?? '/home'
				});
			});
		} else {
			ElMessage({
				type: 'error',
				message: res.message
			});
		}
	};

	return {
		token,
		userInfo,
		isLogin,
		initUserInfo,
		login
	};
});