const gallery = document.getElementById('gallery');

fetch('https://randomuser.me/api/?results=12&nat=us') //returns the data for twelve users of us origin
  .then(response => response.json()) //turns the returned string into json
  .then(data => data.results) //retrieves the results object
  .then(results => results.map(result => //iterates over the array of user objects
    gallery.insertAdjacentHTML('beforeend', 
        `<div class="card">
        <div class="card-img-container">
        <img class="card-img" src="${result.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
        <p class="card-text">${result.email}</p>
        <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
        </div>
        </div>`)
    ))

    //console.log(result.name.first + ' ' + result.name.last + ' ' + result.email  + ' ' + result.location.street.number + ' ' + result.location.street.name + ' ' + result.location.postcode + ' ' +  result.location.city + ' ' + result.location.state + ' ' + result.cell + ' ' + result.dob.date + ' ' + result.picture.large)