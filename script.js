const products = document.getElementById("products");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const totalPrice = document.getElementById("totalPrice");
const cartItems = document.getElementById("cartitems");
const cartBtn = document.getElementById("cartBtn");
const toastContainer = document.getElementById("toast-container");

cartBtn.addEventListener("click", (e) => cart.classList.toggle('opened'));
closeCart.addEventListener("click", (e) => cart.classList.remove('opened'));

products.addEventListener("click", (e) => {
  console.dir(e.target);
  if (e.target.className == "add-to-cart") {
    const product = e.target.parentElement.parentElement.parentElement;
    const itemImg = product.querySelector(".product-image img").src;
    const itemName = product.querySelector(".product-name").innerText;
    const itemPrice = product.querySelector(".product-price").innerText;

    const itemId = `cartitem-${removeSpaces(itemName)}`;
    const item = document.getElementById(itemId);
    console.log(item);

    if (item) {
      const itemQty = item.querySelector(".cartitem-qty");
      let qty = itemQty.value;
      itemQty.value = parseInt(qty) + 1;
      createNotification(`Another ${itemName} added to cart.`);
    } else {
      const newItem = document.createElement("div");
      newItem.className = "cartitem";
      newItem.id = itemId;

      newItem.innerHTML += `<img src=${itemImg} />`;
      newItem.innerHTML += `<p class='cartitem-name'>${itemName}</p>`;
      newItem.innerHTML += `<input class='cartitem-qty' type='number' value='1' />`;
      newItem.innerHTML += `<p class='cartitem-price'>${itemPrice}</p>`;

      const removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", () => {
        const total = totalPrice.innerText;
        let qty = newItem.querySelector(".cartitem-qty").value;
        totalPrice.innerText = parseInt(total) - parseInt(itemPrice.slice(1)) * parseInt(qty);
        newItem.remove();
      });

      newItem.appendChild(removeBtn);
      cartItems.appendChild(newItem);
      createNotification(`${itemName} added to your cart.`);
    }

    const total = totalPrice.innerText;
    totalPrice.innerText = parseInt(total) + parseInt(itemPrice.slice(1));
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

function removeSpaces(text) {
  let t = text.toLowerCase();
  return t.split(" ").join("-");
}
