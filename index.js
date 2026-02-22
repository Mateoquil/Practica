
const baseDeDatos = []
class productos {
    nombreDelProducto
    cantidadDelProducto
    precio

    constructor(nombreDelProducto, cantidadDelProducto, precio) {
        this.nombreDelProducto = nombreDelProducto
        this.cantidadDelProducto = cantidadDelProducto
        this.precio = precio
    }

    async crear() {
        const crearProductos = {
            nombreDelProducto: this.nombreDelProducto,
            cantidadDelProducto: this.cantidadDelProducto,
            precio: this.precio
        }
        baseDeDatos.push(crearProductos)
        return baseDeDatos
    }

}

const producto = new productos("papitas", 10, 1200)
const producto1 = producto.crear()
console.log(producto1)
