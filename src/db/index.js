const defaultConfig = {
  host: "localhost",
  port: 5432,
  database: "csp451_app",
  user: "app_user",
  password: "",
};

function readDatabaseConfig(env = process.env) {
  return {
    host: env.DB_HOST || defaultConfig.host,
    port: Number(env.DB_PORT || defaultConfig.port),
    database: env.DB_NAME || defaultConfig.database,
    user: env.DB_USER || defaultConfig.user,
    password: env.DB_PASSWORD || defaultConfig.password,
  };
}

function maskConfig(config) {
  return {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password ? "********" : "",
  };
}

module.exports = {
  readDatabaseConfig,
  maskConfig,
};
