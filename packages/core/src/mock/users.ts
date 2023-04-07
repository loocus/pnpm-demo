import { mock } from 'mockjs';

export default () => {
	mock('/api/login', 'post', (options) => {
		const data = JSON.parse(options.body);

		if (data.username === 'admin' && data.password === '123456') {
			return {
				data: 'token-admin',
				success: true,
				message: '登录成功',
				showMessage: 1
			};
		} else if(data.username === 'user' && data.password === '123456') {
			return {
				data: 'token-user',
				success: true,
				message: '登录成功',
				showMessage: 1
			};
		} else {
			return {
				data: null,
				success: false,
				message: '用户名或密码错误',
				showMessage: 1
			};
		}
	});

	mock('/api/users', 'get', () => {
		return {
			data: [
				{
					date: '2016-05-03',
					name: 'Tom',
					address: 'No. 189, Grove St, Los Angeles'
				},
				{
					date: '2016-05-02',
					name: 'Tom',
					address: 'No. 189, Grove St, Los Angeles'
				},
				{
					date: '2016-05-04',
					name: 'Tom',
					address: 'No. 189, Grove St, Los Angeles'
				},
				{
					date: '2016-05-01',
					name: 'Tom',
					address: 'No. 189, Grove St, Los Angeles'
				}
			],
			success: true,
			message: 'ok',
			showMessage: 1
		};
	});
};