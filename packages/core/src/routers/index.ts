import { createRouter, createWebHistory } from 'vue-router';
import { getValue, TOKEN_KEY } from '@/shared/db';
import { whiteList } from '@/shared/permission';
import { RouteRecordRaw } from 'vue-router';
import basicRoutes from './basicRoutes';
import permissionRoutes from './permissionRoutes';

type CutomRouteType = RouteRecordRaw & {
  meta: {
    /**
     * 菜单名称
     */
    menuName?: string;
    /**
     * 权限
     */
    permission?: string;
    /**
     * 是否隐藏菜单
     */
    hide?: boolean;
  };
};

/**
 * 根据权限code跟route进行映射
 */
const permissionRouteMap: Map<string, CutomRouteType> = toMap('permission', permissionRoutes, new Map());

const menuNameMap: Map<string, CutomRouteType> = toMap('menuName', [
	...basicRoutes,
	...permissionRoutes
], new Map());

const router = create();

export {
	basicRoutes,
	permissionRoutes,
	permissionRouteMap,
	menuNameMap,
	create,
	filterRoutes,
	CutomRouteType
};

export default router;

/**
 * 创建路由器
 */
function create() {
	const router = createRouter({
		history: createWebHistory(),
		routes: [...basicRoutes]
	});

	router.beforeEach(async (to, from, next) => {
		const token = getValue(TOKEN_KEY);

		// 白名单路由直接进入
		if (whiteList.includes(to.path)) {
			next();
			return;
		}

		if (!token) {
			next(`/login?redirect=${to.path}`);
			return;
		}

		/**
     * 如果在菜单加载完成前进入页面，会导致首次访问时页面空白
     */
		next();
	});

	return router;
}

function toMap(
	key: string,
	permissionRoutes: CutomRouteType[],
	permissionRouteMap: Map<string, CutomRouteType>
) {
	return !Array.isArray(permissionRoutes)
		? permissionRouteMap
		: permissionRoutes.reduce(
			(map, route) =>
				toMap(
					key,
					route.children as CutomRouteType[],
					route.meta?.[key] ? map.set(route.meta[key] as string, route) : map
				),
			permissionRouteMap
		);
}

function filterRoutes(routes: RouteRecordRaw[], condition: (route: RouteRecordRaw) => boolean) {
	if (!Array.isArray(routes)) return [];

	return routes.filter(route => {
		route.children = filterRoutes(route.children, condition);
		return condition(route);
	});
}