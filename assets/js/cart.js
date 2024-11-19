// Store data
const store = [
  {
    id: 1,
    title: "Classic Monochrome Tees",
    image: "./assets/images/garment/garment1.png",
    description: "Classic Monochrome Tees",
    status: "IN STOCK",
    price: 27.00
  },
  {
    id: 2,
    title: "Essential Neutrals",
    image: "./assets/images/garment/garment2.png",
    description: "Essential Neutrals",
    status: "IN STOCK",
    price: 22.00
  },
  {
    id: 3,
    title: "UTRAANET Black",
    image: "./assets/images/garment/garment3.png",
    description: "UTRAANET Black",
    status: "IN STOCK",
    price: 42.00
  },
  {
    id: 4,
    title: "Classic Monochrome Tees",
    image: "./assets/images/garment/garment4.png",
    description: "Classic Monochrome Tees",
    status: "IN STOCK",
    price: 35.00
  },
];

// Cart data
let cart = [];

// Elements
const productList = document.getElementById("product-list")
const cartList = document.getElementById("cart-list")

// Render products
function renderProducts() {

  if (productList) {
    productList.innerHTML = "";


    store.forEach((product) => {
      const productCard = document.createElement("div");

      productCard.innerHTML = `
        <div class="card-item-best-seller">
          <div class="card-item-img-best-seller">
            <img src="${product.image}" alt="${product.title}"/>
          </div>
          <div class="card-item-content-best-seller">
            <span class="card-item-content-description-best-seller">
                ${product.title}
            </span>
            <div class="card-item-container-tags-best-seller">
              <span class="card-item-content-tag-value-best-seller">
              ${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)}
              </span>
                <span class="card-item-content-tag1-best-seller add-to-cart"  data-id="${product.id}">
                Adicionar
              </span>
            </div>
          </div>
        </div>
    `;

      productList.appendChild(productCard);
    });
  }

}

// Render cart
function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.title}"/>
        </div>
        <div class="cart-item-details">
          <span class="cart-item-title">
            ${product.title}
          </span>
          <div class="cart-item-info">
            <span class="cart-item-price">
             ${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)}
            </span>
          </div>
        </div>
      </div>
    `;

    cartList.appendChild(cartItem);
  });
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Add to cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = parseInt(event.target.dataset.id);
    const product = store.find((item) => item.id === productId);

    if (product) {
      cart.push(product);
      saveCartToLocalStorage();
      renderCart();
    }
  }
});

// Remove from cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart")) {
    const productId = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productId);
    saveCartToLocalStorage();
    renderCart();
  }
});

// Initial load
loadCartFromLocalStorage();
renderProducts();
renderCart();
