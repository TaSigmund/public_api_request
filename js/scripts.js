/***
global variables
***/

const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];
const searchContainer = document.getElementsByClassName('search-container')[0];
let headerText = document.getElementsByClassName('header-text-container')[0].firstElementChild;



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

 /*** helper function to format phone number ***/
 function usFormat(phone){
    phone = phone.replace(/[^\d]/g, "");
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
 }

/*** function to actually build the modal ***/
function generateModals(people){ 
    const modals = people.map(
        person => {
        let modalHTML = `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                    <h3 id="${person.name.first}${person.name.last}" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${usFormat(person.cell)}</p>
                    <p class="modal-text">123 Portland Ave., ${person.location.city}, OR ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
            </div>
                <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
        body.insertAdjacentHTML('beforeend', modalHTML)
        }
    );
    return people
}


/***
show and hide modals
***/

function showModals(people) {
    let cards = document.getElementsByClassName('card');
    let modals = document.getElementsByClassName('modal-container');
    let closeModals = document.getElementsByClassName('modal-close-btn');
    let previous = document.getElementsByClassName('modal-prev');
    let next = document.getElementsByClassName('modal-next');
    
    previous[0].style.display = 'none'; //removes the previous button on the first modal
    next[cards.length-1].style.display = 'none'; //removes the next button on the last modal

    for (let i = 0; i < cards.length; i++) 
            {
                modals[i].style.display = 'none'; //hides all modals
                cards[i].addEventListener('click', ()=>{modals[i].style.display = 'block'}); //shows the modal
                closeModals[i].addEventListener('click', ()=>{modals[i].style.display = 'none'}) //hides the modal again
                next[i].addEventListener('click', ()=>{
                    modals[i].style.display = 'none'; //hides the current modal
                    modals[i+1].style.display = 'block' //shows the next modal
                })
                previous[i].addEventListener('click', ()=>{
                    modals[i].style.display = 'none'; //hides the current modal
                    modals[i-1].style.display = 'block'; //shows the previous modals
                }
                )
            }
    return people
} 


/***
search feature
***/

searchContainer.insertAdjacentHTML('beforeend', `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`
);

function searchFeature(people){
    const searchPeople = document.getElementsByClassName('search-input')[0];
    const searchSubmit = document.getElementsByClassName('search-submit')[0];
    searchSubmit.addEventListener('click', ()=>{
        gallery.innerHTML = '';
        const searchResults = people.filter(person => person.name.first.includes(searchPeople.value) || person.name.last.includes(searchPeople.value));
        generateGallery(searchResults); // creates a gallery using the filtered results
        showModals(searchResults); // creates modals using the filtered results
    })
}

/***
fetching and processing data
***/

fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson.results)
        .then(people => generateGallery(people))
        .then(people => generateModals(people))
        .then(people => showModals(people))
        .then(people => searchFeature(people))
        .catch(error => {headerText.textContent = 'Oh no, something went wrong.'})
        


