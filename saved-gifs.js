document.addEventListener('DOMContentLoaded', () =>{
    displayMyGifs();
    removeGif();
    removeAll();
    updateTitle();
});

function displayMyGifs() {
    let myGifs = JSON.parse(localStorage.getItem('myGifs'));

    let outputRef = document.querySelector('.saved-gifs');
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
                <button class="update" data-title="${title}" data-id="${id}" data-image="${image}">Update title</button>
                <button class="remove" data-id="${id}">Remove gif</button>
            </aside>
        </article>
    `;
}

function removeGif() {
    document.querySelector('.saved-gifs').addEventListener('click', e => {
        if (e.target.classList.contains('remove')) {
            let gifId = e.target.dataset.id;
            alert(`The gif with id ${gifId} is removing...`);
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

function updateTitle() {
    document.querySelector('.saved-gifs').addEventListener('click', e => {
        if (e.target.classList.contains('update')) {
            let gifTitle = e.target.dataset.title;
            let gifId = e.target.dataset.id;
            let gifImage = e.target.dataset.image;
            let myGifs = JSON.parse(localStorage.getItem('myGifs')) || [];
            if (myGifs.length > 0) {
                let input = prompt('Update the title', `${gifTitle}`);
                let newList = [];
                myGifs.forEach(gif => {
                    if (gif.id === gifId) {
                        newList.push({id: gifId, image: gifImage, title: input});
                    } else {
                        newList.push(gif);
                    }   
                })
                localStorage.setItem('myGifs', JSON.stringify(newList));
                location.reload();   
            }
        }
    });
}