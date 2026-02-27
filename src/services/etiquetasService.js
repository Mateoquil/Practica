import etiquetas from "../models/etiquetas.js"

class EtiquetaService{
    async create(tipoEtiqueta){
        try{
            const crearEtiqueta = await etiquetas.create({
                tipo: tipoEtiqueta
            })
            if(!crearEtiqueta){
                throw new Error("error al crear un producto en la db")
            }
            return {
                id:crearEtiqueta.id,
                nombre:crearEtiqueta.tipoEtiqueta
            }
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }

    async findAll(){
        try{
            const {count, rows} = await etiquetas.findAndCountAll()
            if(count === 0){
                throw new Error("No se encontraron etiquetas")
            }
            return {
                cantidad:count,
                etiquetas:rows
            }
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }

    async findOne(idEtiqueta){
        try{
            const etiquetaEncontrada = await etiquetas.destroy({where:{id:idEtiqueta}})
            if(!etiquetaEncontrada){
                throw new Error("etiquetas no encontradas")
            }
            return etiquetaEncontrada
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }

    async delete(etiquetaId){
        try{
            const etiquetaExiste = await this.findOne(etiquetaId)
            if(!etiquetaExiste){
                throw new Error("etiquetas no encontradas")
            }
            const eliminarEtiqueta = await etiquetas.destroy({where:{id:etiquetaId}})
            return {mensaje:"etiqueta eliminada con exito",eliminarEtiqueta}
        }catch(error){
            console.log("error en etiqueta service al crear:",error)            
        }
    }

}

export default EtiquetaService