
export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly __DEV__: boolean;
    readonly __PROD__: boolean;
  }
}