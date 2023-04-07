import * as menusAPI from '@/apis/menus';
import router, {
	permissionRoutes,
	permissionRouteMap,
	filterRoutes
} from '@/routers';

export default defineStore('menu', () => {
	const menus = ref<menusAPI.MenuType[]>([]);
	const activeMenu = ref<menusAPI.MenuTreeType>(null);
	const menuNameMap = ref<Map<string, menusAPI.MenuTreeType>>(new Map());
	const menuTree = computed(() => toMenuTree(menus.value));
	const crumbs = computed<{ name?: string; path?: string }[]>(() => {
		return [];
	});
	const menuPermissions = ref<string[]>([]);

	const initMenu = async () => {
		const { data: res } = await menusAPI.findAll();
		if (res.success) {
			menus.value = res.data;
			menuPermissions.value = menus.value.map(menu => menu.permissionCode);
			menuNameMap.value = menus.value.reduce(
				(map, menu) => map.set(menu.name, menu),
				new Map<string, menusAPI.MenuType>()
			);
			filterRoutes(permissionRoutes, route => {
				return (
					permissionRouteMap.has(route.meta?.permission as string) ||
          route.path === '/'
				);
			}).forEach(route => {
				router.addRoute(route);
			});
		}
	};

	return {
		menus,
		activeMenu,
		menuTree,
		crumbs,
		menuNameMap,
		initMenu
	};
});

/**
 * 将扁平化列表转为树形
 * @param list
 */
function toMenuTree(list: menusAPI.MenuType[]) {
	const groupMap = list
	// 根据 parentId 对数据进行分组
		.reduce((groupMap, current) => {
			const menus = groupMap.get(current.parentId);

			if (!Array.isArray(menus)) {
				groupMap.set(current.parentId, [current]);
			} else {
				menus.push(current);
			}

			return groupMap;
		}, new Map<menusAPI.MenuTreeType['parentId'], menusAPI.MenuTreeType[]>());

	groupMap.forEach(menus => {
		menus
		// 对分组中的顺序进行排序
			.sort((a, b) => {
				return (a.sort ?? 0) - (b.sort ?? 0);
			})
		// 关联父子级
			.forEach(menu => {
				// 根据当前数据的 id 去拿子节点并关联
				const children = groupMap.get(menu.id);
				menu.children = children ?? [];
				menu.children.forEach(child => {
					child.parentNode = menu;
				});
			});
	});
	// 当 parentId 为 null 时是顶层节点
	return groupMap.get(null) ?? [];
}

// function _printErr(menu: menusAPI.MenuType, route: CutomRouteType) {
// 	// 如果 menu.route 引用存在，证明有多个 route 被绑至一个 menu 上（这个行为是错误的，一个菜单应该对应一个路由）
// 	if (menu.route)
// 		console.error(
// 			`【Duplicate menu route binding error => ${route.path}】: menu.name [${menu.name}] is bound to route.path [${menu.route.path}]`
// 		);
// }
