import { hash } from "bcrypt";
import { Pool } from "pg";
import { v4 as uuidV4 } from "uuid";

async function create() {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: Number(process.env.POSTGRES_PORT),
  });

  const connection = await pool.connect();

  const id = uuidV4();

  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin")
    VALUES('${id}', 'admin', 'admin@elearning.co.ao', '${password}', true)`
  );
}

create()
  .then(() => console.log("User admin created"))
  .catch(() => console.error("User admin already exists!"));
