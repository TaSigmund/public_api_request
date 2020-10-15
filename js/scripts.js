fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => data.results)
  .then(results => results.map(result => 
    console.log(result.name.first + ' ' + result.name.last + ' ' + result.email  + ' ' + result.location.street.number + ' ' + result.location.street.name + ' ' + result.location.postcode + ' ' +  result.location.city + ' ' + result.location.state + ' ' + result.cell + ' ' + result.dob.date)
    ))
