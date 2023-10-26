const beerContainer = document.getElementById('beer-container');
        let currentPage = 1;
        const maxPages = 9; // Максимальна кількість сторінок

        function fetchBeers(page) {
            beerContainer.innerHTML = '';

            fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=25`)
                .then((response) => response.json())
                .then((data) => {
                    data.forEach((beer) => {
                        const beerElement = document.createElement('div');
                        beerElement.className = 'beer-item';

                        const nameElement = document.createElement('h2');
                        nameElement.textContent = beer.name;

                        const imageElement = document.createElement('img');
                        imageElement.src = beer.image_url;

                        const taglineElement = document.createElement('p');
                        taglineElement.textContent = beer.tagline;

                        beerElement.appendChild(nameElement);
                        beerElement.appendChild(imageElement);
                        beerElement.appendChild(taglineElement);
                        beerContainer.appendChild(beerElement);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching data: ', error);
                });
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                const element = document.getElementById('number');
                element.innerHTML = `${currentPage}`;
                fetchBeers(currentPage);
            }
        }

        function nextPage() {
            if (currentPage < maxPages) {
                currentPage++;
                const element = document.getElementById('number');
                element.innerHTML = `${currentPage}`;
                fetchBeers(currentPage);
            }
        }

        fetchBeers(currentPage);