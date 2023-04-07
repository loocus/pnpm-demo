import { LANG_KEY, setValue } from '@/shared/db';
import { default as i18n, loadLocale, SupportLangType, LangChunkType, DEFAULT_LANG } from '@/locales';

export default defineStore('locale', () => {
	const lang = ref<SupportLangType>(DEFAULT_LANG);
	const langChunk = ref<LangChunkType>({ ep: null, i18n: null });
	const langList = computed(() => {
		return [
			{
				name: '中文',
				value: 'zh-cn'
			},
			{
				name: 'English',
				value: 'en'
			}
		].filter(l => l.value != lang.value) as { name: string, value: SupportLangType }[];
	});

	/**
	 * 初始化语言
	 * @param val
	 */
	const initLocale = async (val?: SupportLangType) => {
		lang.value = val ?? DEFAULT_LANG;
		// 加载并语言包
		langChunk.value = await loadLocale(lang.value);
		// 设置全局语言类型
		i18n.global.locale.value = lang.value;
		// 设置语言包
		i18n.global.setLocaleMessage(lang.value, langChunk.value.i18n);
		document.querySelector('html').setAttribute('lang', lang.value);
		// 设置本地存储
		setValue(LANG_KEY, lang.value);
	};

	return {
		lang,
		langChunk,
		langList,
		loadLocale,
		initLocale
	};
});


