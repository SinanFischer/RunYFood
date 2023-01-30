let menus = [
    {
        "meal": "Caesar Salat mit Hähnchenstreifen",
        "extra": "Hähnchenbruststreifen, frischer grüner Salat und hausgemachter Dressing",
        "price": 8.00,
        "quantity" : 1
    },

    {
        "meal": "Bistro",
        "extra": "Gemischtes Blattgemüse, Römerherzen, Thunfisch, Bratkartoffeln, Ei, weiße Bohnen, Kalamata-Oliven, gekräuselter Lauch. Empfohlenes Dressing: Karamellisierte Zwiebel",
        "price": 10.00,
        "quantity" : 1
    },
    {
        "meal": "Caesar-Grill",
        "extra": "Römerherzen, gegrilltes Hähnchen, gegrilltes Steak (+1,00) oder Garnelen (+1,50), Parmesankäse, Croutons. Empfohlenes Dressing: Caesar",
        "price": 9.00,
        "quantity" : 1
    },
    {
        "meal": "Mittelmeer",
        "extra": "Romaine-Herzen, Kalamata-Oliven, Roma-Tomaten, Gurken, rote Zwiebeln, Tabouli, Falafel. Empfohlenes Dressing: Geröstete Tomaten-Vinaigrette",
        "price": 7.50,
        "quantity" : 1
    },
    {
        "meal": "Sweet Baby",
        "extra": "Babyspinat, Rucola, geröstete Peperoni, rote Zwiebeln, Craisins, Sonnenblumenkerne, Asiago-Käse. Empfohlenes Dressing: Balsamico-Vinaigrette",
        "price": 8.00,
        "quantity" : 1
    },
    {
        "meal": "BÜFFEL HUHN",
        "extra": "Babyspinat, Römerherzen, Eisbergsalat, knuspriges Hühnchen, Karotten, Sellerie, Gurken, Blauschimmelkäsestreusel. Empfohlenes Dressing: Buffalo Ranch",
        "price": 8.00,
        "quantity" : 1
    },
    {
        "meal": "STEAK-HOUSE",
        "extra": "Bibb-Salat, Römerherzen, gegrilltes Steak, sautierte Pilze, Roma-Tomaten, rote Zwiebeln, Pommes Frites. Empfohlenes Dressing: Steakhouse Blue Cheese",
        "price": 8.00,
        "quantity" : 1
    },
    {
        "meal": "Toskainisch",
        "extra": "Baby-Rucola, Römerherzen, Bibb-Salat, weiße Bohnen, Artischockenherzen, geröstete Tomaten, gehobelter Parmesan. Empfohlenes Dressing: Balsamico-Vinaigrette",
        "price": 8.00,
        "quantity" : 1
    },
]

let dish = []
let quantity = []
let price = []



function render() {
    load(); 
    let meals = document.getElementById('meals');
    meals.innerHTML = '';

    for (i = 0; i < menus.length; i++) {
        menuList(i);
    }
    showBasket(); 
}

// Listing all menus on frontpage (Display HTML Function) 

function menuList(i) {
    let menu = menus[i]
    let menuprice = menu['price'];
    const menupriceFix = parseFloat(menuprice).toFixed(2);
    meals.innerHTML += `
    <div class="food-container" id="menu${i}" onclick="addToBasket(${i}) " >
         <div class="food-container-head">
          <h2>
           ${menu['meal']} 
          </h2>
             <img src="img/wishlist.png">
         </div> 
     <div> 
         <span>  
             ${menu['extra']} 
         </span>
     </div>
     <div>
     ${menupriceFix}€
     </div> 
</div>   `;
}



// Add Values to the Arrays
function addToBasket(i) {
    let menu = menus[i];

    let index = dish.indexOf(menu['meal']); 
    console.log(index)
if (dish.length >= 20) {
    alert('Unsere Lieferanten sind in der Innenstadt mit Fahrrädern unterwegs. Aufgrund dessen ist eine Großbestellung als Lieferung über 20 Speisen leider nicht möglich. Wir danken für Ihr Verständnis.');
}

if (index == -1) {
    dish.push(menu['meal']);
    quantity.push(menu['quantity']);
    price.push(menu['price']);
    save(); 
    showBasket();
}
else {
    quantity[index] += 1; 
    save(); 
    showBasket(); 
}
}


// Reloads Shoppingbasket
function showBasket(q) {
    let basket = document.getElementById('basket-content');
    let basketBottom = document.getElementById('basket-bottom');
    basket.innerHTML = "";
    basketBottom.innerHTML = "";
    for (q = 0; q < dish.length; q++) {

        const pricefix = parseFloat(price[q]).toFixed(2);

        basket.innerHTML += /*html*/ `
       <div class="basket-content-filled" id="basket-content"> 
         <div class="basket-centering">
            <div>   
            <span>${dish[q]} </span>
         </div> 
         <span class="price-basket" id="${q}">
             ${pricefix}€
        </span> 
         </div>
        <div class="basket-centering">
            <div>   
                <strong> 
                    <img src="img/plus.png" onclick="addSame(${q})"  class="basket-icons"> <img src="img/minus.png" onclick="removeFromBasket(${q})" class="basket-icons" > 
                </strong>
            </div>
             <span > ${quantity[q]} </span>  <!-- Quantity --> 
        </div>
    </div>
  `;
    }

    if (dish.length === 0) {
        emptyBasket();
    }
    else {
        resultSectionBasket();
    }
}


/** increase basket order by one 
 * 
 * @param {number} q - contains number which basket order is chosed
 */
function addSame(q) {
    quantity[q] += 1; 
    showBasket(); 
}







function removeFromBasket(q) {
    if (quantity[q] >= 2) {
        quantity[q] -= 1; 
        showBasket(); 
    }
    else {
        dish.splice(q, 1);
        price.splice(q, 1);
        save(); 
        showBasket(q);  //updates basket to show the current content
    }

}


/**shows HTML totalvalue Basket
 * 
 * @param {string} subtotal - toFixed formates the number so only . is shown not ,
 * 
 */
function resultSectionBasket() {
    let subtotal = 0; 
    let shippingcostDEZ = 2;
    let shippingcost = shippingcostDEZ.toFixed(2);
// https://stackoverflow.com/questions/24094466/sum-two-arrays-in-single-iteration found and 123
    let sum = price.map(function (x, idx) {
        return x * quantity[idx];
    }); 
    console.log(sum); 
    

    for (let i = 0; i < sum.length; i++) {
        subtotal += sum[i];
    }
    subtotal.toFixed(2); 

    const totalconst = subtotal + shippingcostDEZ;
    const total = parseFloat(totalconst).toFixed(2);
    document.getElementById('basket-bottom').innerHTML = `<div class="basket-centering "><div> <span> Zwischensumme </span> </div> <strong> ${subtotal}€ </strong> </div>
    <div class="basket-centering shippingcost-border"><div> <span> Lieferkosten </span> </div> <strong> ${shippingcost}€ </strong> </div>
    <div class="basket-centering "><div> <span> Gesamt </span> </div> <strong> ${total}€ </strong> </div> 
    
    <button onclick="testSiteOpen()"> Kostenpflichtig bestellen </button> `
    
    totalBasketPreview(total);

}

/*


*/

//Shows Empty Basket if Basket empty 
function emptyBasket() {

    document.getElementById('basket-content').innerHTML = `
        <div class="basket-content" id="basket-content">
            <img src="img/shopping.png">
                <span> Fülle deinen Warenkorb</span>
                <span> Dein Warenkorb ist leer </span>
        </div>`;
}

// Shows subtotal when basket is closed
function totalBasketPreview(s) {
    document.getElementById('total-preview').innerHTML =`Warenkorb (${s}) €`; 
}


//open and closes  the Basket at Full page // Basket1 dont have display: none. basket has display none from 1000 width
function basketFullPage() {
        document.getElementById("basket").className = "basket1";
}


function basketFullPageClose() {
        document.getElementById("basket").className = "basket";
}




//popup links 

function linksClose() {

    document.getElementById('links-bg').classList.add("d-none");
}

function linksOpen() {
    document.getElementById('links-bg').classList.remove("d-none");
}

// Test-site pop up functions 

function testSiteClose() {
    document.getElementById('test-site').classList.add("d-none");
}

function testSiteOpen() {
    document.getElementById('test-site').classList.remove("d-none");

}

function testWindowtext() {
    document.getElementById('test-window').innerHTML = `Die gewünschte Funktion befindet sich derzeit in Entwicklung`; 
}


function save() {
    let dishAsText = JSON.stringify(dish); 
    localStorage.setItem('dishes', dishAsText); 

    let priceAsText = JSON.stringify(price); 
    localStorage.setItem('prices', priceAsText); 

    let quantityAsText = JSON.stringify(quantity); 
    localStorage.setItem('quantity', quantityAsText); 
}


function load() {
    let dishAsText = localStorage.getItem('dishes'); 
    let priceAsText = localStorage.getItem('prices'); 
    let quantityAsText = localStorage.getItem('quantity'); 

    if (dishAsText && priceAsText) {

        dish = JSON.parse(dishAsText); 
        price = JSON.parse(priceAsText); 
        quantity = JSON.parse(quantityAsText); 
    }
}