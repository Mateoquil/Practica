import etiquetas from "./etiquetas.js"
import producto from "./productos.js"
import ticketdeventa from "./ticketdeventa.js"
import ticketdeventaproductos from "./ticketdeventaproductos.js"

// Un producto pertenece a una etiqueta
producto.belongsTo(etiquetas, { foreignKey: "etiquetaId" });
etiquetas.hasMany(producto, { foreignKey: "etiquetaId" });

producto.belongsTo(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})
ticketdeventa.hasMany(ticketdeventaproductos,{foreignKey:"idTicketDeVentaProductos"})

export {
    etiquetas,
    producto,
    ticketdeventa,
    ticketdeventaproductos
}