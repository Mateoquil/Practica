import saleTicketProducts from "../models/saleTicketProducts.js";
import product from "../models/product.js";

// TODO BIG ISSUE: this class is nearly identical to saleTicketService.js below,
// but it's named after the JUNCTION table (ticket + product + quantity). A junction
// service should link an EXISTING ticket to an EXISTING product with a quantity —
// not create a brand new ticket. Also: `ticketDeVenta` is used below but never
// imported/defined in this file — this throws a ReferenceError the moment create() runs.
// You probably need to redesign what this service is actually supposed to do.
class SaleTicketProductsService {
    async create(ticketPaymentMethod, ticketTotalPrice) {
        try {
            const randomReceiptNumber = Math.random().toString(36).substring(2, 12).toUpperCase();
            const createdTicket = await ticketDeVenta.create({
                paymentMethod: ticketPaymentMethod,
                totalPrice: ticketTotalPrice,
                receiptNumber: randomReceiptNumber
            });
            if (!createdTicket) throw new Error("Error creating ticket in the database");
            return {
                id: createdTicket.id, paymentMethod: createdTicket.paymentMethod,
                totalPrice: createdTicket.totalPrice, receiptNumber: createdTicket.receiptNumber
            };
        } catch (error) {
            console.log("Error in sale ticket products service (create):", error);
        }
    }

    async findAll() {
        try {
            const { count, rows } = await saleTicketProducts.findAndCountAll();
            if (count === 0) throw new Error("No tickets found");
            return { count, tickets: rows };
        } catch (error) {
            console.log("Error in sale ticket products service (findAll):", error);
        }
    }

    async findOne(ticketId) {
        try {
            const foundTicket = await saleTicketProducts.findByPk(ticketId);
            if (!foundTicket) throw new Error("Ticket not found");
            return foundTicket;
        } catch (error) {
            console.log("Error in sale ticket products service (findOne):", error);
        }
    }

    async delete(ticketId) {
        try {
            const ticketExists = await this.findOne(ticketId);
            if (!ticketExists) throw new Error("Ticket not found");
            const deletedTicket = await saleTicketProducts.destroy({ where: { id: ticketId } });
            return { message: "Ticket deleted successfully", deletedTicket };
        } catch (error) {
            console.log("Error in sale ticket products service (delete):", error);
        }
    }
}

export default SaleTicketProductsService;