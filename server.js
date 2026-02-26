import sequelize from "./config.js";

async function sincronizar() {
    try{
        await sequelize.sync({alter:true})
        console.log("conexion exitosa 🥗")
    }catch(error){
        console.log("error en la sincronizacion:",error.message)
    }
    finally{
        console.log("conexion cerrada")
        await sequelize.close()
    }
}

sincronizar()

















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