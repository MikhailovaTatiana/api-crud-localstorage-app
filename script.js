document.addEventListener('DOMContentLoaded', setup());

function setup() {
    searchGifs();
    cleanHomePage();
}

function searchGifs() {
    document.querySelector('#searchBtn').addEventListener('click', e => {
        e.preventDefault();
        let rendomNumber = Math.floor(Math.random() * 100);
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=3&lang=sv&offset=${rendomNumber}&q=`;
        let input = document.querySelector('#searchText').value.trim();
        url = url.concat(input);

        console.log(url);

        fetchGiphyApi(url);
    });
}

function fetchGiphyApi(url) {
    fetch(url)
        .then(response => response.json())
        .then(content => {

            console.log(content.data);
            console.log('META', content.meta);

            insertGifs(content.data);
        })
        .catch(error => console.log(error));
}

function insertGifs(gifs) {
    let outputRef = document.querySelector('.output');
    let section = document.createElement('section');
    section.classList.add('triple');
    outputRef.append(section);
    gifs.forEach(gif => {
        section.innerHTML += createGifTemplate(gif);
    });
    outputRef.insertAdjacentElement('afterbegin', section);
}

function createGifTemplate(gif) {
    return `
        <article class="gif-card">
            <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
            <p class="figcaption">${gif.title || 'no title'}</p>
            <button id="save">Save gif</button>
            <button id="update" class="d-none">Udate title</button>
            <button id="remove" class="d-none">Remove gif</button>
        </article>
    `;
}

function cleanHomePage() {
    document.querySelector('#cleanBtn').addEventListener('click', () => window.location.reload());
}