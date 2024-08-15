document.addEventListener('DOMContentLoaded', setup());

function setup() {
    searchGifs();
    cleanHomePage();
    chooseGif();
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
            let gifs = content.data;
            console.log(gifs);
            console.log('META', content.meta);
            if (gifs.length !== 0) {
                insertGifs(gifs);
            } else console.log('META message:', content.meta.msg);
            
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
    let image = gif.images.fixed_height.url;
    let title = gif.title;
    let id = gif.id;
    return `
        <article class="gif-card">
            <img src="${image}" alt="${title}">
            <p class="figcaption">${title || 'no title'}</p>
            <button class="save" data-id="${id}" data-image="${image}" data-title="${title}">Save gif</button>
        </article>
    `;
}

function cleanHomePage() {
    document.querySelector('#cleanBtn').addEventListener('click', () => window.location.reload());
}

function chooseGif() {
    document.querySelector('.output').addEventListener('click', e => {
        if (e.target.classList.contains('save')) {
            let gifId = e.target.dataset.id;
            let gifImage = e.target.dataset.image;
            let gifTitle = e.target.dataset.title;
            saveGif(gifId, gifImage, gifTitle);
        }
    });
}

function saveGif(gifId, gifImage, gifTitle) {
    let myGifs = JSON.parse(localStorage.getItem('myGifs')) || [];
    let isExists = myGifs.some(gif => gif.id === gifId);
    if (!isExists) {
        myGifs.push({id: gifId, image: gifImage, title: gifTitle});
        localStorage.setItem('myGifs', JSON.stringify(myGifs));
        alert(`A gif with id ${gifId} is saved in the local storage.`);
    } else {
        alert(`There is already a gif with id ${gifId} in the local storage.`);
    }
}