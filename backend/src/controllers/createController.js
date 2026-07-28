import ProductService from '../services/productService.js';
import TagService from '../services/tagService.js';

class CreateController {

    createProduct = async (req, res) => {
        try {
            const data = req.body;

            // Required fields check before touching the database
            if (!data.name || !data.price || !data.stock || !data.tagId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const validName = data.name.trim();
            const validPrice = data.price;
            const validStock = data.stock;
            // TODO: bug — validated data.tagId above but using data.tag here.
            // Decide which field is correct and make both lines consistent.
            const validTag = data.tag;
            const validUrl = data.url.trim();

            const service = new ProductService();
            const product = await service.create(validName, validPrice, validStock, validUrl, data.active, validTag);

            if (!product) {
                return res.status(400).json({ error: 'Could not create the product' });
            }

            res.status(201).json({ product });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Error creating product' });
        }
    }

    createTag = async (req, res) => {
        try {
            const data = req.body;

            if (!data.type) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const validName = data.type.trim();

            const service = new TagService();
            const tag = await service.create(validName);

            if (!tag) {
                return res.status(400).json({ error: 'Could not create the tag' });
            }

            res.status(201).json({
                message: 'Tag created successfully',
                tagId: tag.id,
                tagName: tag.type,
            });
        } catch (error) {
            console.error('Error creating tag:', error);
            res.status(500).json({ error: 'Error creating tag' });
        }
    }
}

export default CreateController;