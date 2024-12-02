let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let totalPriceElement = document.querySelector(".total-price"); // Mengambil elemen total harga

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "VELG KINGSPEED",
    image: "Cart 1.jpeg",
    price: 15000000,
  },
  {
    id: 2,
    name: "BILLED PRO7",
    image: "Cart 2.jpeg",
    price: 3000000,
  },
  {
    id: 3,
    name: "SPION CLICK ALL MATIC",
    image: "Cart 3.jpeg",
    price: 150000,
  },
  {
    id: 4,
    name: "SHOCK OHLINS",
    image: "Cart 4.jpeg",
    price: 9300000,
  },
  {
    id: 5,
    name: "JOK MOBIL KULIT",
    image: "Cart 5.jpeg",
    price: 1200000,
  },
  {
    id: 6,
    name: "VELG SAMLONG",
    image: "Cart 6.jpeg",
    price: 12000000,
  },
  {
    id: 7,
    name: "STOPLAMP INNOVA",
    image: "Cart 7.jpeg",
    price: 1300000,
  },
  {
    id: 8,
    name: "KAP FORTUNER",
    image: "Cart 8.jpeg",
    price: 5000000,
  },
];

let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
    list.appendChild(newDiv);
  });

  // Tombol CheckOut Work
  document
    .getElementsByClassName("total")[0]
    .addEventListener("click", checkOutButtonClicked);
}

// Tombol Beli
function checkOutButtonClicked() {
  alert("Pesananmu Akan Segera Diproses");

  // Menghapus semua item di keranjang belanja
  listCard.innerHTML = ""; // Menghapus seluruh konten di listCard

  // Reset jumlah total dan quantity menjadi 0
  total.innerText = "0";
  quantity.innerText = "0";

  // Reset daftar keranjang belanja setelah checkout
  listCards = []; // Mengosongkan listCards

  // Mengubah tulisan total menjadi "CheckOut" setelah checkout
  total.innerText = "CheckOut"; // Menampilkan "CheckOut" setelah checkout
  totalPriceElement.innerText = "0"; // Menampilkan total harga 0 setelah checkout
}

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice += value.price * value.quantity;
    count += value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src=${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;

  // Update total harga di bawah kiri
  totalPriceElement.innerText = totalPrice.toLocaleString(); // Memperbarui harga total
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

initApp();
