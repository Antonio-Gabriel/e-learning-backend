import { Connection, createConnection, getConnectionOptions } from "typeorm";

// createConnection();

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "db_thewomanworld_test"
          : defaultOptions.database,
    })
  );
};
