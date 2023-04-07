import axios from 'axios';
// import type { AxiosResponse } from 'axios';
import { TOKEN_KEY, getValue } from '@/shared/db';

export type ResponseResultType<T = unknown> = {
  data: T,
  message: string,
  success: boolean,
  showMessage: number
}

const instance = axios.create({
	baseURL: __SERVER__,
	timeout: 60000
});

const controller = new AbortController();

instance.interceptors.request.use(config => {
	const token = getValue(TOKEN_KEY);

	if (token) {
		config.headers.setAuthorization(token);
	}

	return {
		...config,
		signal: controller.signal
	};
});

instance.interceptors.response.use(res => {



	return res;
});

// const statusMap = new Map<number, (res: AxiosResponse<ResponseResultType>) => AxiosResponse<ResponseResultType>>();

// statusMap
//   .set(200, res => {
//     const { data } = res;

//     if (data.showMessage === 1) {
//       ElMessage({
//         message: data.message
//       });
//     }

//     return res;
//   })

export default instance;