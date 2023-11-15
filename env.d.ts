declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      BUNDLE_URL: string;
      PAY_MASTER_URL: string;
    }
  }
}

export {}
