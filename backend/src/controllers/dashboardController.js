import ProductTagService from '../services/productTagService.js';

class DashboardController {

    getAllProducts = async (req, res) => {
        try {
            const productTagService = new ProductTagService();
            const productsWithTags = await productTagService.getProductsWithTags();
            res.status(200).json(productsWithTags);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        }
    }

    getProductByName = async (req, res) => {
        try {
            const normalizedName = req.params.name.toLowerCase().trim();

            const productTagService = new ProductTagService();
            const productWithTag = await productTagService.getProductWithTagsByName(normalizedName);
            res.status(200).json(productWithTag);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Error fetching product' });
        }
    }
}

export default DashboardController;