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

  const beersPricesArr = [];

  if (shoppingCart.length > 0) {
    cartContainer.style.borderTop = '5px solid #f3ebe0';
    cartContainer.style.borderBottom = '5px solid #f3ebe0';

    const confirm = document.createElement('div')
    confirm.className = "confirm";

    let total = 0;
    const totalPrice = document.createElement("h2")
    totalPrice.textContent = `Total: $`;
    totalPrice.className = "totalPrice";

    shoppingCart.forEach((beerName) => {
      const [beerNamePart, countPart, priceBeer] = beerName.split("/");
      const count = parseInt(countPart, 10);
      const price = parseFloat(priceBeer).toFixed(2);

      fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerNamePart}`)
        .then((response) => response.json())
        .then((beers) => {
          const beer = beers[0];

          const existingMessage = document.querySelector(".message-cart");
          if (existingMessage) {
            existingMessage.remove();
          }

          if (beer) {
            beer.price = price * count;

            const divElement = document.createElement("div");
            divElement.className = "beer-in-cart";

            const imageElement = document.createElement('img');
            imageElement.src = beer.image_url;
            imageElement.className = 'img-cart';

            const nameElement = document.createElement('p');
            nameElement.textContent = beer.name;
            nameElement.className = 'name-cart';

            const priceElement = document.createElement("p");
            priceElement.textContent = beer.price.toFixed(2) + '$';
            priceElement.className = "price-in-cart";

            const quantity = document.createElement('p');
            quantity.className = 'quantity';
            quantity.textContent = count;

            total += beer.price;
            totalPrice.innerHTML = "Total: " + total + "$";

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
              const beerIndex = shoppingCart.findIndex(item => item === beerName);
              if (beerIndex !== -1) {
                shoppingCart.splice(beerIndex, 1);
                displayCart();
              }
            });

            divElement.appendChild(imageElement);
            divElement.appendChild(nameElement);
            divElement.appendChild(priceElement);
            divElement.appendChild(quantity);
            divElement.appendChild(removeButton);
            cartContainer.appendChild(divElement);

            beersPricesArr.push(beer.price);
            return beersPricesArr;
          }
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
    });

    const orderButton = document.createElement("button")
    orderButton.className = "orderButton";
    orderButton.innerHTML = 'Comfirm order <i class="fa-solid fa-box-open"></i>';

    confirm.appendChild(totalPrice);
    confirm.appendChild(orderButton);
    cartContainer.appendChild(confirm);
  } else {
    const existingMessage = document.querySelector(".message-cart");

    if (!existingMessage) {
      const message2 = document.createElement("p");
      message2.innerHTML = '<i class="fa-solid fa-beer-mug-empty"></i>  Oops... Empty cart  <i class="fa-solid fa-beer-mug-empty"></i>';
      message2.className = "message-cart";

      const Basket = document.getElementById("Basket");
      Basket.appendChild(message2);

      cartContainer.style.borderTop = 'none';
      cartContainer.style.borderBottom = 'none';
    }
  }
}
