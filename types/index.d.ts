
interface Window {
    dataLayer: Record<string, unknown>[];
  }
  
  // Extend NodeJS global types (optional)
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GTM_ID: string;
    }
  }
  