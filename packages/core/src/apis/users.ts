import request, { ResponseResultType } from '@/shared/request';
const baseURL = '/api/users';

type UserType = {
	id?: number;
	name?: string;
	gender?: string;
	age?: number;
	phone?: string;
}

/**
 * 登录
 * @param data
 */
export const login = (data: {
  username: string,
  password: string
}) => {
	return request<ResponseResultType<string>>({
		method: 'post',
		url: '/api/login',
		data
	});
};

/**
 * 获取当前登录的用户信息
 */
export const getCurrentUser = () => {
	return request<ResponseResultType>(`${baseURL}/current-user`);
};

export const findAll = (params?) => {
	return request<ResponseResultType<UserType[]>>({
		url: baseURL,
		params
	});
};