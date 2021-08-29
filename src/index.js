import './sass/main.scss';
import debounce from 'lodash.debounce'
import { alert,defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import countryCardTpl from './templates/country__card.hbs'

//notification({
//     text: 'Notice me, senpai!'
//   });

const refs = {
    input: document.querySelector('.js-input'),
    container: document.querySelector('.wrap'),
    countriesList:document.querySelector('.countries-list')
}

refs.input.addEventListener('input', debounce(searchCountry, 500))
// function onInputEnter(e) {
    
// }
function searchCountry() {
    fetch(`https://restcountries.eu/rest/v2/name/${refs.input.value}`)
        .then(responce => responce.json())
        .then(renderMarkup);
        // .then(result => console.log(result));
    
        // .then(renderMarkup);
    
}
function renderMarkup(arr) {
    if (arr.length > 10) {
        alert({
            text:'Too many matches found. Please enter a more specific query!'
        })
    };
    if (arr.length >= 2 && arr.length <= 10) {
        makeCountriesListMarkup
    }
}
// function searchCountryDebounce ()
function makeCountriesListMarkup(arr) {
    const list = document.createElement(ul);
    console.log(list)
    refs.container.appendChild(list);
    list.classList.add(countries-list);
    const countriesListMarkup =
        arr.map((obj) => {
            return `<li class = "countries-item"> ${obj.name}</li>`
        })
            .join('');
    list.innerHTML = countriesListMarkup;
}