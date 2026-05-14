const defaultConfig = {
  host: "localhost",
  port: 5432,
  database: "csp451_app",
  user: "app_user",
  password: "",
};

let activeConnection = null;

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

function connect(env = process.env) {
  const config = readDatabaseConfig(env);

  activeConnection = {
    connected: true,
    driver: "in-memory",
    connectedAt: new Date().toISOString(),
    config: maskConfig(config),
  };

  return activeConnection;
}

function getConnection() {
  if (!activeConnection) {
    return connect();
  }

  return activeConnection;
}

module.exports = {
  connect,
  getConnection,
  readDatabaseConfig,
  maskConfig,
};
