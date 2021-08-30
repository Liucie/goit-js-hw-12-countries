import './sass/main.scss';
import debounce from 'lodash.debounce'
import { alert,defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import { refs } from './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
import countryCardTpl from './templates/country__card.hbs';

refs.input.addEventListener('input', debounce(searchCountry, 500))

function searchCountry() {
    if (refs.input.value === '') {
        refs.container.innerHTML = "";
    };
    // fetch(`https://restcountries.eu/rest/v2/name/${refs.input.value}`)
    fetchCountries(refs.input.value)
        .then(responce => responce.json(),)
        .then(result => renderMarkup(result))
        .catch(err => onError(err));
        // .then(result => console.log(result));
    
    
}
function renderMarkup(arr) {
    if (arr.length > 10) {
        alert({
            text:'Too many matches found. Please enter a more specific query!'
        })
    };
    if (arr.length >= 2 && arr.length <= 10) {
        makeCountriesListMarkup(arr)
    };
    if (arr.length === 1) {
        renderCountryCard(arr[0]);
    };
}

function makeCountriesListMarkup(arr) {
    refs.container.textContent =""
    const list = document.createElement('ul');
    // console.log(list);
    refs.container.prepend(list);
    const countriesListMarkup =
        arr.map((obj) => {
            return `<li class = "countries-item"> ${obj.name}</li>`
        })
            .join('');
    list.innerHTML = countriesListMarkup;
};
function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.container.innerHTML = markup;
}

function onError(responce) {
    if (responce.status === "404") {
        alert({
            text: 'Error! This country does not exist!'
        });
    }
}