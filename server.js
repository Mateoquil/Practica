//import express from 'express';
import { HostNotReachableError } from 'sequelize'; 

//const app = express();

async function api() {
    const rsp = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
    const rspParseada = await rsp.json()
    return rspParseada
}

console.log(await api())

//app.use(express.json());

//(req, res) => requiere y responde
//app.get(/health/, (req, res) => {
    //res.send("hello");
//});

//app.listen(3000, () => {
    //console.log("Server is running on port 3000");
// 

//app.express