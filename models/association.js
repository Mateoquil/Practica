import etiquetas from "./etiquetas.js"
import producto from "./productos.js"
import ticketdeventa from "./ticketdeventa.js"
import ticketdeventaproductos from "./ticketdeventaproductos.js"

producto.belongsTo(etiquetas,{foreignKey:"etiquetaId"})
etiquetas.hasMany(producto,{foreignKey:"etiquetaId"})

producto.belongsTo(ticketdeventaproductos,{foreignKey:"productoId"})
ticketdeventaproductos.hasMany(producto,{foreignKey:"productoId"})

producto.belongsToMany(ticketdeventa,{ foreignKey:"ticketId"})
ticketdeventa.belongsToMany(producto,{ foreignKey:"ticketId"})



// CREATE TABLE `ticketDeVentaProductos` (
//   `id` INT PRIMARY KEY AUTO_INCREMENT,
//   `ticketId` INT NOT NULL,
//   `productoId` INT NOT NULL,
//   `cantidad` INT NOT NULL,
//   `precioUnitario` DECIMAL(10,2) NOT NULL,
//   FOREIGN KEY (`ticketId`) REFERENCES `ticketDeVenta` (`id`),
//   FOREIGN KEY (`productoId`) REFERENCES `Productos` (`id`)
// );


// use gestor_de_productos;

// CREATE TABLE etiquetas (
//   id INT PRIMARY KEY auto_increment,
//   tipo VARCHAR(50) UNIQUE NOT NULL
// );




// CREATE TABLE `Productos` (
//   `id` INT PRIMARY KEY AUTO_INCREMENT,
//   `nombre` VARCHAR(255) NOT NULL,
//   `precio` DECIMAL(10,2) NOT NULL,
//   `stock` INT NOT NULL,
//   `url` VARCHAR(500) NOT NULL,
//   `activo` BOOLEAN DEFAULT TRUE,
//   `etiquetaId` INT,
//   FOREIGN KEY (`etiquetaId`) REFERENCES `etiquetas` (`id`)
// );

// CREATE TABLE `ticketDeVenta` (
//   `id` INT PRIMARY KEY AUTO_INCREMENT,
//   `metodoDePago` ENUM('efectivo', 'credito', 'debito', 'transferencia') NOT NULL,
//   `precioTotal` DECIMAL(10,2) NOT NULL,
//   `numeroDeComprobante` VARCHAR(100) UNIQUE NOT NULL,
//   `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

