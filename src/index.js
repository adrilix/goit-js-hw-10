import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import {makeMarkupCountries} from './markup';
import {makeSingleCountryMarkup} from './markup';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

export const refs ={
    searchInput : document.querySelector('#search-box'),
    countryList : document.querySelector('.country-list'),
    countryInfo : document.querySelector('.country-info'),
}


refs.searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event) {
    refs.countryList.innerHTML='';
    refs.countryInfo.innerHTML='';
    
    let inputValue=event.target.value.trim();
    if (inputValue){
        fetchCountries(inputValue).then(result=>{
            if(!result.ok){
                throw new Error(result.status);
            }
            return result.json()})
        .then(countries => {
            if(countries.length>10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
                return;
            }
            if(countries.length>1 && countries.length<11){
                makeMarkupCountries(countries);
                return;
            }
            makeSingleCountryMarkup(countries);
        }).catch(error=>{
            Notify.failure("Oops, there is no country with that name");
        })
    }
}