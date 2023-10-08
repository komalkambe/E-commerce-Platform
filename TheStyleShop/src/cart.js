let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);
}

calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => y.id === id) || []
                // let { img, name, price } = search  --> THIS IS CALLED DESTRUCTURING,,,BY DOING THIS U DONT NEED TO WRITE  search.img / search.name / search.price >> INSTEAD JUST WRITE img / name / price
            return `
            <div class="cart-items">  
                    <img width="100" src = ${search.img} alt="" />
                    <div class="details">

                        <div class="title-price-x">
                            <h3 class="title-price">
                                <p>${search.name}</p>
                                <p class="cart-icon-price">$ ${search.price}</p>
                            </h3>
                            <i onclick="removeItems((${id}))" class="bi bi-x-lg"></i>
                        </div>

                        <div class="button">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>

                        <h3 class="quantity-price">$ ${item * search.price}</h3>
                    </div>
      
            </div>
            `;
        })
        .join(""));
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h1>Cart is Empty</h1>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;         
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id:selectedItem.id,
            item: 1,
        });
    }

    else {
        search.item += 1;
    }
    
    
    generateCartItems();
    update(selectedItem.id);
//setting data inside the local storage
    localStorage.setItem("data",JSON.stringify(basket));
};


let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return;

    else if(search.item === 0) return; //alert('Cart does not contain this item');

    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0);
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket));
};


let update = (id) => {
    let search = basket.find((x)=> x.id === id);

    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};


let removeItems = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=> x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}


let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map ((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        })
        .reduce ((x,y) => x + y , 0 ); //it adds all array elements
        //console.log(amount);
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
}
totalAmount();


let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}