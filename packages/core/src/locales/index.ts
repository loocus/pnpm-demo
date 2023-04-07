import { createI18n } from 'vue-i18n';
import { Language } from 'element-plus/es/locale';
import { LANG_KEY, getValue } from '@/shared/db';

export type SupportLangType = 'zh-cn' | 'en';

export type LangChunkType = { ep: Language; i18n: RecordType };

export const SUPPORT_LANGUAGES: SupportLangType[] = ['zh-cn', 'en'];

const langMemo = getValue(LANG_KEY) as SupportLangType;

export const DEFAULT_LANG = SUPPORT_LANGUAGES.includes(
	langMemo
)
	? langMemo
	: 'zh-cn';

/**
 * locale 动态加载器
 */
const localeLoader = () => {
	const chunkMap = new Map<SupportLangType, LangChunkType>();

	/**
   * 动态加载方法
   */
	return async (lang: SupportLangType) => {
		/**
     * 以下代码形式是为了更好的对语言进行分包
     */
		if (!chunkMap.get(lang)) {
			let chunk: LangChunkType;

			if (lang === 'zh-cn') {
				chunk = {
					ep: (
						await import(
							/* webpackChunkName: "lang_zh-cn" */ 'element-plus/dist/locale/zh-cn.mjs'
						)
					).default,
					i18n: (
						await import(/* webpackChunkName: "lang_zh-cn" */ './zh-cn/index')
					).default
				};
			} else {
				chunk = {
					ep: (
						await import(
							/* webpackChunkName: "lang_en" */ 'element-plus/dist/locale/en.mjs'
						)
					).default,
					i18n: (
						await import(/* webpackChunkName: "lang_en" */ './en/index')
					).default
				};
			}
			chunkMap.set(lang, chunk);
		}

		return chunkMap.get(lang);
	};
};

export const loadLocale = localeLoader();

export default createI18n({
	// 使用新版 api
	legacy: false,
	locale: DEFAULT_LANG
});