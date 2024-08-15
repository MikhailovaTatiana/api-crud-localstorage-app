document.addEventListener('DOMContentLoaded', () =>{
    displayMyGifs();
});

function displayMyGifs() {
    let myGifs = JSON.parse(localStorage.getItem('myGifs'));
    console.log(myGifs);

    let outputRef = document.querySelector('.saved-gifs');
    console.log(outputRef);

    myGifs.forEach(gif => {
        let card = document.createElement('div');
        card.innerHTML = createSavedCard(gif);
        outputRef.appendChild(card);
    })   
}

function createSavedCard(gif) {
    let image = gif.image;
    let title = gif.title;
    let id = gif.id;
    return `
        <article>
            <img src="${image}" alt="${title}">
            <p class="figcaption">${title || 'no title'}</p>
            <aside>
                <button class="update">Udate title</button>
                <button class="remove" data-id="${id}">Remove gif</button>
            </aside>
        </article>
    `;
}