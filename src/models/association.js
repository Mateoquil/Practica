import etiquetas from "./etiquetas.js"
import producto from "./productos.js"
import ticketdeventa from "./ticketdeventa.js"
import ticketdeventaproductos from "./ticketdeventaproductos.js"

// Un producto pertenece a una etiqueta
producto.belongsTo(etiquetas, { foreignKey: "etiquetaId" });
etiquetas.hasMany(producto, { foreignKey: "etiquetaId" });

// Un ticket tiene muchos productos a través de la tabla intermedia
ticketdeventa.belongsToMany(producto, { through: ticketdeventaproductos, foreignKey: "ticketId" });
producto.belongsToMany(ticketdeventa, { through: ticketdeventaproductos, foreignKey: "productoId" });
export {
    etiquetas,
    producto,
    ticketdeventa,
    ticketdeventaproductos
}