/***
global variables
***/

const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
const searchContainer = document.getElementsByClassName('search-container')[0];



/***
dynamically generated HTML
***/

function generateGallery(people){
         const profiles = people.map(
            person => {//iterates over the array of user objects
                let cardHTML = `<div class="card">
                                <div class="card-img-container">
                                <img class="card-img" src="${person.picture.large}" alt="profile picture"></div>
                                <div class="card-info-container">
                                <h3 id="${person.name.first}${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                                <p class="card-text">${person.email}</p>
                                <p class="card-text cap">${person.location.city}, ${person.location.state}</p></div></div>`
                gallery.insertAdjacentHTML('beforeend', cardHTML)
            }
        )
        return people
}

/*** 
 modalCards
 ***/

function modalCards(people) {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) 
        {cards[i].addEventListener('click', ()=>{
            body.insertAdjacentHTML('beforeend', `
            <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${people[i].picture.large}" alt="profile picture">
                            <h3 id="${people[i].name.first}${people[i].name.last}" class="modal-name cap">${people[i].name.first} ${people[i].name.last}</h3>
                            <p class="modal-text">${people[i].email}</p>
                            <p class="modal-text cap">${people[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${people[i].cell}</p>
                            <p class="modal-text">123 Portland Ave., ${people[i].location.city}, OR ${people[i].location.postcode}</p>
                            <p class="modal-text">Birthday: 10/21/2015</p>
                        </div>
            </div>
        `)  

        /*** the next 3 lines make sure the modals can be closed ***/
        let modal = document.getElementById('modal-container');
        let closeModal = document.getElementById('modal-close-btn');
        closeModal.addEventListener('click', ()=>{body.removeChild(body.lastElementChild)})
        })}
        return people
    }

/***
search feature
***/

searchContainer.insertAdjacentHTML('beforeend', `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`)

function searchFeature(people){
    const searchPeople = document.getElementsByClassName('search-input')[0];
    const searchSubmit = document.getElementsByClassName('search-submit')[0];
    searchSubmit.addEventListener('click', ()=>{
        gallery.innerHTML = '';
        const searchResults = people.filter(person => person.name.first.includes(searchPeople.value) || person.name.last.includes(searchPeople.value));
        generateGallery(searchResults)
            }
        )
        
}

/***
fetching and processing data
***/

fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson.results)
        .then(people => generateGallery(people))
        .then(people => modalCards(people))
        .then(people => searchFeature(people))


