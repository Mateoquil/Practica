import Product from "../models/product.js";

class ProductService {
    async create(productName, productPrice, productStock, productUrl, productActive, productTagId) {
        try {
            const foundProduct = await Product.findOne({ where: { name: productName } });
            if (foundProduct) throw new Error("Product name already exists");

            // TODO: verify — the product model doesn't define a "tagId" column directly
            // (tags are linked through the product_tag junction table). Sequelize may
            // silently ignore this field instead of saving it. Check if this needs to
            // be handled differently (e.g. creating the product, then associating the tag).
            const createdProduct = await Product.create({
                name: productName, price: productPrice, stock: productStock,
                url: productUrl, active: productActive, tagId: productTagId
            });
            return createdProduct;
        } catch (error) {
            console.log("Error in product service (create):", error);
        }
    }

    async updateProduct(productId, productName, productPrice, productStock, productUrl, productActive, productTagId) {
        try {
            // TODO BUG: this.findOne doesn't exist on this class (method below is
            // findOneById), and it's missing "await" — productExists is currently a
            // pending Promise, not the record. Should be:
            // const productExists = await this.findOneById(productId);
            const productExists = this.findOne(productId);
            if (!productExists) throw new Error("Product does not exist");

            const updatedProduct = await Product.update({
                name: productName ?? productExists.name,
                price: productPrice ?? productExists.price,
                stock: productStock ?? productExists.stock,
                url: productUrl ?? productExists.url,
                active: productActive ?? productExists.active,
                tagId: productTagId ?? productExists.tagId
            }, { where: { id: productId } });
            console.log("Product updated:", updatedProduct);
        } catch (error) {
            console.log("Error in product service (update):", error);
        }
    }

    async findAll() {
        try {
            const { count, rows } = await Product.findAndCountAll();
            if (count === 0) throw new Error("No products found");
            // TODO: leftover key name from copy-paste, should be "products" not "tags"
            return { count, tags: rows };
        } catch (error) {
            console.log("Error in product service (findAll):", error);
        }
    }

    async findOneById(productId) {
        try {
            const foundProduct = await Product.findOne({ where: { id: productId } });
            if (!foundProduct) throw new Error("Product not found");
            return foundProduct;
        } catch (error) {
            console.log("Error in product service (findOneById):", error);
        }
    }

    async findOneByName(productName) {
        try {
            const foundProduct = await Product.findOne({ where: { name: productName } });
            if (!foundProduct) throw new Error("Product not found");
            return foundProduct;
        } catch (error) {
            console.log("Error in product service (findOneByName):", error);
        }
    }

    async delete(productId) {
        try {
            const productExists = await this.findOneById(productId);
            if (!productExists) throw new Error("Product not found");
            await Product.destroy({ where: { id: productId } });
            return { message: "Product deleted successfully" };
        } catch (error) {
            console.log("Error in product service (delete):", error);
        }
    }
}

export default ProductService;