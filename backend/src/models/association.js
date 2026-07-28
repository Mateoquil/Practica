import tag from "./tag.js";
import product from "./product.js";
import saleTicket from "./saleTicket.js";
import saleTicketProducts from "./saleTicketProducts.js";
import productTag from "./productTag.js";

// A product can have many tags, and a tag can belong to many products (many-to-many)
product.belongsToMany(tag, {
    through: productTag,
    foreignKey: "productId",
    otherKey: "tagId",
    as: "tags"
});

tag.belongsToMany(product, {
    through: productTag,
    foreignKey: "tagId",
    otherKey: "productId",
    as: "products"
});

// TODO: review this relationship after fixing the saleTicketProducts bug above —
// "product belongsTo saleTicketProducts" reads backwards; normally the junction
// table (saleTicketProducts) should reference the product, not the other way around.
product.belongsTo(saleTicketProducts, { foreignKey: "idSaleTicketProducts" });
saleTicket.hasMany(saleTicketProducts, { foreignKey: "idSaleTicketProducts" });

export {
    tag,
    product,
    saleTicket,
    saleTicketProducts,
    productTag
};