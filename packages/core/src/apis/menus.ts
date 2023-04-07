import request, { ResponseResultType } from '@/shared/request';
const baseURL = '/api/menus';

export type MenuType = {
  id?: number;
  parentId?: number;
  name?: string;
	permissionCode?: string;
  sort?: number;
};

export type MenuTreeType = MenuType & {
  parentNode?: MenuTreeType;
  children?: MenuTreeType[];
}

export const findAll = (params?: Omit<MenuType, 'children'>)  => {
	return request<ResponseResultType<MenuType[]>>(baseURL, {
		params
	});
};