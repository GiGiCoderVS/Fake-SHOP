"use strict"

const NAME_CART = "gigihorseaseacodefave12tyvm8"
const addCardButtons = document.querySelectorAll(".cart-add-to")
const cartClear = document.getElementById("cart-clear")
const cartOpen = document.getElementById("cart-open")
const cartBody = document.getElementById("cart-body")
const cartAmount = document.getElementById("cart-amount")

addCardButtons.forEach(btn => {
    btn.addEventListener("click", event => {
        addToCart(event)
        checkerProduct()
        setCartAmount()
    })
})
cartClear.addEventListener("click", () => {
    clearCart()
    renderCart(cartBody)
    checkerProduct()
    setCartAmount()
})
cartOpen.addEventListener("click", () => {
    renderCart(cartBody)
})

checkerProduct()
setCartAmount()

//writing the data into local storage
const setCartData = data => {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(NAME_CART, jsonData)
    return false
}
//get data from localStorage to
function getCartData() {
    const jsonData = localStorage.getItem(NAME_CART)
    return JSON.parse(jsonData)
}

//deleting data ;-( from localStorage
function clearCart() {
    localStorage.removeItem(NAME_CART)
}

function deleteItemCart(event) {
    event.target.disabled = true
    const cartData = getCartData()
    delete cartData[event.target.dataset.product_id]
    event.target.disabled = setCartData(cartData)
    renderCart(cartBody)
    checkerProduct()
    setCartAmount()
}
//add product to the carttttt

function addToCart(event) {
    const btn = event.target
    btn.disabled = true
    const cartData = getCartData() || {}
    const productID = btn.dataset.product_id
    const productTitle = btn.parentElement.querySelector("h5.card-title").textContent
    const productPrice = btn.parentElement.querySelector("span.card-price").textContent
    const productImage = btn.parentElement.parentElement.querySelector("img").src

    cartData[productID] = {
        title: productTitle,
        price: +productPrice,
        image: productImage,
    }
    btn.disabled = setCartData(cartData)
}
//__________rendering da cart______________
function renderCart(cartBody) {
    let totalPrice = 0
    const cartData = getCartData()
    let cartContent = ''
    if (cartData === null || Object.keys(cartData).length === 0) {
        cartContent = `<h1 class="modal-title fs-5">Your cart? is empty</h1>`
    } else {
        cartContent = `
        <table class="table table-secondary">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col" class="cart-box-img">Image</th>
                    <th scope="col">Deleting</th>
                </tr>
            </thead>
            <tbody>
            `;
        for (const productID in cartData) {
            const product = cartData[productID]
            cartContent += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td class="cart-box-img" style="width: 30%;">
                    <img  src="${product.image}" class="cart-img" alt="${product.title}">
                </td>
                <td>
                    <button data-product_id="${productID}" onclick='deleteItemCart(event)' type="button" class="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
            `;
            totalPrice += +product.price 
        }
        cartContent += `</tbody></table>`
        cartContent += `
        <div>
            Total price is ${totalPrice}
        </div>
        `
    }    
    cartBody.innerHTML = cartContent
}

//is added item to cart(function)?
function checkerProduct() {
    const cartData = getCartData()
    addCardButtons.forEach(btn => {
        if (cartData && cartData.hasOwnProperty(btn.dataset.product_id)) {
            btn.textContent = "Added to cart"
            btn.className = "btn btn-success"
        } else {
            btn.textContent = "Add to cart"
            btn.className = "btn btn-danger"
        }
    })
}

//counting amount of cart
function setCartAmount() {
    const cartData = getCartData()
    cartAmount.textContent = cartData ? Object.keys(cartData).length : 0
}