const defaultConfig = {
  host: "localhost",
  port: 5432,
  database: "csp451_app",
  user: "app_user",
  password: "",
};

let activeConnection = null;

const memoryStore = {
  users: [
    {
      id: 1,
      username: "student",
      role: "learner",
    },
  ],
  auditLog: [],
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

function connect(env = process.env) {
  const config = readDatabaseConfig(env);

  activeConnection = {
    connected: true,
    driver: "in-memory",
    connectedAt: new Date().toISOString(),
    config: maskConfig(config),
  };

  memoryStore.auditLog.push({
    action: "connect",
    createdAt: activeConnection.connectedAt,
  });

  return activeConnection;
}

function getConnection() {
  if (!activeConnection) {
    return connect();
  }

  return activeConnection;
}

function query(collectionName) {
  getConnection();

  if (!Object.prototype.hasOwnProperty.call(memoryStore, collectionName)) {
    return {
      rows: [],
      rowCount: 0,
      error: `Unknown collection: ${collectionName}`,
    };
  }

  const rows = memoryStore[collectionName];

  return {
    rows,
    rowCount: rows.length,
    error: null,
  };
}

function insert(collectionName, record) {
  getConnection();

  if (!Object.prototype.hasOwnProperty.call(memoryStore, collectionName)) {
    memoryStore[collectionName] = [];
  }

  const newRecord = {
    id: memoryStore[collectionName].length + 1,
    ...record,
  };

  memoryStore[collectionName].push(newRecord);

  return newRecord;
}

module.exports = {
  connect,
  getConnection,
  query,
  insert,
  readDatabaseConfig,
  maskConfig,
};
