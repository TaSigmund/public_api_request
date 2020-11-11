/***
global variables
***/

const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];

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

function modalCards(obj) {
    let cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) 
        {cards[i].addEventListener('click', ()=>{
            body.insertAdjacentHTML('beforeend', `
            <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${obj[i].picture.large}" alt="profile picture">
                            <h3 id="${obj[i].name.first}${obj[i].name.last}" class="modal-name cap">${obj[i].name.first} ${obj[i].name.last}</h3>
                            <p class="modal-text">${obj[i].email}</p>
                            <p class="modal-text cap">${obj[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${obj[i].cell}</p>
                            <p class="modal-text">123 Portland Ave., ${obj[i].location.city}, OR ${obj[i].location.postcode}</p>
                            <p class="modal-text">Birthday: 10/21/2015</p>
                        </div>
            </div>
        `)  
        })}
    }

/***
fetching and processing data
***/

fetch(url)
        .then(response => response.json())
        .then(responseJson => responseJson.results)
        .then(people => generateGallery(people))
        .then(people => modalCards(people))