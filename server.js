import sequelize from './src/configDatabase/config.js';
import { etiquetas, producto, ticketdeventa, ticketdeventaproductos } from './src/models/association.js';

async function sincronizar() {
    try {
        // Sincroniza todas las tablas con los modelos
        await sequelize.sync({ alter: true });
        console.log("✅ Sincronización exitosa - Todas las tablas han sido creadas/actualizadas");
    } catch (error) {
        console.log("❌ Error en la sincronización:", error.message);
    }
}

sincronizar();

















//import express from 'express';


//const app = express();



//app.use(express.json());

//(req, res) => requiere y responde
//app.get(/health/, (req, res) => {
//res.send("hello");
//});

//app.listen(3000, () => {
//console.log("Server is running on port 3000");
//

//app.express