// backend/seed.js
import sequelize from './src/database/database.js';
import { tag, product } from './src/models/association.js';

const seed = async () => {
    try {
        await sequelize.sync();

        const foodTag = await tag.create({ type: 'food' });
        const drinksTag = await tag.create({ type: 'drinks' });

        const coke = await product.create({
            name: 'Coca-Cola 2L',
            price: 1500,
            stock: 50,
            url: 'https://via.placeholder.com/150',
            active: true
        });
        await coke.addTag(drinksTag); 

        const rice = await product.create({
            name: 'Rice 1kg',
            price: 900,
            stock: 100,
            url: 'https://via.placeholder.com/150',
            active: true
        });
        await rice.addTag(foodTag);

        console.log('✅ Seed complete');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seed();