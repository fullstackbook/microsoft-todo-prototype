import Database from "better-sqlite3";
import config from "./config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/lib/schema";

const sqlite = new Database(config.DATABASE_URL);
export const db = drizzle(sqlite, { schema, logger: true });
