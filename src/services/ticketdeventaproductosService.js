import { ticketdeventaproductos } from "./models/ticketdeventaproductos.js";
import { productos } from "../models/productos.js";


class ticketdeventaproductosService{
    async createByBuy(dataTicketId,dataProductoId,dataCantidad,dataPrecioUnitario){
        try{
            const crearticketdeventaproductosService = await ticketdeventaproductos.create({
                ticketId:dataTicketId,
                productoId:dataProductoId,
                cantidad:dataCantidad,
                precioUnitario:dataPrecioUnitario,
            })
            return crearticketdeventaproductosService
            
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }


    async findAll(){
        try{
            const {count, rows} = await ticketdeventaproductos.findAndCountAll()
            if(count === 0){
                throw new Error("No se encontraron ticketdeventaproductos")
            }
            return {
                cantidad:count,
                etiquetas:rows// [{devuelve todos los producto}]
            }
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }
}

export default ticketdeventaproductosService