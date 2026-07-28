import saleTicket from "../models/saleTicket.js";
import product from "../models/product.js";

class SaleTicketService {
    async create(ticketPaymentMethod, ticketTotalPrice) {
        try {
            const createdSaleTicket = await saleTicket.create({
                paymentMethod: ticketPaymentMethod,
                totalPrice: ticketTotalPrice
            });
            return createdSaleTicket;
        } catch (error) {
            console.log("Error in sale ticket service (create):", error);
        }
    }

    async findAll() {
        try {
            // TODO BUG: queries `product` instead of `saleTicket`. Should be:
            // const { count, rows } = await saleTicket.findAndCountAll();
            const { count, rows } = await product.findAndCountAll();
            if (count === 0) throw new Error("No products found");
            return { count, tags: rows }; // TODO: should be "tickets", not "tags"
        } catch (error) {
            console.log("Error in sale ticket service (findAll):", error);
        }
    }

    async findOneById(id) {
        try {
            // TODO BUG: `id` is a plain number (the ticket id), not a model — calling
            // id.findOne(...) throws "id.findOne is not a function". Should be:
            // const found = await saleTicket.findOne({ where: { id } });
            const found = await id.findOne({ where: { id: id } });
            if (!found) throw new Error("ID not found");
            return found;
        } catch (error) {
            console.log("Error in sale ticket service (findOneById):", error);
        }
    }
}

export default SaleTicketService;