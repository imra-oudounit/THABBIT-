import { env } from "../config/env";

type LogLevel = "debug" | "info" | "warn" | "error";

function shouldLog(level: LogLevel) {
  if (env.isDev) return true;
  return level === "warn" || level === "error";
}

function write(level: LogLevel, ...args: unknown[]) {
  if (!shouldLog(level)) return;
  const tag = `[THABBIT:${level.toUpperCase()}]`;
  if (level === "debug") console.debug(tag, ...args);
  else if (level === "info") console.info(tag, ...args);
  else if (level === "warn") console.warn(tag, ...args);
  else console.error(tag, ...args);
}

export const logger = {
  debug: (...args: unknown[]) => write("debug", ...args),
  info: (...args: unknown[]) => write("info", ...args),
  warn: (...args: unknown[]) => write("warn", ...args),
  error: (...args: unknown[]) => write("error", ...args),
};
