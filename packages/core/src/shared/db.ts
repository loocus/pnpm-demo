
export type keyType = 'token' | 'userInfo' | 'lang' | 'account';

/**
 * token
 */
export const TOKEN_KEY: keyType = 'token';

export const USER_INFO_KEY: keyType = 'userInfo';

export const LANG_KEY: keyType = 'lang';

export const ACCOUNT_KEY: keyType = 'account';


/**
 * 默认 storage，可以快速将整个应用切换到 localStorage | sessionStorage | 或者是自定义的数据结构
 */
const defaultStorage = localStorage;

export const getValue = (key: keyType) => defaultStorage.getItem(key);

export const setValue = (key: keyType, value: string) => defaultStorage.setItem(key, value);

export const delValue = (key: keyType) => defaultStorage.removeItem(key);

export const delAll = () => defaultStorage.clear();