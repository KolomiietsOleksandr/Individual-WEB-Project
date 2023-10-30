const beerContainer = document.getElementById('beer-container');
const abvSelect = document.getElementById('abv-select');
let currentMinABV = 0;
let currentMaxABV = 0;
let currentPage = 1;
const maxPages = 9;

const favoriteBeers = JSON.parse(localStorage.getItem('favoriteBeers')) || [];

function fetchBeers(page) {
    beerContainer.innerHTML = '';

    let apiUrl;

    if (currentMinABV === 0 && currentMaxABV === 0) {
        apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=25`;
    } else {
        const minABV = parseFloat(currentMinABV);
        const maxABV = parseFloat(currentMaxABV);

        apiUrl = `https://api.punkapi.com/v2/beers?abv_gt=${minABV}&abv_lt=${maxABV}&page=${page}&per_page=25`;
    }

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((beer) => {
                const beerElement = document.createElement('div');
                beerElement.className = 'beer-item';

                const favoriteButton = document.createElement("button");
                favoriteButton.innerHTML = '<i class="fa-solid fa-beer-mug-empty"></i>';
                favoriteButton.className = 'favorite-button';

                if (favoriteBeers.includes(beer.id)) {
                    favoriteButton.classList.add('favorited');
                    favoriteButton.style.color = "#e88f1c"
                }

                if (favoriteBeers.includes(beer.id)) {
                    favoriteButton.classList.remove('favorited');
                    favoriteButton.style.color = "#4e5467"
                }

                favoriteButton.addEventListener('click', () => {
                    if (favoriteBeers.includes(beer.id)) {
                        const index = favoriteBeers.indexOf(beer.id);
                        if (index > -1) {
                            favoriteBeers.splice(index, 1);
                        }
                        favoriteButton.style.color = "#4e5467"
                        favoriteButton.classList.remove('favorited');
                    } else {
                        favoriteBeers.push(beer.id);
                        favoriteButton.classList.add('favorited');
                        favoriteButton.style.color = "#e88f1c"
                    }
                    localStorage.setItem('favoriteBeers', JSON.stringify(favoriteBeers));
                });

                const nameElement = document.createElement('h2');
                nameElement.textContent = beer.name;

                const imageElement = document.createElement('img');
                imageElement.src = beer.image_url;

                const taglineElement = document.createElement('p');
                taglineElement.textContent = beer.tagline;

                const abvElement = document.createElement('p');
                abvElement.textContent = `ABV: ${beer.abv}%`;
                abvElement.className = 'ABV';

                beerElement.appendChild(favoriteButton);
                beerElement.appendChild(nameElement);
                beerElement.appendChild(imageElement);
                beerElement.appendChild(taglineElement);
                beerElement.appendChild(abvElement);
                beerContainer.appendChild(beerElement);
            });
        })
        .catch((error) => {
            console.error('Error ', error);
        });
}

function previousPage() {
    const favCheckbox = document.getElementById('favCheckbox');
    if (currentPage > 1 && !favCheckbox.checked) {
        currentPage--;
        const element = document.getElementById('number');
        element.innerHTML = `${currentPage}`;
        fetchBeers(currentPage);
    }
}

function nextPage() {
    const favCheckbox = document.getElementById('favCheckbox');
    if (currentPage < maxPages && !favCheckbox.checked) {
        currentPage++;
        const element = document.getElementById('number');
        element.innerHTML = `${currentPage}`;
        fetchBeers(currentPage);
    }
}

function loadBeerByABV(minABV, maxABV) {
    currentMinABV = minABV;
    currentMaxABV = maxABV;

    currentPage = 1;
    fetchBeers(currentPage);
}

function sortLowABV() {
    loadBeerByABV(0, 4.5);
}

function sortMediumABV() {
    loadBeerByABV(4.6, 7.5);
}

function sortHighABV() {
    loadBeerByABV(7.6, 50);
}

function sortBeerByABV() {
    const selectedValue = abvSelect.value;
    if (selectedValue === "none") {
        currentMinABV = 0;
        currentMaxABV = 0;
    } else {
        const [minABV, maxABV] = selectedValue.split('-');
        currentMinABV = parseFloat(minABV);
        currentMaxABV = parseFloat(maxABV);
    }
    const messageElement = document.getElementById('message');
    messageElement.style.display = "none";
    currentPage = 1;
    fetchBeers(currentPage);
}

abvSelect.addEventListener('change', sortBeerByABV);
loadBeerByABV(0, 0);


function toggleFavoritesView() {
    const favCheckbox = document.getElementById('favCheckbox');
    const arrowspage = document.getElementById("prenext");
    if (favCheckbox.checked) {
        displayFavoriteBeers();
        arrowspage.style.display = "none";
        const selectElement = document.getElementById('abv-select');
        selectElement.disabled = true;
    }
    else {
        loadBeerByABV(0,0);
        arrowspage.style.display = "none";
        const selectElement = document.getElementById('abv-select');
        selectElement.disabled = false;
    }
}

function displayFavoriteBeers() {
    beerContainer.innerHTML = '';
    const favCheckbox = document.getElementById('favCheckbox');

    const favoriteBeers = JSON.parse(localStorage.getItem('favoriteBeers')) || [];

    if (favoriteBeers.length == 0 && favCheckbox.checked) {
        const messageElement = document.getElementById('message');
        messageElement.style.display = "grid";
    }

    else {
        favoriteBeers.forEach((beerId) => {
            fetch(`https://api.punkapi.com/v2/beers/${beerId}`)
                .then((response) => response.json())
                .then((beer) => {
                    const beerElement = document.createElement('div');
                    beerElement.className = 'beer-item';

                    const favoriteButton = document.createElement("button");
                    favoriteButton.innerHTML = '<i class="fa-solid fa-beer-mug-empty"></i>';
                    favoriteButton.className = 'favorite-button favorited';
                    favoriteButton.style.color = "#e88f1c";
                    favoriteButton.addEventListener('click', () => {
                        const index = favoriteBeers.indexOf(beerId);
                        if (index > -1) {
                            favoriteBeers.splice(index, 1);
                            localStorage.setItem('favoriteBeers', JSON.stringify(favoriteBeers));
                            beerContainer.removeChild(beerElement);
                        }
                    });

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = beer[0].name;

                    const imageElement = document.createElement('img');
                    imageElement.src = beer[0].image_url;

                    const taglineElement = document.createElement('p');
                    taglineElement.textContent = beer[0].tagline;

                    const abvElement = document.createElement('p');
                    abvElement.textContent = `ABV: ${beer[0].abv}%`;
                    abvElement.className = 'ABV';

                    beerElement.appendChild(favoriteButton);
                    beerElement.appendChild(nameElement);
                    beerElement.appendChild(imageElement);
                    beerElement.appendChild(taglineElement);
                    beerElement.appendChild(abvElement);
                    beerContainer.appendChild(beerElement);
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
            });
        }
    }
