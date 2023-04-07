export * from './permission';

/**
 * 状态记录器
 */
export class StateRecorder {
	private promise: Promise<boolean>;
	private _resolve: (value: boolean) => void;
	private _reject: (reason: boolean) => void;

	private constructor() {
		this.promise = new Promise((resolve, reject) => {
			this._resolve = resolve,
			this._reject = reject;
		});
	}

	isReady() {
		return this.promise;
	}

	resolve() {
		this._resolve(true);
	}

	reject() {
		this._reject(false);
	}

	static create() {
		return new StateRecorder();
	}
}