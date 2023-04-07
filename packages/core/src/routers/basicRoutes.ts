import { CutomRouteType } from '.';

export default [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '@/pages/login.vue'),
		meta: {
			menuName: 'login'
			// permission: 'login'
		}
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import(/* webpackChunkName: "404" */'@/pages/404.vue')
	}
	// {
	// 	path: '/:catchAll(.*)',
	// 	redirect: '/404'
	// }
] as CutomRouteType[];
