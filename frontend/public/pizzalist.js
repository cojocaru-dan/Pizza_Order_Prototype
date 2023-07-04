// const filePath = require("../../path.js");
// console.log(filePath);
const rootElement = document.getElementById("root");
let localPizzaData = [];
let checkedAllergens = [];
let pizzaOrders = [];
let date = new Date();
let orderObject = {
	id: "",
	pizzas: [],
	date: {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes()
	},
	customer: {
		name: "",
		email: "",
		address: {
            city: "",
            street: ""
		}
	}
}

const addElement = function(tag, innerText, id) {
    if (tag === "input") {
        return `<${tag} type="checkbox" id=${id} value="${innerText}">`;
    } else if (tag === "label") {
        return `<${tag} for=${id}>${innerText}</${tag}>`;
    }
    
};

function inputEvent(event) {
    if (event.target.checked) {
        checkedAllergens.push(event.target.value);
    } else {
        checkedAllergens = checkedAllergens.filter((checkedAll) => checkedAll !== event.target.value);
    }
    // remove already displayed pizzas
    document.querySelectorAll(".pizzaDetails").forEach(displayedPizza => displayedPizza.remove());

    //insert pizza by allergens
    for (const pizza of localPizzaData) {
        let isWithoutAllergens = true;
        for (const checkedAllergen of checkedAllergens) {
            if (pizza.allergens.includes(checkedAllergen)) {
                isWithoutAllergens = false;
            }
        }
        if (isWithoutAllergens) {
            rootElement.insertAdjacentHTML("beforeend", pizzaDiv(pizza));
        }     
    }
}

function pizzaDiv({id, name, ingredients, price, allergens}) {
    const ingredientsDD = ingredients.map((ingredient) => `<dd>${ingredient}</dd>`).join('');
    const allergensDD = allergens.map((allergen) => `<dd>${allergen}</dd>`).join('');
    return `<div class="pizzaDetails">
                <dl>
                    <dt>Id</dt>
                    <dd>${id}</dd>
                    <dt>Name</dt>
                    <dd>${name}</dd>
                    <dt>Ingredients</dt>
                    ${ingredientsDD}
                    <dt>Price</dt>
                    <dd>${price}</dd>
                    <dt>Allergens</dt>
                    ${allergensDD}
                </dl>
                <div class="amount-order">
                    <input type="number" placeholder="amount">
                    <button class="add-button" id=${id}>Add to order</button>
                </div>
            </div>`
}

async function fetchPizza() {
    const pizzaFile = await fetch("/api/pizza");
    console.dir(pizzaFile);
    const pizzaData = await pizzaFile.json();
    return pizzaData;
}

async function fetchAllergens() {
    const allergensFile = await fetch("/api/allergen");
    const allergensData = await allergensFile.json();
    return allergensData;
}

function addToOrder(event){
    let idFunc = Number(event.target.id);
    let pizzasInObject = orderObject.pizzas;
    let isAlreadyInList = false;

    pizzaOrders.push(localPizzaData[idFunc - 1])

    // console.log("pizza ordersa array", pizzaOrders);
    // console.log("orders object", orderObject);


    for (let i = 0; i < pizzasInObject.length; i++) {
        if(pizzasInObject[i].id === idFunc){
            isAlreadyInList = true;
            pizzasInObject[i].amount++;
            break;
        }
    }

    if(!isAlreadyInList){
        pizzasInObject.push(
            {
            id: idFunc,
            amount: 1
            }
        )
    }   
    // console.log("orderObject.pizzas", pizzasInObject);
    // console.log(orderObject);
    if(pizzaOrders.length > 0){
        form.removeAttribute("hidden"); 
    }

}

async function getBasket(){
    let orders = await fetch("/api/order");
    let ordersData = await orders.json();
    console.log(ordersData);
}

async function main() {
    let pizzaData = await fetchPizza();
    let allergensData = await fetchAllergens();

    rootElement.insertAdjacentHTML("beforeend", "<button id='basket'>Basket</button>");
    document.getElementById("basket").addEventListener("click", getBasket);

    for (let i = 0; i < allergensData.length; i++) {
        let input = addElement("input", allergensData[i].name, i+1);
        let label = addElement("label", allergensData[i].name, i+1);
        // console.log(label);
        // console.log(input);
        rootElement.insertAdjacentHTML("beforeend", input);
        rootElement.insertAdjacentHTML("beforeend", label);
        
    }

    const allergenInputs = document.querySelectorAll("input[type=checkbox]");
    allergenInputs.forEach((allergenInp) => allergenInp.addEventListener("click", inputEvent));

    // get the name of the allergens from their number
    // console.log(pizzaData);
    // console.log(allergensData);
    for (let i = 0; i < pizzaData.length; i++) {
        for (let j = 0; j < pizzaData[i].allergens.length; j++) {
            for (let k = 0; k < allergensData.length; k++) {
                if (pizzaData[i].allergens[j] === allergensData[k].id) {
                    pizzaData[i].allergens[j] = allergensData[k].name;
                }
            }
        } 
    }
    localPizzaData = pizzaData;
    // insert all pizza to 
    pizzaData.map((pizza) => {
        rootElement.insertAdjacentHTML("beforeend", pizzaDiv(pizza));
    })

    const addToOrderButtons = document.getElementsByClassName("add-button");

    [...addToOrderButtons].forEach(button => button.addEventListener("click", addToOrder));
}
    
main();