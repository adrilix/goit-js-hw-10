import {refs} from "./index";
import debounce from 'lodash.debounce';

export function makeMarkupCountries(countries) {
    const markup = countries.map(({ flags: { svg }, name: { official } }) => { 
        return `<li><div class="style__div"><img src="${svg}" width=35 height=20 alt="${official}"/><p class="text"><b>${official}</b></p></div></li>`
    });
    refs.countryList.innerHTML = markup.join("");
}

export function makeSingleCountryMarkup ([country]) {
    const {
        name:{official},
        flags:{svg},
        capital, 
        population, 
        languages,
        }=country;

    const finalMarkup =
        `<div class="img__style"><img src="${svg}" width=40 height=22 alt="${official}"/>
        <h2 class="title">${official}</h2></div>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages).join(", ")}</p>`
    refs.countryInfo.innerHTML = finalMarkup;
}

