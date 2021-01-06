let list = document.getElementById("list");

let data = {
  0: {
    itemId: "TGX5001",
    name: "Turbo Exhaust GX-5 Series 1",
    quantity: 5,
    shelf: 1,
    category: "Exhausts",
    description: "A new exhaust from Turbo GX brand",
    image: "images/Exhausts.png"
  },
  1: {
    itemId: "NTGLRWS001",
    name: "Anti-Glare Windshield Model 1",
    quantity: 20,
    shelf: 1,
    category: "Mirrors",
    description: "A new windshield that protects you from glares",
    image: "images/Mirrors.png"
  },
  2: {
    itemId: "NTGLRWS001",
    name: "Anti-Glare Windshield Model 1",
    quantity: 10,
    shelf: 2,
    category: "Mirrors",
    description: "A new windshield that protects you from glares",
    image: "images/Mirrors.png"
  },
  3: {
    itemId: "TGX3002",
    name: "Turbo Exhaust GX-3 Series 2",
    quantity: 7,
    shelf: 1,
    category: "Exhausts",
    description: "A cheaper exhaust from Turbo GX brand",
    image: "images/Exhausts.png"
  },
  4: {
    itemId: "RBR-001",
    name: "Road Rubber Tires Type-1",
    quantity: 34,
    shelf: 1,
    category: "Tires",
    description: "A cheap set of tires from Road Rubber brand",
    image: "images/Tires.png"
  },
  5: {
    itemId: "TLCK-V3",
    name: "Tirelock High Performance Brakes V-3",
    quantity: 17,
    shelf: 2,
    category: "Brakes",
    description: "A quality brake from Tirelock brand",
    image: "images/Brakes.png"
  },
  6: {
    itemId: "CC-01",
    name: "Car Comfort Leather Cushions Model 1",
    quantity: 13,
    shelf: 1,
    category: "Leathers",
    description: "A high quality seat replacement",
    image: "images/Leathers.png"
  },
  7: {
    itemId: "P4MZX32",
    name: "PER4MA Model ZX-32 Engine Swap",
    quantity: 7,
    shelf: 1,
    category: "Engines",
    description: "A new engine from PER4MA",
    image: "images/Engines.png"
  },
  8: {
    itemId: "LHL-2:LIME",
    name: "Lumen Headlights Model 2 (Lime)",
    quantity: 7,
    shelf: 2,
    category: "Lamps",
    description: "A lime coloured headlights",
    image: "images/Lamps.png"
  },
  9: {
    itemId: "AR-S-69",
    name: "Autosports Design 69 Rim Set (Small)",
    quantity: 50,
    shelf: 2,
    category: "Rims",
    description: "A two years old rim set from Autosports Design",
    image: "images/Rims.png"
  },
  10: {
    itemId: "AR-L-69",
    name: "Autosports Design 69 Rim Set (Large)",
    quantity: 50,
    shelf: 2,
    category: "Rims",
    description: "A two years old rim set from Autosports Design",
    image: "images/Rims.png"
  }
};

refreshList();

if (window.localStorage.passTut) {
  closeTut();
}

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
  } else {
    list.innerHTML = "There is no item here...";
  }
}

let refresh = true;

function show(element) {
  document.getElementsByClassName("shown")[0].classList.remove("shown");
  document.getElementById(element).classList.add("shown");
  
  
  let title = "";
  
  switch (element) {
    case "list":
      if (refresh) title = "Stock";
      else {
        title = "Search Results"
        refresh = true;
      }
      break;
    case "add":
      title = "Add New Item";
      break;
    case "noti":
      title = "Notifications";
      break;
    case "edit":
      title = "Edit Item";
      break;
    case "cat":
      title = "Select a Category"
      break;
    case "shelf":
      title = "Select a Shelf";
  }
  
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
  
  document.getElementById("btn-div").innerHTML = "<button disabled class='det-btn' id='det-rs-btn'>Restock</button>"
  
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
    image: "images/" + document.getElementById("add-cat").value + ".png"
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
  select = key;
  document.getElementById("edit-name").value = data[select].name;
  document.getElementById("edit-info").value = data[select].description;
  
  show("edit");
}

function edit() {
  data[select].name = document.getElementById("edit-name").value;
  data[select].description = document.getElementById("edit-info").value;
  
  refreshList();
  show("list");
}

function restock(key) {
  let qtty = prompt("How much do you want to restock?");
  
  if (!!qtty && qtty >= 0) {
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
      "<div class='noti-item' onclick='showDet(" + key + ")'><img src='" + data[key].image + "'></img>"
      + "<p>" + data[key].name + " in Shelf " + data[key].shelf + " is running out</p></div>";
      
      found = true;
    }
  }
  
  if (found) noti.innerHTML = notiLs;
  else noti.innerHTML = "There's no notifications...";
}

let shelf;

function search(cat) {
  shelf = {};
  
  for (key of Object.keys(data)) {
    if (data[key].category == cat) {
      if (shelf.hasOwnProperty(data[key].shelf)) {
        shelf[data[key].shelf][String(Object.keys(shelf[data[key].shelf]).length)] = key;
      }
      
      else {
        let shlfItm = {0: key};
        shelf[String(data[key].shelf)] = shlfItm;
      }
    }
  }
  
  let list;
  
  if (Object.keys(shelf).length != 0) {
    list = "";
  
    for (key of Object.keys(shelf)) {
      list += "<div class='result-item' onclick='dispSearch(\"" + key + "\")'>Shelf " + key + ": " + Object.keys(shelf[key]).length + " results</div>";
    }
  } else {
    list = "Item isn't available in any shelf...";
  }
  
  document.getElementById("shelf").innerHTML = list;
  show("shelf");
}

function dispSearch(no) {
  let dat = shelf[no];
  
  if (Object.keys(shelf).length != 0) {
    list.innerHTML = "";
  
    for (key of Object.keys(dat)) {
      let nextItem = "";
      nextItem +=
        "<div class='list-item'>" +
        "<img class='item-img' src='" + data[dat[key]].image + "'></img>" +
        "<div onclick='showDet(\"" + dat[key] + "\")' class='overview'>" +
        "<p>" + data[dat[key]].name + "</p>" +
        "<small>" + data[dat[key]].quantity + " parts left</small></div><div class='admin-controls'>";
  
      if (data[dat[key]].quantity <= 10) {
        nextItem += "<img onclick='restock(" + dat[key] + ")' class='ctrl-btn' src='images/restock.png'></img>";
      }
  
      nextItem +=
        "<img onclick='showEdit(\"" + dat[key] + "\")' class='ctrl-btn' src='images/spanner.png'></img>" +
        "<img onclick='remove(" + dat[key] + ")' class='ctrl-btn' src='images/minus.png'></img></div></div>";
  
      list.innerHTML += nextItem;
    }
  }
  
  refresh = false;
  show("list");
}

function back() {
  refreshList();
  show("list");
}

function closeTut() {
  document.getElementById("guide").style.display = "none";
  window.localStorage.passTut = "true";
}