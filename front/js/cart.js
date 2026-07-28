console.log("START JS - Cart");

const cartTable = document.getElementById('cartTable');
const cartTotalEl = document.getElementById('cartTotal');
const emptyCart = document.getElementById('emptyCart');
const cartContent = document.getElementById('cartContent');
const totalContainer = document.getElementById('totalContainer');
const buttonsContainer = document.getElementById('buttonsContainer');

// Get cart
const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Save cart
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

// Update badge count
const updateCartCount = () => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline' : 'none';
    }
};

// Badge color
const getBadgeClass = (tag) => {
    const colors = {
        "food": "bg-primary",
        "drinks": "bg-secondary",
        "juices": "bg-secondary",
        "snacks": "bg-warning",
        "candy": "bg-warning",
        "dairy": "bg-primary",
        "cleaning": "bg-success",
        "hygiene": "bg-success",
        "other": "bg-danger"
    };
    return colors[tag] || "bg-secondary";
};

// Calculate total
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Render cart
const renderCart = () => {
    const cart = getCart();

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        totalContainer.style.display = 'none';
        buttonsContainer.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'block';
    totalContainer.style.display = 'flex';
    buttonsContainer.style.display = 'flex';

    cartTable.innerHTML = '';

    cart.forEach((item, index) => {
        const badgeClass = getBadgeClass(item.tag);
        const subtotal = item.price * item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><span class="badge ${badgeClass}">${item.tag}</span></td>
            <td>$ ${item.price}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${index}, -1)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${index}, 1)">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </td>
            <td>$ ${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i> Remove
                </button>
            </td>
        `;
        cartTable.appendChild(row);
    });

    const total = calculateTotal(cart);
    cartTotalEl.textContent = total.toFixed(2);

    updateCartCount();
};

// Change quantity
const changeQuantity = (index, change) => {
    let cart = getCart();
    const item = cart[index];

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
        removeFromCart(index);
        return;
    }

    if (newQuantity > item.stock) {
        alert(`Max stock: ${item.stock}`);
        return;
    }

    item.quantity = newQuantity;
    saveCart(cart);
    renderCart();
};

// Remove from cart
const removeFromCart = (index) => {
    let cart = getCart();
    const item = cart[index];

    if (confirm(`Remove ${item.name} from cart?`)) {
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }
};

// Clear cart
const clearCart = () => {
    if (confirm('Clear the entire cart?')) {
        localStorage.removeItem('cart');
        renderCart();
    }
};

// Checkout
const checkout = () => {
    const cart = getCart();
    const total = calculateTotal(cart);

    alert(`Purchase complete!\nTotal: $${total.toFixed(2)}\n\n(Payment system integration would go here)`);

    localStorage.removeItem('cart');
    renderCart();
};

// Load cart on start
renderCart();