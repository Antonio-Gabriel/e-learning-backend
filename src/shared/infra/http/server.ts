import { app } from "./app";

app.listen(process.env.NODE_ENV_API_PORT, () => console.log("Server running!"));
