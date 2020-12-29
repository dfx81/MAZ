let list = document.getElementById("list");

let data = {
  0: {
    itemId: "TGX5001",
    name: "Turbo Exhaust GX-5 Series 1",
    quantity: 5,
    shelf: 1,
    category: "Exhaust",
    description: "A new exhaust from Turbo GX brand",
    image: "images/search.png"
  },
  1: {
    itemId: "NTGLRWS001",
    name: "Anti-Glare Windshield Model 1",
    quantity: 20,
    shelf: 1,
    category: "Mirror",
    description: "A new windshield that protects you from glares",
    image: "images/search.png"
  },
  2: {
    itemId: "NTGLRWS001",
    name: "Anti-Glare Windshield Model 1",
    quantity: 10,
    shelf: 2,
    category: "Mirror",
    description: "A new windshield that protects you from glares",
    image: "images/search.png"
  }
};

refreshList();

function refreshList() {

if (Object.keys(data).length != 0) {
  list.innerHTML = "";
  
  for (key of Object.keys(data)) {
    let nextItem = "";
    nextItem +=
      "<div class='list-item'>"
      + "<img class='item-img' src='" + data[key].image + "'></img>"
      + "<div onclick='showDet(\"" + key + "\")' class='overview'>"
      +   "<p>" + data[key].name + "</p>"
      +   "<small>" + data[key].quantity + " parts left</small></div><div class='admin-controls'>";
    
    if (data[key].quantity <= 10) {
      nextItem += "<img onclick='restock(" + key + ")' class='ctrl-btn' src='images/restock.png'></img>";
    }
    
    nextItem +=
      "<img onclick='showEdit(\"" + key + "\")' class='ctrl-btn' src='images/spanner.png'></img>"
      + "<img onclick='remove(" + key + ")' class='ctrl-btn' src='images/minus.png'></img></div></div>";
    
    list.innerHTML += nextItem;
  }
}
}

function show(element) {
  document.getElementsByClassName("shown")[0].classList.remove("shown");
  document.getElementById(element).classList.add("shown");
  
  if (element == "list")
    title = "Stock";
  else
    title = "";
  
  document.getElementById("page-name").innerHTML = title;
}

function showDet(item) {
  document.getElementById("page-name").innerHTML = "";
  
  show("detail");
  document.getElementById("det-img").src = data[item].image;
  document.getElementById("det-name").innerHTML = data[item].name;
  document.getElementById("det-shelf").innerHTML = "Shelf " + data[item].shelf;
  document.getElementById("det-qtty").innerHTML = data[item].quantity + " parts left";
  document.getElementById("det-desc").innerHTML = data[item].description;
  
  let detBtn = document.getElementById("det-rs-btn");
  
  detBtn.addEventListener("click", function() {
    restock(item);
  });
  
  if (data[item].quantity <= 10)
    detBtn.disabled = false;
  else detBtn.disabled = true;
}

function remove(key) {
  let sure = confirm("Are you sure you want to delete this item?");
  
  if (sure) {
    delete data[key];
    refreshList();
  }
}

function add() {
  let key = String(Object.keys(data).length);
  
  let newItem = {
    name: document.getElementById("add-name").value,
    itemId: document.getElementById("add-id").value,
    quantity: document.getElementById("add-qtty").value,
    description: document.getElementById("add-info").value,
    category: document.getElementById("add-cat").value,
    shelf: document.getElementById("add-shelf").value,
    image: "images/search.png"
  }
  
  for (key of Object.keys(data)) {
    if (data[key].itemId == newItem.itemId && data[key].shelf == newItem.shelf) {
      alert("Item already existed on the shelf");
      
      return;
    }
  }
  
  data[key] = newItem;
  
  document.getElementById("add-name").value = null;
  document.getElementById("add-id").value = null;
  document.getElementById("add-qtty").value = null;
  document.getElementById("add-info").value = null;
  document.getElementById("add-cat").value = null;
  document.getElementById("add-shelf").value = null;
  
  refreshList();
  
  show("list");
}

let select = null;

function showEdit(key) {
  document.getElementById("page-name").innerHTML = "Edit Item";
  select = key;
  document.getElementById("edit-name").value = data[select].name;
  document.getElementById("edit-info").value = data[select].description;
  document.getElementById("edit-shelf").value = data[select].shelf;
  
  show("edit");
}

function edit() {
  data[select].name = document.getElementById("edit-name").value;
  data[select].description = document.getElementById("edit-info").value;
  data[select].shelf = document.getElementById("edit-shelf").value;
  
  refreshList();
  show("list");
}

function restock(key) {
  let qtty = prompt("How much do you want to restock?");
  
  if (qtty != null && qtty >= 0) {
    data[key].quantity = parseInt(qtty) + parseInt(data[key].quantity);
    
    refreshList();
    show("list");
  }
}

function loadNoti() {
  show("noti");
  
  let noti = document.getElementById("noti");
  let found = false;
  let notiLs = "";
  
  for (key of Object.keys(data)) {
    if (data[key].quantity <= 10) {
      notiLs +=
      "<div onclick='showDet(" + key + ")'><img src='" + data[key].image + "'></img>"
      + "<p>" + data[key].name + " in Shelf " + data[key].shelf + " is running out</p></div>";
      
      found = true;
    }
  }
  
  if (found) noti.innerHTML = notiLs;
}