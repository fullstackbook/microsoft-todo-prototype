import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
  DATABASE_URL: process.env.DATABASE_URL!,
};

export default config;
