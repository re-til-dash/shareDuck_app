/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_KEY: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
