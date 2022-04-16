const products = document.getElementById("products");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const totalPrice = document.getElementById("totalPrice");
const cartItems = document.getElementById("cartitems");
const cartBtn = document.getElementById("cartBtn");
const toastContainer = document.getElementById("toast-container");
const backendAPI = "http://localhost:3000";
const pagination = document.getElementById("pagination");

cartBtn.addEventListener("click", (e) => cart.classList.toggle("opened"));
closeCart.addEventListener("click", (e) => cart.classList.remove("opened"));

products.addEventListener("click", (e) => {
  if (e.target.className == "add-to-cart") {
    const product = e.target.parentElement.parentElement.parentElement;
    const imageUrl = product.querySelector(".product-image img").src;
    const title = product.querySelector(".product-name").innerText;
    const price = product.querySelector(".product-price").innerText;
    const id = product.id;

    axios
      .post(`${backendAPI}/cart`, { productId: id.slice(7) })
      .then((res) => {
        const product = res.data;
        addProductToCart(product);
        createNotification(`${product.title} added to your cart.`);
      })
      .catch((err) => console.log(err));
  }
});

function createNotification(text) {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = text;

  toastContainer.appendChild(notif);
  setTimeout(() => {
    notif.remove();
  }, 3000);
}

window.addEventListener("DOMContentLoaded", () => {
  const objUrlParams = new URLSearchParams(window.location.search);
  const page = objUrlParams.get("page") || 1;

  axios
    .get(`${backendAPI}/products?page=${page}`)
    .then(({ data: { products, ...pageData } }) => {
      listProducts(products);
      showPagination(pageData);
    })
    .catch((err) => console.log(err));

  axios
    .get(`${backendAPI}/cart`)
    .then((res) => res.data.products.forEach((p) => addProductToCart(p)))
    .catch((err) => console.log(err));
});

function listProducts(productsData) {
  console.log(productsData);
  productsData.forEach((product) => {
    const prod = document.createElement("div");
    prod.className = "product";
    prod.innerHTML = `<div class="product" id="product${product.id}">
    <div class="product-image">
      <img
        src=${product.imageUrl}
        alt=${product.title}
      />
    </div>
    <div class="product-info">
      <div class="product-top-row">
        <h3 class="product-name">${product.title}</h3>
        <p>&#9733;&#9733;&#9733;&#9733;</p>
      </div>
      <div class="product-bottom-row">
        <p class="product-price">$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  </div>`;

    products.appendChild(prod);
  });
}

function addProductToCart({
  id,
  title,
  imageUrl,
  price,
  cartitem: { quantity },
}) {
  const itemId = `cartitem-${id}`;
  const item = document.getElementById(itemId);

  if (item) {
    item.querySelector(".cartitem-qty").value = quantity;
  } else {
    const newItem = document.createElement("div");
    newItem.className = "cartitem";
    newItem.id = itemId;

    newItem.innerHTML += `<img src=${imageUrl} />`;
    newItem.innerHTML += `<p class='cartitem-name'>${title}</p>`;
    newItem.innerHTML += `<input class='cartitem-qty' type='number' value=${quantity} />`;
    newItem.innerHTML += `<p class='cartitem-price'>${price}</p>`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      const total = totalPrice.innerText;
      let qty = newItem.querySelector(".cartitem-qty").value;
      totalPrice.innerText = parseInt(total) - parseInt(price) * parseInt(qty);
      newItem.remove();
    });

    newItem.appendChild(removeBtn);
    cartItems.appendChild(newItem);
  }

  const total = totalPrice.innerText;
  totalPrice.innerText = parseInt(total) + parseInt(price);
}

function showPagination({
  currentPage,
  hasNextPage,
  nextPage,
  hasPreviousPage,
  previousPage,
  lastPage,
}) {
  let innerHTML = ``;

  if (currentPage !== 1 && previousPage !== 1)
    innerHTML += `<a href='?page=1'>1</a>`;
  if (hasPreviousPage)
    innerHTML += `<a href='?page=${previousPage}'>${previousPage}</a>`;
  innerHTML += `<a href='#' class='active'>${currentPage}</a>`;
  if (hasNextPage) innerHTML += `<a href='?page=${nextPage}'>${nextPage}</a>`;
  if (lastPage !== currentPage && lastPage !== nextPage)
    innerHTML += `<a href='?page=${lastPage}'>${lastPage}</a>`;

  pagination.innerHTML = innerHTML;
}
