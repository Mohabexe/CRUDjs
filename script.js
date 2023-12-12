let title = document.getElementById("name");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode = "Add";

function getTotal() {
  var price = document.getElementById("price").value;
  var taxes = document.getElementById("taxes").value;
  var ads = document.getElementById("ads").value;
  var discount = document.getElementById("discount").value;

  if (price != "") {
    var totalValue =
      Number(price) + Number(taxes) + Number(ads) - Number(discount);
    document.getElementById("total").innerHTML = totalValue;
  } else {
    document.getElementById("total").innerHTML = "";
  }
}

let data;
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}
submit.onclick = function () {
  let obj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    quantity: quantity.value,
    category: category.value,
  };
  if (
    obj.title == "" ||
    obj.price == "" ||
    obj.taxes == "" ||
    obj.ads == "" ||
    obj.total == "" ||
    obj.quantity > 100 ||
    obj.category == ""
  ) {
    alert("All fields are required");
    return;
  } else {
    if (mode == "Add") {
      if (obj.quantity > 1) {
        for (let i = 0; i < obj.quantity; i++) {
          data.push(obj);
        }
      } else {
        data.push(obj);
      }
    } else {
      data.push(obj);
      mode = "Add";
      submit.innerHTML = "Add";
    }
  }
  localStorage.setItem("product", JSON.stringify(data));
  clearData();
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  quantity.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `<tr>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].quantity}</td>
            <td>${data[i].category}</td>
            <td><button onclick="editData(${i})">Edit</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  let converts = document.getElementById("converts");
  if (data.length > 0) {
    btnDelete.innerHTML = `<button style="background-color: #6d0202" onclick="deleteAll()">Delete All(${data.length})</button>`;
    converts.innerHTML = `
                <button type="button" id="btnDownloadCsv">Download CSV</button>
            `;
  } else {
    btnDelete.innerHTML = "";
    converts.innerHTML = "";
  }
}

function deleteData(index) {
  data.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(data));
  showData();
}

function editData(index) {
  let obj = data[index];
  title.value = obj.title;
  price.value = obj.price;
  taxes.value = obj.taxes;
  ads.value = obj.ads;
  discount.value = obj.discount;
  quantity.value = obj.quantity;
  total.innerHTML = obj.total;
  category.value = obj.category;
  submit.innerHTML = "Update";
  data.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(data));
  showData();
  mode = "Edit";
}

function deleteAll() {
  localStorage.clear();
  data = [];
  showData();
}

let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
  } else if (id == "searchCategory") {
    searchMode = "category";
  }
  search.placeholder = "Search by " + searchMode;
  search.focus();
  search.value = "";
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].quantity}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="editData(${i})">Edit</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `<tr>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].quantity}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick="editData(${i})">Edit</button></td>
                        <td><button onclick="deleteData(${i})">Delete</button></td>
                        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

const csvData = json2csv.parse(data);

console.log(csvData);