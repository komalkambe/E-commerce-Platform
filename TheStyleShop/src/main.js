    let shop = document.getElementById('shop')

   

    let basket = JSON.parse(localStorage.getItem("data")) || [];

    let generateShop =()=>{
        return (shop.innerHTML = shopItemsData
            .map((x) => {
                let { id, name, price, desc, img } = x;
                let search = basket.find((x)=> x.id === id) || [];
            return `
            <div id=product-id-${id} class="item">
            <img width="219"src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="button">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 :search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `
        }).join(""));
    };

    generateShop();



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
    
    
    //console.log(basket);
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

    //console.log(basket);
    update(selectedItem.id);
    
    //if item not present in cart then deleting its whole data in console
    //filter function will target all the objects present in the cart one by one
    //and basket contains id and item both thus obj.item is taken to only check item
    //if item: 0 (means the item will get removed from basket {all info in console get removed}) by using   FILTER Function
    //FILTER FUNCTION WILL RETURN OTHER ITEMS WHICH R NOT HAVING 0HAVING 
    basket = basket.filter((x)=> x.item !== 0);

    
    //localStorage is stored at bottom as JS runs line by line from top to bottom...SO ALL THE UPDATES SHOULD BE STORED IN A LOCAL STORAGE
    localStorage.setItem("data",JSON.stringify(basket));
};


let update = (id) => {
    let search = basket.find((x)=> x.id === id);

    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};



let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);
}

calculation();