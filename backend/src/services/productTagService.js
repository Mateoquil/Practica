import product from '../models/product.js';
import tag from '../models/tag.js';

class ProductTagService {
    async getProductWithTagsByName(productName) {
        try {
            const productWithTags = await product.findOne({
                where: { name: productName },
                include: [{ model: tag, as: 'tags', through: { attributes: [] } }]
            });
            return productWithTags;
        } catch (error) {
            console.error('Error fetching product with tags:', error);
            throw error;
        }
    }

    async getProductsWithTags() {
        try {
            const { count, rows } = await product.findAndCountAll({
                include: [{ model: tag, as: 'tags', through: { attributes: [] } }]
            });
            return { count, products: rows };
        } catch (error) {
            console.error('Error fetching products with tags:', error);
            throw error;
        }
    }
}

export default ProductTagService;