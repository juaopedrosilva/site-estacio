// Store data
const store = [
  {
    id: 1,
    title: "Camisetas Monocromáticas Clássicas",
    image: "./assets/images/garment/garment1.png",
    description: "Camisetas Monocromáticas Clássicas",
    status: "EM ESTOQUE",
    price: 27.00
  },
  {
    id: 2,
    title: "Neutros Essenciais",
    image: "./assets/images/garment/garment2.png",
    description: "Neutros Essenciais",
    status: "EM ESTOQUE",
    price: 22.00
  },
  {
    id: 3,
    title: "UTRAANET Preto",
    image: "./assets/images/garment/garment3.png",
    description: "UTRAANET Preto",
    status: "EM ESTOQUE",
    price: 42.00
  },
  {
    id: 4,
    title: "Camisetas Monocromáticas Clássicas",
    image: "./assets/images/garment/garment4.png",
    description: "Camisetas Monocromáticas Clássicas",
    status: "EM ESTOQUE",
    price: 35.00
  },
  {
    id: 5,
    title: "Camiseta Estampa Tropical",
    image: "./assets/images/garment/garment5.png",
    description: "Camiseta com estampa tropical vibrante",
    status: "EM ESTOQUE",
    price: 30.00
  },
  {
    id: 6,
    title: "Camiseta Oversized Branca",
    image: "./assets/images/garment/garment6.png",
    description: "Camiseta oversized confortável e moderna",
    status: "EM ESTOQUE",
    price: 25.00
  },
  {
    id: 7,
    title: "Camiseta Estilo Vintage",
    image: "./assets/images/garment/garment7.png",
    description: "Camiseta com design retrô e único",
    status: "EM ESTOQUE",
    price: 40.00
  },
  {
    id: 8,
    title: "Camiseta Básica Preta",
    image: "./assets/images/garment/garment8.png",
    description: "Camiseta preta básica para o dia a dia",
    status: "EM ESTOQUE",
    price: 20.00
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
    cartList.innerHTML = "<p>Carinho vazio.</p>";
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
              <button data-id="${product.id}" class="remove-from-cart">
                Remover
              </button>
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
