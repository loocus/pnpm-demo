export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    __DEV__: boolean;
    __PROD__: boolean;
  }
}