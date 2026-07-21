type LogLevel = "info" | "warn" | "error" | "debug";

interface LogMeta {
  [key: string]: unknown;
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

function log(level: LogLevel, message: string, meta?: LogMeta) {
  const timestamp = formatTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  switch (level) {
    case "error":
      console.error(prefix, message, meta || "");
      break;
    case "warn":
      console.warn(prefix, message, meta || "");
      break;
    case "debug":
      if (process.env.NODE_ENV === "development") {
        console.debug(prefix, message, meta || "");
      }
      break;
    default:
      console.log(prefix, message, meta || "");
  }
}

export const logger = {
  info: (message: string, meta?: LogMeta) => log("info", message, meta),
  warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
  error: (message: string, meta?: LogMeta) => log("error", message, meta),
  debug: (message: string, meta?: LogMeta) => log("debug", message, meta),
};
