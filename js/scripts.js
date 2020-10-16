const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body')[0];

function generateGallery(people){
    people.map(
        person => {//iterates over the array of user objects
        gallery.insertAdjacentHTML('beforeend', 
        `<div class="card">
        <div class="card-img-container">
        <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="${person.name.first}${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        </div>`);
    })
}

fetch(url) //returns the data for twelve users of us origin
  .then(response => response.json()) //turns the returned string into json
  .then(data => generateGallery(data.results)) //uses the results object to generate the HTML for the gallery
    


    /**gallery.addEventListener('click', (e) => {
        if (e.target.className.includes('card')){
            console.log('card')
            }
        })***/
    

   /*** ***/

    

    //console.log(result.name.first + ' ' + result.name.last + ' ' + result.email  + ' ' + result.location.street.number + ' ' + result.location.street.name + ' ' + result.location.postcode + ' ' +  result.location.city + ' ' + result.location.state + ' ' + result.cell + ' ' + result.dob.date + ' ' + result.picture.large)