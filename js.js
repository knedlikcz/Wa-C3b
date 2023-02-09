class Car {
    constructor(id, brand, model, year, color, price) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
    }
}

let cars = [
    {
        id: 1,
        brand: "BMW",
        model: "X5",
        year: 2019,
        color: "black",
        price: 50000
    },
    {
        id: 2,
        brand: "Mercedes",
        model: "C200",
        year: 2018,
        color: "white",
        price: 40000
    },
    {
        id: 3,
        brand: "Audi",
        model: "A6",
        year: 2017,
        color: "red",
        price: 30000
    }
];
function addCar(car) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", car.id);
    tr.setAttribute("class", "car");
    let tdId = document.createElement("th");
    tdId.setAttribute("scope", "row");
    tdId.innerHTML = car.id;
    let tdBrand = document.createElement("td");
    tdBrand.setAttribute("class", "brand");
    tdBrand.innerHTML = car.brand;
    let tdModel = document.createElement("td");
    tdModel.setAttribute("class", "model");
    tdModel.innerHTML = car.model;
    let tdYear = document.createElement("td");
    tdYear.setAttribute("class", "year");
    tdYear.innerHTML = car.year;
    let tdColor = document.createElement("td");
    tdColor.setAttribute("class", "color");
    tdColor.innerHTML = car.color;
    let tdPrice = document.createElement("td");
    tdPrice.setAttribute("class", "price");
    tdPrice.innerHTML = car.price;
    let tdButtons = document.createElement("td");
    let btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn btn-danger delete");   
    btnDelete.innerHTML = "Delete";
    let btnEdit = document.createElement("button");
    btnEdit.setAttribute("class", "btn btn-warning edit");
    btnEdit.innerHTML = "Edit";
    tdButtons.appendChild(btnDelete);
    tdButtons.appendChild(btnEdit);
    tr.appendChild(tdId);
    tr.appendChild(tdBrand);
    tr.appendChild(tdModel);
    tr.appendChild(tdYear);
    tr.appendChild(tdColor);
    tr.appendChild(tdPrice);
    tr.appendChild(tdButtons);
    document.getElementById("cars").appendChild(tr);

}

function addCars(cars) {
    for (let i = 0; i < cars.length; i++) {
        addCar(cars[i]);
    }
}
addCars(cars);

document.getElementById("add-car").addEventListener("click", function () {
    let id = cars.length + 1;
    let brand = prompt("Enter brand");
    let model = prompt("Enter model");
    let year = prompt("Enter year");
    let color = prompt("Enter color");
    let price = prompt("Enter price");
    let car = {
        id: id,
        brand: brand,
        model: model,
        year: year,
        color: color,
        price: price
    };
    cars.push(car);
    addCar(car);
});

document.getElementById("search").addEventListener("keyup", function () {
    let search = document.getElementById("search").value;
    let cars = document.getElementsByClassName("car");
    for (let i = 0; i < cars.length; i++) {
        let brand = cars[i].children[1].innerHTML;
        let model = cars[i].children[2].innerHTML;
        if (brand.toLowerCase().indexOf(search.toLowerCase()) > -1 || model.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            cars[i].style.display = "";
        } else {
            cars[i].style.display = "none";
        }
    }
});

document.getElementById("cars").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        let id = e.target.parentElement.parentElement.children[0].innerHTML;
        let index = cars.findIndex(function (car) {
            return car.id == id;
        });
        cars.splice(index, 1);
        e.target.parentElement.parentElement.remove();
    }
});

document.getElementById("cars").addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
        let id = e.target.parentElement.parentElement.children[0].innerHTML;
        let index = cars.findIndex(function (car) {
            return car.id == id;
        });
        let brand = prompt("Enter brand");
        let model = prompt("Enter model");
        let year = prompt("Enter year");
        let color = prompt("Enter color");
        let price = prompt("Enter price");
        let car = {
            id: id,
            brand: brand,
            model: model,
            year: year,
            color: color,
            price: price
        };
        cars[index] = car;
        e.target.parentElement.parentElement.children[1].innerHTML = brand;
        e.target.parentElement.parentElement.children[2].innerHTML = model;
        e.target.parentElement.parentElement.children[3].innerHTML = year;
        e.target.parentElement.parentElement.children[4].innerHTML = color;
        e.target.parentElement.parentElement.children[5].innerHTML = price;
    }
});

document.getElementById("add-car").addEventListener("click", function () {
    let carsInLocalStorage = JSON.parse(localStorage.getItem("cars"));
    if (carsInLocalStorage) {
        if (cars.length > carsInLocalStorage.length) {
            localStorage.setItem("cars", JSON.stringify(cars));
        }
    } else {
        localStorage.setItem("cars", JSON.stringify(cars));
    }
});

window.addEventListener("load", function () {
    let cars = JSON.parse(localStorage.getItem("cars"));
    if (cars) {
        for (let i = 3; i < cars.length; i++) {
            addCar(cars[i]);
        }
    }
});
