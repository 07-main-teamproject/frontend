/// <reference types="vite/client" />
import.meta.glob<ImageModule>
interface ImportMeta {
    readonly env: ImportMetaEnv
    readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>
  }
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
  }
