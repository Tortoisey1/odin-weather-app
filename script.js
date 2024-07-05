const img = document.querySelector('img');

const weatherDiv = document.querySelector('.weather');
const countryDiv = document.querySelector('.country');
const temperatureDiv = document.querySelector('.temperature');
const timeDiv = document.querySelector('.time');

let apiJson;

require('dotenv').config();

const apiKey = process.env.API_KEY;

async function getApiObject(country) {
  try {
    let query = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + country;
    let response = await fetch(query, { mode: 'cors' });
    apiJson = await response.json();
    return apiJson;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function main(country) {

  //api return value
  apiJson = await getApiObject(country);


  //get the weather portion
  let weatherObject = apiJson.current;

  //get the location portion
  let location = apiJson.location;

  console.log(weatherObject);

  console.log(location);

  weatherDiv.innerHTML = weatherObject.condition.text;

  countryDiv.innerHTML = location.country;

  temperatureDiv.innerHTML = weatherObject.temp_c;

  timeDiv.innerHTML = location.localtime;

  //set the image icon
  img.src = 'https:' + weatherObject.condition.icon;
}


function submitForm(event) {
  event.preventDefault();

  let countryForm = document.getElementById('country').value;

  document.querySelector('form').reset();

  main(countryForm);

}

const formSubmit = document.getElementById('submit-form');

formSubmit.addEventListener('click', submitForm, false);