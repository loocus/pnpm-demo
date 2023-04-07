import type { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * 无需权限的路由白名单
 */
export const whiteList = ['/login'];

/**
 * 是否是白名单路由
 */
export const isWhiteList = (route: RouteLocationNormalizedLoaded) => whiteList.includes(route.path);

