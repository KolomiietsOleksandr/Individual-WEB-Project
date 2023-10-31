const beerContainerIn = document.getElementById('beer-container');
const beerDetailsContainer = document.getElementById('beer-details');
const beerNameElement = document.getElementById('beer-name');
const beerImageElement = document.getElementById('beer-image');
const beerDescriptionElement = document.getElementById('beer-description');
const beerABVElement = document.getElementById('beer-abv');
const beerIBUElement = document.getElementById('beer-ibu');
const beerPairingElement = document.getElementById("beer-food-pairing");
const beerPriceElement = document.getElementById("beer-price");

beerContainerIn.addEventListener('click', (event) => {
    const clickedBeerElement = event.target.closest('.beer-item');
    if (clickedBeerElement) {
        const beerNameH2 = clickedBeerElement.querySelector('h2');
        const beerName = beerNameH2.textContent.replace(/ /g, "_");

        const ShopContainer = document.getElementById("Shop");
        const InfoContainer = document.getElementById("Info");

        ShopContainer.style.display = "none";
        InfoContainer.style.display = "block";

         fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
             .then((response) => response.json())
             .then((beer) => {
                const selectedBeer = beer[0];
                const randomPrice = (Math.random() * 10 + 1).toFixed(2);
                beer.price = randomPrice;

                beerNameElement.textContent = selectedBeer.name;
                beerImageElement.src = selectedBeer.image_url;
                beerDescriptionElement.textContent = selectedBeer.description;
                beerABVElement.textContent = `ABV: ${selectedBeer.abv}%`;
                beerIBUElement.textContent = `IBU: ${selectedBeer.ibu}`;
                beerPairingElement.innerHTML = 'Food pairing:<br>' + selectedBeer.food_pairing;
                beerPriceElement.textContent = beer.price + "$";

                beerDetailsContainer.style.display = 'block';
             })
             .catch((error) => {
                 console.error('Помилка: ', error);
             });
    }
});

    const closeButton = document.getElementById('button-back');{

    closeButton.addEventListener('click', () => {
        const ShopContainer = document.getElementById("Shop");
        const InfoContainer = document.getElementById("Info");
        InfoContainer.style.display = 'none';
        ShopContainer.style.display = "Block";
    });
}
