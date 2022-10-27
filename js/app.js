import { menuArray } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let orderList = [] //stores orders as objects

renderMenu()

//General Event Listener
document.addEventListener('click', function(event){
    //*****Why is 'menuitem' working but not 'menuItem'?*****
    if(event.target.dataset.menuitem){
        handleAddMenuItem(event.target.dataset.menuitem)
        renderOrder()
    }
    //Event Listener for the remove button on each order item
    else if(event.target.dataset.remove){
        handleRemoveMenuItem(event.target.dataset.remove)
    }
    else if(event.target.id === 'complete-order'){
        renderModal()
    }
})
document.getElementById('payment-form').addEventListener('submit', function(event){
    event.preventDefault()
    submitPayment()
})

//Adds menu items to the orderList array
function handleAddMenuItem(item){
    let name = menuArray[item].name
    let price = menuArray[item].price
    // let itemAmount
    let id = uuidv4()

    orderList.push({name, price, id})
}
//Removes menu items from the orderList array
function handleRemoveMenuItem(item){

    // for (let list of orderList){
    //     if(list.id === item){
    //         orderList.splice(list, 1)
    //         renderOrder()
    //     }
    // }

    //*****Not sure how to transfer the code below to a 'for of' loop*****

    for (let i = 0; i < orderList.length; i++){
        if(orderList[i].id === item){
            orderList.splice(i, 1)
            renderOrder()
        }
    }
    renderOrder()
}

//Loops through orderList array and generates all the orders added
function getOrderItems(){
    let orderItem = ''
    orderList.forEach(function(list){
        orderItem += `
        <div class="order-item">
            <div class="order-item-name">
                <h2>${list.name} </h2>
                <button class="remove" data-remove="${list.id}">remove</button>
            </div>
            <p>$${list.price}</p>
        </div>
    `
    })
   return orderItem
}

// Loops through the menuArray and generates the all the menu items
function menuBoard(){
    let menuItems = ''

    menuArray.forEach(function(menu){
    menuItems += `
    <div class="menu-item">
        <div class="menu-container">
            <p class="emoji">${menu.emoji}</p>
            <div class="menu-description" >
                <h2>${menu.name}</h2>
                <p>${menu.ingredients}</p>
                <p>$${menu.price}</p>
            </div>
        </div>
        <button data-menuitem="${menu.id}" class="add-btn">+</button>
    </div>`
    })
    return menuItems

}

// Creates the order board structure showing order total, items, and complete order button
function orderBoard(){
    let currentOrder = ''
    if(getTotalPriceOfItems() > 0){
        currentOrder = `
        <h2>Your Order</h2>
        <div class="order-list">
            ${getOrderItems()}
        </div>

        <div class="order-total">
            <h2>Total price:</h2>
            <p>$${getTotalPriceOfItems()}</p>
        </div>
        <button id="complete-order" class="btn">Complete order</button>
        `
    }
    else{
        currentOrder = ''
    }
    return currentOrder
}

//Adds the total cost of the order items added to the orderList array
function getTotalPriceOfItems(){
    let total = 0
    orderList.forEach(function(list){
        total += Number(list.price)
    })
    return total
}

//Sends strings to the HTML doc
function renderMenu(){
    document.getElementById('menu-board').innerHTML = menuBoard()
}

function renderOrder(){
    document.getElementById('order-board').innerHTML = orderBoard()
}

function renderModal(){
    document.getElementById('modal').style.display = "inline"
    document.getElementById('name').value = ''
    document.getElementById('ccn').value = ''
    document.getElementById('card-cvv').value = ''

}

function submitPayment(){
    document.getElementById('modal').style.display = "none"

    orderList = []

    const formName = document.getElementById('name').value

    document.getElementById('order-board').innerHTML = `
        <div class="thank-you-message">
            <p >Thanks, ${formName}! Your order is on its way!</p>
        </div>

    `
}


