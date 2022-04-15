const products = document.getElementById("products");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const totalPrice = document.getElementById("totalPrice");
const cartItems = document.getElementById("cartitems");
const cartBtn = document.getElementById("cartBtn");
const toastContainer = document.getElementById("toast-container");

cartBtn.addEventListener("click", (e) => (cart.style.display = "block"));
closeCart.addEventListener("click", (e) => (cart.style.display = "none"));

products.addEventListener("click", (e) => {
  console.dir(e.target);
  if (e.target.className == "add-to-cart") {
    const product = e.target.parentElement.parentElement.parentElement;
    const itemImg = product.querySelector(".product-image img").src;
    const itemName = product.querySelector(".product-name").innerText;
    const itemPrice = product.querySelector(".product-price").innerText;

    const newItem = document.createElement("div");
    newItem.className = "cartitem";

    newItem.innerHTML += `<img src=${itemImg} />`;
    newItem.innerHTML += `<p class='cartitem-name'>${itemName}</p>`;
    newItem.innerHTML += `<p class='cartitem-price'>${itemPrice}</p>`;

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      const total = totalPrice.innerText;
      totalPrice.innerText = parseInt(total) - parseInt(itemPrice.slice(1));
      newItem.remove();
    });
    newItem.appendChild(removeBtn);

    cartItems.appendChild(newItem);
    const total = totalPrice.innerText;
    totalPrice.innerText = parseInt(total) + parseInt(itemPrice.slice(1));

    createNotification(`${itemName} added to cart.`);
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
