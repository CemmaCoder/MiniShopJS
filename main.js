// Creamos la clase
class Product {
    constructor(id, name, color, model, price, img){
        this.id = id;
        this.name = name;
        this.color = color;
        this.model = model;
        this.price = price;
        this.img = img;
        this.amount = 1;
    }
}

// ----------------------------------------------------------------------------------------------------------------------------

// Agregamos los productos
const nike1 = new Product(1, "Nike Air Max", "Blancas con Rojo", "Running",  43.999, "img/nikeAirMax.png");
const nike2 = new Product(2, "Nike Downshifter", "Negras", "Running",  27.599, "img/nikeDownshifter.png");
const nike3 = new Product(3, "Nike Renew Run", "Rosa con Amarillo", "Running",  44.999, "img/nikeRenewRun.png");
const nike4 = new Product(4, "Nike Revolution", "Negras", "Running",  23.999, "img/nikeRevolution.png");
const nike5 = new Product(5, "Nike Air Force", "Blancas", "Urban", 39.999, "img/nikeAirForce.png");
const nike6 = new Product(6, "Nike Air Jordan" , "Azules", "Urban", 64.999, "img/nikeAirJordan.png");
const nike7 = new Product(7, "Nike Air Sneakers", "Naranja", "Urban", 119.999 , "img/nikeAirSneakers.png");
const nike8 = new Product(8, "Nike Skateboarding", "Grises", "Urban", 79.999, "img/nikeSkateboarding.png");

// ----------------------------------------------------------------------------------------------------------------------------

// Creamos el array con nuestro catalogo de productos
const products = [nike1, nike2, nike3, nike4, nike5, nike6, nike7, nike8];

// ----------------------------------------------------------------------------------------------------------------------------


// Creamo el array para el carrito de compras
let cart = [];

if(localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"));
}

// ----------------------------------------------------------------------------------------------------------------------------

// DOM
const divProducts = document.getElementById("divProducts");

// ----------------------------------------------------------------------------------------------------------------------------

// Funcion para mostrar productos
const viewProducts = () =>{
    products.forEach((product) =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top imgProducts" alt="${product.name}">
                <div class="card-body">
                <h5 class="card-title"><center>${product.name}</center></h5>
                <hr>
                <p class="card-text"> <b>Estilo:</b> ${product.model}</p>
                <p class="card-text"> <b>Color:</b> ${product.color}</p>
                <p class="card-text"> <b>Precio:</b> $${product.price}</p>
                <hr>
                <center><button class="btn colorBoton" id="boton${product.id}"> AGREGAR AL CARRITO </button></center>
                </div>
            </div>            
        `
        divProducts.appendChild(card);


// Agregar productos al carrito
        const boton = document.getElementById(`boton${product.id}`);
        boton.addEventListener("click", () =>{
            addToCart(product.id)
        })
    })
}

// ----------------------------------------------------------------------------------------------------------------------------

// Funcion agregar al carrito
const addToCart = (id) => {
    const product = products.find((product) => product.id === id);
    const productCart = cart.find((product) => product.id === id);
    if(productCart){
        productCart.amount++;
    }else{
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    showTotal();
    showCart();
}

viewProducts();

// ----------------------------------------------------------------------------------------------------------------------------

// Mostramos el carrito
const divCart = document.getElementById("divCart");
const viewCart= document.getElementById("viewCart");

viewCart.addEventListener("click", ()=> {
    showCart();
});

// ----------------------------------------------------------------------------------------------------------------------------

// Funcion para mostrar carrito
const showCart = () =>{
    divCart.innerHTML="";
    cart.forEach((product) =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${product.img}" class="card-img-top imgProducts" alt="${product.name}">
                <div class="card-body">
                <h5 class="card-title"><center>${product.name}</center></h5>
                <hr>
                <p class="card-text"> <b>Estilo:</b> ${product.model}</p>
                <p class="card-text"> <b>Color:</b> ${product.color}</p>
                <p class="card-text"> <b>Precio:</b> $${product.price}</p>
                <p class="card-text"> <b>Cantidad:</b> ${product.amount}</p>
                <hr>
                <center><button class="btn colorBoton" id="eliminar${product.id}">Eliminar Producto </button></center>
                </div>
            </div>            
        `
        divCart.appendChild(card);

// Eliminar productos del carrito
        const boton = document.getElementById(`eliminar${product.id}`);
        boton.addEventListener("click", () => {
            deleteCart(product.id);
        })
    })
    showTotal();
}

// ----------------------------------------------------------------------------------------------------------------------------

// Funcion que elimina el producto del carrito
const deleteCart = (id) => {
    const deleteProduct = cart.find((product) => product.id === id);
    const index = cart.indexOf(deleteProduct);
    cart.splice(index,1);
    showCart();

    localStorage.setItem("cart", JSON.stringify(cart));
}

// ----------------------------------------------------------------------------------------------------------------------------

// Vaciar carrito de compras
const emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", () =>{
    emptyAllCart();
})

// Funcion para vaciar el carrito
const emptyAllCart = () =>{
    cart = [];
    showCart();

    localStorage.clear();
}

// ----------------------------------------------------------------------------------------------------------------------------

// Mostrar total

const total = document.getElementById("total");

const showTotal = () => {
    let totalBuy = 0;
    cart.forEach((product) =>{
        totalBuy += product.price * product.amount;
    })
    total.innerHTML = ` $${totalBuy.toFixed(3)}`;
}
