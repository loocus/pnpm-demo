import layout from '@/layout/layout.vue';
import { CutomRouteType } from '.';

export default [
	{
		path: '/',
		component: layout,
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import(/* webpackChunkName: "home" */ '@/pages/home.vue'),
				meta: {
					menuName: 'home',
					permission: 'home'
				}
			},
			{
				path: '/menus',
				name: 'menuManager',
				component: () =>
					import(/* webpackChunkName: "menus" */ '@/pages/system/menus.vue'),
				meta: {
					menuName: 'menuManager',
					permission: 'menuManager'
				}
			},
			{
				path: '/users',
				name: 'userManager',
				component: () => import(/* webpackChunkName: "users" */ '@/pages/user/user-list.vue'),
				meta: {
					menuName: 'userManager',
					permission: 'userManager'
				}
			}
		]
	}
] as CutomRouteType[];