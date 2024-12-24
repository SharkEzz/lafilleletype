declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      DB_FILE_NAME: string;
    }
  }
}

export {};
