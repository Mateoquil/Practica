
import sequelize from './src/database/database.js';
import { tag, product } from './src/models/association.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const [foodTag] = await tag.findOrCreate({ where: { type: 'food' }, defaults: { type: 'food' } });
        const [drinksTag] = await tag.findOrCreate({ where: { type: 'drinks' }, defaults: { type: 'drinks' } });
        const [snacksTag] = await tag.findOrCreate({ where: { type: 'snacks' }, defaults: { type: 'snacks' } });
        const [dairyTag] = await tag.findOrCreate({ where: { type: 'dairy' }, defaults: { type: 'dairy' } });
        const [cleaningTag] = await tag.findOrCreate({ where: { type: 'cleaning' }, defaults: { type: 'cleaning' } });
        const [bakeryTag] = await tag.findOrCreate({ where: { type: 'bakery' }, defaults: { type: 'bakery' } });
        const [hygieneTag] = await tag.findOrCreate({ where: { type: 'hygiene' }, defaults: { type: 'hygiene' } });

        const products = [
            { name: 'Coca-Cola 2L', price: 1500, stock: 50, tag: drinksTag },
            { name: 'Rice 1kg', price: 900, stock: 100, tag: foodTag },
            { name: 'Mineral Water 1.5L', price: 700, stock: 80, tag: drinksTag },
            { name: 'Potato Chips 150g', price: 1200, stock: 60, tag: snacksTag },
            { name: 'Chocolate Bar 100g', price: 800, stock: 90, tag: snacksTag },
            { name: 'Milk 1L', price: 950, stock: 70, tag: dairyTag },
            { name: 'Yogurt 200g', price: 600, stock: 65, tag: dairyTag },
            { name: 'Pasta 500g', price: 850, stock: 120, tag: foodTag },
            { name: 'Dish Detergent 750ml', price: 1100, stock: 40, tag: cleaningTag },
            { name: 'Bleach 1L', price: 780, stock: 55, tag: cleaningTag },
            { name: 'Orange Juice 1L', price: 1050, stock: 45, tag: drinksTag },
            { name: 'Sparkling Water 500ml', price: 650, stock: 75, tag: drinksTag },
            { name: 'Cheese 300g', price: 1800, stock: 35, tag: dairyTag },
            { name: 'Butter 200g', price: 1300, stock: 50, tag: dairyTag },
            { name: 'White Bread', price: 700, stock: 55, tag: bakeryTag },
            { name: 'Croissants x6', price: 1400, stock: 30, tag: bakeryTag },
            { name: 'Popcorn 100g', price: 550, stock: 85, tag: snacksTag },
            { name: 'Peanuts 200g', price: 900, stock: 60, tag: snacksTag },
            { name: 'Shampoo 400ml', price: 1600, stock: 40, tag: hygieneTag },
            { name: 'Toothpaste 90g', price: 850, stock: 65, tag: hygieneTag },
        ];

        for (const p of products) {
            const [productInstance] = await product.findOrCreate({
                where: { name: p.name },
                defaults: {
                    name: p.name,
                    price: p.price,
                    stock: p.stock,
                    url: 'https://via.placeholder.com/150',
                    active: true
                }
            });
            await productInstance.addTag(p.tag);
        }

        console.log('✅ Seed complete');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seed();