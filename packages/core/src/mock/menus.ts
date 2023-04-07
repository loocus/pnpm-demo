import { mock } from 'mockjs';
import { ResponseResultType } from '@/shared/request';
import { MenuType } from '@/apis/menus';

export default () => {
	mock('/api/menus', 'get', (): ResponseResultType<MenuType[]> => {
		return {
			data: [
				{
					id: 2,
					parentId: null,
					name: 'system',
					permissionCode: 'system',
					sort: 2
				},
				{
					id: 1,
					parentId: 2,
					name: 'menuManager',
					permissionCode: 'menuManager',
					sort: 1
				},
				{
					id: 3,
					parentId: null,
					name: 'home',
					permissionCode: 'home',
					sort: 1
				},
				{
					id: 4,
					parentId: 2,
					name: 'login',
					permissionCode: 'login',
					sort: 0
				},
				{
					id: 5,
					parentId: null,
					name: 'listPage',
					permissionCode: 'listPage',
					sort: 3
				},
				{
					id: 6,
					parentId: 5,
					name: 'userManager',
					permissionCode: 'userManager',
					sort: 0
				}
			],
			success: true,
			message: 'ok',
			showMessage: 1
		};
	});
};
