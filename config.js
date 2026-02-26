//config = "Software_de_gestion_comercial";

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log( process.env.NAME_DATABASE, process.env.USER, process.env.PASSWORD, process.env.HOST, process.env.PORT)

const sequelize = new Sequelize(
    process.env.NAME_DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: "mysql", // hay que especificar que base de datos es
    }
);

async function conectar() {
    try {
        await sequelize.authenticate(); 
        console.log("Conexión establecida con éxito.");
    } catch (error) {   
        console.error("No se pudo conectar a la base de datos:", error);
    }
}

conectar()


// nombreDeLaBase de datos -> nombre de la cuenta -> donde se va conectar -> nombre de la base de datos
// mysql:
// root:admi → usuario y contraseña
// @localhost → host
// :3306 → puerto
// /ecommerce → base de datos