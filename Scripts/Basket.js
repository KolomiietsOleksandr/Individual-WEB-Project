window.shoppingCart = [];
const cartContainer = document.getElementById("basket-div");

function displayCart() {
    cartContainer.innerHTML = '';
    const shop = document.getElementById("Shop");
    const home = document.getElementById("Homepages");
    const basket = document.getElementById("Basket");
    const info = document.getElementById("Info");
    shop.style.display = "none";
    home.style.display = "none";
    info.style.display = "none";
    basket.style.display = "block";

    if (shoppingCart.length > 0) {
        shoppingCart.forEach((beerName) => {
            fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
                .then((response) => response.json())
                .then((beers) => {
                    const beer = beers[0];

                    const existingMessage = document.querySelector(".message-cart");
                    if (existingMessage) {
                        existingMessage.remove();
                    }

                    if (beer) {
                        const randomPrice = (Math.random() * 10 + 1).toFixed(2);
                        beer.price = randomPrice;

                        const divElement = document.createElement("div");
                        divElement.className = "beer-in-cart";

                        const imageElement = document.createElement('img');
                        imageElement.src = beer.image_url;
                        imageElement.className = 'img-cart';

                        const nameElement = document.createElement('p');
                        nameElement.textContent = beer.name;
                        nameElement.className = 'name-cart';

                        const priceElement = document.createElement("p");
                        priceElement.textContent = beer.price + '$';
                        priceElement.className = "price-in-cart";

                        const quantityInput = document.createElement('input');
                        quantityInput.type = 'text';
                        quantityInput.value = 1;
                        quantityInput.className = 'quantity-input';
                        quantityInput.addEventListener('input', () => {
                            const newQuantity = parseInt(quantityInput.value, 10);
                            console.log("", newQuantity);
                            if (isNaN(newQuantity)) {
                                quantityInput.value = 1;
                            }
                            else{
                                quantityInput.value = newQuantity;
                            }
                            priceElement.textContent = (Math.round(beer.price * quantityInput.value * 10) / 10) + "$";
                        });

                        const removeButton = document.createElement('button');
                        removeButton.textContent = 'Remove';
                        removeButton.className = 'remove-button';
                        removeButton.addEventListener('click', () => {
                            const updatedCart = shoppingCart.filter(item => item.name == beer.name);
                            shoppingCart = updatedCart;
                            displayCart();
                        });

                        divElement.appendChild(imageElement);
                        divElement.appendChild(nameElement);
                        divElement.appendChild(priceElement);
                        divElement.appendChild(quantityInput);
                        divElement.appendChild(removeButton);
                        cartContainer.appendChild(divElement);
                    }
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
        });

        const confirm = document.createElement('div')
        confirm.className = "confirm";

        const totalPrice = document.createElement("h2")
        totalPrice.textContent = "Total:";

        const orderButton = document.createElement("button")
        orderButton.className = "orderButton";
        orderButton.innerHTML = 'Comfirm order <i class="fa-solid fa-box-open"></i>';

        confirm.appendChild(totalPrice);
        confirm.appendChild(orderButton);
        cartContainer.appendChild(confirm);
    }
    else {
        const existingMessage = document.querySelector(".message-cart");

        if (!existingMessage) {
            const message2 = document.createElement("p");
            message2.innerHTML = '<i class="fa-solid fa-beer-mug-empty"></i>  Oops... Empty cart  <i class="fa-solid fa-beer-mug-empty"></i>';
            message2.className = "message-cart";

            const Basket = document.getElementById("Basket");
            Basket.appendChild(message2);
        }
    }
}