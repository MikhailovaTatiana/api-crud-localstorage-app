document.addEventListener('DOMContentLoaded', () =>{
    displayMyGifs();
    removeGif();
    removeAll();
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

function removeGif() {
    document.querySelector('.saved-gifs').addEventListener('click', e => {
        if (e.target.classList.contains('remove')) {
            let gifId = e.target.dataset.id;
            submitRemoveGif(gifId);
        }
    });
}

function submitRemoveGif(id) {
    let myGifs = JSON.parse(localStorage.getItem('myGifs')) || [];
    myGifs = myGifs.filter(gif => gif.id !== id);
    localStorage.setItem('myGifs', JSON.stringify(myGifs));
    location.reload();
}

function removeAll() {
    document.querySelector('#removeAll').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}