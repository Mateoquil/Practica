import ProductoService  from '../services/productosService.js';
class DashboardController {
    
    // traer todas las etiquetas
    // traer todos los etiquetas por producto
    traerTodosLosProductos = async (req, res) => {
        try {
            const service = new ProductoService();
            const productos = await service.findAll();
            res.json(productos);
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }

    traerProductoPorNombre = async (req, res) => {
        try{
            const nombreNormalizado = req.body.nombreProducto.toLowerCase().trim();
            const service = new ProductoService();
            const productoEncontrado = await service.findOneByName(nombreNormalizado)
            res.json(productoEncontrado);            
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.status(500).json({ error: 'Error al buscar el producto' });
        }
    }

    
}

export default DashboardController;