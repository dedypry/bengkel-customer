interface Config {
  front: string;
  api: string;
  gallery: string;
  socket: string;
}

interface IConfigs {
  production: Config;
  local: Config;
}
type EnvKeys = keyof IConfigs;

const configs: IConfigs = {
  local: {
    front: "http://localhost:5174",
    api: "http://127.0.0.1:3333",
    socket: "http://127.0.0.1:3334",
    gallery: "http://127.0.0.1:9876",
  },
  production: {
    front: "https://pradanaautocare.id",
    api: "https://api.pradanaautocare.id",
    socket: "https://socket.dedypry.site",
    gallery: "https://gallery.dedypry.site",
  },
};

const rawEnv = String(import.meta.env.VITE_NODE_ENV || "local")
  .trim()
  .toLowerCase();

const currentEnv: EnvKeys =
  rawEnv === "production" || rawEnv === "prod" ? "production" : "local";

const config: Config = configs[currentEnv] ?? configs.local;

export default config;
