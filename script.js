'use strict'

const searchURL = 'https://api.openbrewerydb.org/breweries';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#results-list').append(
    `<li><h3>${responseJson.name[i]}</h3>
    <p>${responseJson.street[i]}</p>
    <p>${responseJson.city[i]}</p>
    <p>${responseJson.state[i]}</p>
    <a href="${responseJson.website_url[i]}">Visit Website</a>
    </li>`);
  $('#results').removeClass('.hidden');
}

function getBreweries(citySearch, stateSearch) {
  const params = {
    by_city: citySearch,
    by_state: stateSearch,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL +'?'+ queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}


function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const citySearch = $('#js-citySearch-input').val();
    const stateSearch = $('#js-stateSearch-input').val();
    getBreweries(citySearch, stateSearch);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
});

$(watchForm);