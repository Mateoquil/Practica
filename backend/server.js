import sequelize from './src/database/database.js';
import { tag, product, saleTicket, saleTicketProducts, productTag } from './src/models/association.js';
import express from "express";
import dashboard from "./src/routes/dashboardRoutes.js";
import create from "./src/routes/createRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Main routes
app.use("/api", dashboard);
app.use("/api", create);

async function synchronize() {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Sync successful - all tables have been created/updated");
    } catch (error) {
        console.log("❌ Sync error:", error.message);
    }
}

synchronize();

app.get("/health", (req, res) => {
    res.send("it's working");
});

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});