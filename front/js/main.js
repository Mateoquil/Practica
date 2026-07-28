console.log("START JS - Store");

const tableBody = document.querySelector("#tableBody");
let allProducts = [];

// Query API
const queryApi = async (url) => {
    try {
        console.log("Calling API:", url);
        const api = await fetch(url);
        const apiResponse = await api.json();
        console.log("API response:", apiResponse);
        return apiResponse;
    } catch (error) {
        console.error("ERROR querying API:", error);
        return { products: [], tags: [] };
    }
};

// Get cart from localStorage
const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Save cart to localStorage
const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

// Update cart badge count
const updateCartCount = () => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline' : 'none';
    }
};

// Badge colors
const getBadgeClass = (tag) => {
    const colors = {
        "food": "bg-primary",
        "drinks": "bg-secondary",
        "soda": "bg-info",
        "juices": "bg-secondary",
        "snacks": "bg-warning",
        "candy": "bg-warning",
        "dairy": "bg-primary",
        "cleaning": "bg-success",
        "hygiene": "bg-success",
        "meat": "bg-danger",
        "bakery": "bg-warning",
        "vegetables": "bg-success",
        "yogurt": "bg-primary",
        "other": "bg-danger",
        "no tag": "bg-danger"
    };

    const tagLower = tag.toLowerCase();
    return colors[tagLower] || "bg-secondary";
};

// Create product row
const createProductRow = (product) => {
    const row = document.createElement("tr");
    const tag = product.tags?.[0]?.type || "No tag";
    const badgeClass = getBadgeClass(tag);

    row.innerHTML = `
        <td>${product.name}</td>
        <td><span class="badge ${badgeClass}">${tag}</span></td>
        <td>$ ${product.price}</td>
        <td>${product.stock}</td>
        <td>
            <button class="btn btn-sm btn-success" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "&apos;")})'>
                <i class="bi bi-cart-plus"></i> Add
            </button>
        </td>
    `;

    return row;
};

// Add product to cart
const addToCart = (product) => {
    let cart = getCart();

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showNotification(`${product.name} - Quantity updated`, 'success');
        } else {
            showNotification(`No more stock for ${product.name}`, 'warning');
            return;
        }
    } else {
        const tag = product.tags?.[0]?.type || "No tag";
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            tag: tag,
            quantity: 1,
            stock: product.stock
        });
        showNotification(`${product.name} added to cart`, 'success');
    }

    saveCart(cart);
};

// Show notification
const showNotification = (message, type = 'success') => {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertBox.style.zIndex = '9999';
    alertBox.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
};

// Render products in table
const renderProducts = (products) => {
    tableBody.innerHTML = '';

    if (products.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    <i class="bi bi-search fs-1 d-block mb-2"></i>
                    No products found
                </td>
            </tr>
        `;
        return;
    }

    products.forEach(product => {
        const row = createProductRow(product);
        tableBody.appendChild(row);
    });
};

// Search products (by name AND category)
const searchProducts = () => {
    const name = document.getElementById("productName").value.toLowerCase().trim();
    const type = document.getElementById("productType").value;

    let filteredProducts = allProducts;

    // Filter by name
    if (name) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(name)
        );
    }

    // Filter by category — checks ALL of the product's tags, not just the first one
    if (type) {
        filteredProducts = filteredProducts.filter(product =>
            product.tags.some(t => t.type.toLowerCase() === type.toLowerCase())
        );
    }

    renderProducts(filteredProducts);
};

// Clear search
const clearSearch = () => {
    document.getElementById("productName").value = '';
    document.getElementById("productType").value = '';
    renderProducts(allProducts);
};

// Update autocomplete suggestions
const updateSuggestions = () => {
    const datalist = document.getElementById("suggestions");
    if (!datalist) return;

    datalist.innerHTML = "";

    const uniqueNames = [...new Set(allProducts.map(p => p.name))];

    uniqueNames.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        datalist.appendChild(option);
    });
};

// Load tags into the select — pulled from the already-loaded products
const loadTagsIntoSelect = () => {
    const select = document.getElementById("productType");
    if (!select) return;

    // Extract unique tags from all products
    const uniqueTags = [...new Map(
        allProducts
            .flatMap(p => p.tags)
            .map(t => [t.type, t])
    ).values()];

    select.innerHTML = '<option value="">All categories</option>';

    uniqueTags.forEach(tag => {
        const option = document.createElement("option");
        option.value = tag.type;
        option.textContent = tag.type.charAt(0).toUpperCase() + tag.type.slice(1);
        select.appendChild(option);
    });

    console.log(`✅ ${uniqueTags.length} tags loaded`);
};

// Load all products
const injectProductsIntoHtml = async () => {
    console.log("🟢 Loading products...");

    const apiResponse = await queryApi("http://localhost:3000/api/products");

    allProducts = apiResponse.products || [];
    console.log("🟢 Products received:", allProducts.length);

    renderProducts(allProducts);
    updateCartCount();
    updateSuggestions();
};

// Initialize everything — products first, then tags
const initialize = async () => {
    console.log("🚀 Initializing...");

    try {
        await injectProductsIntoHtml(); // products first
        loadTagsIntoSelect();           // then extract tags from them
        console.log("✅ Initialization complete");
    } catch (error) {
        console.error("❌ Initialization error:", error);
    }
};

// Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    console.log("📄 DOM Loaded");

    const nameInput = document.getElementById('productName');
    if (nameInput) {
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });

        // Live search as you type
        nameInput.addEventListener('input', () => {
            searchProducts();
        });
    }

    // Initialize
    initialize();
});