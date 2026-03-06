import ProductoService from '../services/productosService.js';
import EtiquetaService from '../services/etiquetasService.js';
class CrearController {

    crearProductos = async (req, res) => {
        try {
            const datos = req.body
            const service = new ProductoService();
            const productos = await service.create(datos.nombre, datos.precio, datos.stock, datos.url, datos.activo, datos.etiquetaId);
            res.json(productos);
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }

    crearEtiquetas = async (req, res) => {
        try {
            const datos = req.body
            const service = new EtiquetaService();
            const productos = await service.create(datos.nombre);
            res.json(productos);
        } catch (error) {
            console.error('Error al buscar los productos:', error);
            res.status(500).json({ error: 'Error al buscar los productos' });
        }
    }


}

export default DashboardController;