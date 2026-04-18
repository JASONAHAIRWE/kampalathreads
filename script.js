// ── PRODUCT DATA ──
const products = [
    { id:1,  name:"Kitenge Wrap Dress",    tags:["women","modern"],      price:"UGX 85,000",  badge:"Bestseller", bg:"#E8D5C4", emoji:"&#128248;" },
    { id:2,  name:"Men's Kitenge Shirt",   tags:["men","modern"],        price:"UGX 65,000",  badge:"",           bg:"#D4C5B0", emoji:"&#128248;" },
    { id:3,  name:"Classic Gomesi",        tags:["women","traditional"], price:"UGX 120,000", badge:"Traditional",bg:"#E0CEC0", emoji:"&#128248;" },
    { id:4,  name:"Ankara Midi Skirt",     tags:["women","modern"],      price:"UGX 55,000",  badge:"New",        bg:"#DCCFBE", emoji:"&#128248;" },
    { id:5,  name:"Kitenge Jumpsuit",      tags:["women","modern"],      price:"UGX 95,000",  badge:"New",        bg:"#E8D5C4", emoji:"&#128248;" },
    { id:6,  name:"Men's Kanzu",           tags:["men","traditional"],   price:"UGX 75,000",  badge:"Traditional",bg:"#D8CCBC", emoji:"&#128248;" },
    { id:7,  name:"Kitenge Blazer",        tags:["men","modern"],        price:"UGX 110,000", badge:"Premium",    bg:"#E4D0BC", emoji:"&#128248;" },
    { id:8,  name:"Kids Kitenge Set",      tags:["kids"],                price:"UGX 45,000",  badge:"",           bg:"#E0D5C5", emoji:"&#128248;" },
    { id:9,  name:"Bark Cloth Handbag",    tags:["women","traditional"], price:"UGX 38,000",  badge:"Eco",        bg:"#D8C8B4", emoji:"&#128248;" },
    { id:10, name:"Teen Gomesi",           tags:["kids","traditional"],  price:"UGX 55,000",  badge:"New",        bg:"#DDD0C2", emoji:"&#128248;" },
    { id:11, name:"Kitenge Shorts Set",    tags:["men","modern"],        price:"UGX 52,000",  badge:"",           bg:"#D4C8B8", emoji:"&#128248;" },
    { id:12, name:"Baby Kitenge Set",      tags:["kids"],                price:"UGX 32,000",  badge:"Cute",       bg:"#E8DDD0", emoji:"&#128248;" },
];

// ── RENDER FUNCTIONS ──
function productHTML(p) {
    const tagStr = p.tags.join(',');
    const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
    return `
        <div class="product-card" data-tags="${tagStr}">
            <div class="product-img" style="background:${p.bg};">
                <img src="https://source.unsplash.com/400x350/?african,fashion,clothing&sig=${p.id}"
                     alt="${p.name} - Authentic African fashion from Kampala Threads"
                     onerror="this.style.display='none'; this.parentElement.innerHTML += '<span style=font-size:3.5rem>&#128248;</span>';">
                ${badgeHTML}
            </div>
            <div class="product-info">
                <div class="product-category">${p.tags.join(' &middot; ')}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-footer">
                    <span class="product-price">${p.price}</span>
                    <button class="add-cart-btn" onclick="addToCart('${p.name}')">Add to Cart</button>
                </div>
            </div>
        </div>`;
}

// Populate grids
document.getElementById('featured-products').innerHTML = products.slice(0,4).map(productHTML).join('');
document.getElementById('shop-products').innerHTML = products.map(productHTML).join('');

// ── NAVIGATION ──
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const pg = document.getElementById(page);
    const nav = document.getElementById('nav-' + page);
    if (pg) pg.classList.add('active');
    if (nav) nav.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── FILTER ──
function filterProducts(filter, btn) {
    if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    document.querySelectorAll('#shop-products .product-card').forEach(card => {
        const tags = card.dataset.tags || '';
        card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
    });
}

// ── TOAST ──
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}
function addToCart(name) {
    let cart = JSON.parse(localStorage.getItem('kampalaCart') || '[]');
    const item = products.find(p => p.name === name);
    if (item) {
        cart.push(item);
        localStorage.setItem('kampalaCart', JSON.stringify(cart));
        updateCartCount();
        showToast('&#128722; "' + name + '" added to cart! (' + cart.length + ' items)');
    }
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('kampalaCart') || '[]');
    document.getElementById('cart-count').textContent = cart.length;
}
function viewCart() {
    const cart = JSON.parse(localStorage.getItem('kampalaCart') || '[]');
    if (cart.length === 0) {
        showToast('Your cart is empty.');
        return;
    }
    let msg = 'Cart (' + cart.length + ' items): ';
    cart.forEach(item => msg += item.name + ' - ' + item.price + ', ');
    msg = msg.slice(0, -2);
    alert(msg); // For demo; in real app, show modal or page
}
function submitForm() {
    // Collect form data
    const formData = {
        firstName: document.querySelector('input[placeholder="e.g. Aisha"]').value,
        lastName: document.querySelector('input[placeholder="e.g. Nakato"]').value,
        email: document.querySelector('input[type="email"]').value,
        phone: document.querySelector('input[type="tel"]').value,
        subject: document.querySelector('select').value,
        message: document.querySelector('textarea').value,
        timestamp: new Date().toISOString()
    };
    // Store in localStorage (in real app, send to server)
    let submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    // Clear form
    document.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
    showToast('&#9989; Message sent! We\'ll reply within 24 hours.');
}

// Initialize cart count on load
updateCartCount();