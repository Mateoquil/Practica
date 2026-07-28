import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Debug logs to confirm env variables loaded correctly
console.log("Database:", process.env.NAME_DB);
console.log("User:", process.env.User);
console.log("Host:", process.env.HOST);
console.log("Port:", process.env.PORT);

// Sequelize instance: connection details come from .env, never hardcoded
const sequelize = new Sequelize(
    process.env.NAME_DB,
    process.env.User,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT || "mysql",
    }
);

// Test the connection on startup so failures show up immediately, not on first query
async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection established successfully.");
    } catch (error) {
        console.error("Could not connect to the database:", error);
    }
}

connect();
export default sequelize;

// Connection string breakdown (for reference):
// mysql://user:password@host:port/database_name