const orders = document.getElementById("orders");
const backendAPI = "http://localhost:3000";

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${backendAPI}/orders`)
    .then(({ data }) => listOrders(data))
    .catch((err) => console.log(err));
});

function listOrders(ordersData) {
  console.log(ordersData);

  ordersData.forEach(
    ({ id, title, imageUrl, price, orderitem: { quantity } }) => {
      const item = document.createElement("div");
      item.className = "order";

      item.innerHTML = `<img src=${imageUrl} />
      <p class='orderitem-name'>${title}</p>
      <p class='orderitem-id'>ID: ${id}</p>
      <input class='orderitem-qty' type='number' value=${quantity} />
      <p class='orderitem-price'>$${price}</p>`;

      orders.appendChild(item);
    }
  );
}
