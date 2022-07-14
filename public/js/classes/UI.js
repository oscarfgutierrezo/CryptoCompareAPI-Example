import { formCryptoOptionsContainer, form, formBtn, quoteResult } from "../selectors.js";
import { clickFormCryptoOptions } from "../collapsibles.js";
import { objQuote, cryptosObj } from './APP.js';

export class UI {
    constructor() {

    }
    completeSelectCriptocurrencies(cryptocurrencies) {
    
        // Insertar cada una de las criptomonedas en el menú de cryptos
        cryptocurrencies.forEach(crypto => {
            const { FullName, Name } = crypto.CoinInfo;
            cryptosObj[Name] = FullName; // Agregar las criptomonedas al cryptoObj
    
            const option = document.createElement('div');
            option.classList.add('form__crypto-option');
    
            const optionInput = document.createElement('input')
            optionInput.classList.add('hidden');
            optionInput.type = 'radio';
            optionInput.name = 'currency'
            optionInput.value = Name;
            option.appendChild(optionInput);
    
            const optionLabel = document.createElement('label');
            optionLabel.textContent = FullName;
            option.appendChild(optionLabel);
    
            formCryptoOptionsContainer.appendChild(option);
        });
    
        // Crear un arreglo que contiene las diferentes opciones del menú de cryptos
        const formCryptoOptions = document.querySelectorAll('.form__crypto-option');
    
        // Asociar cada una de las opciones del menú de cryptos a la función clickFormCryptoOptions
        formCryptoOptions.forEach(option => clickFormCryptoOptions(option))
    };
    
    showAlert(message) {
        const alert = document.querySelector('.alert');
        if(!alert) {
            const alert = document.createElement('p');
            alert.classList.add('alert');
            alert.textContent = message;
            form.insertBefore(alert, formBtn);
            setTimeout(() => {
                alert.remove()
            }, 2500);
        }
    }
    
    showQuote(quote) {
        this.cleanHTML();
        
        form.classList.replace('md:col-span-2', 'md:col-span-1')
    
        const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quote;
    
        const quoteResultHead = document.createElement('div');
        quoteResultHead.classList.add('quote-result__head');
    
        const quoteResultHeadName = document.createElement('h2');
        quoteResultHeadName.classList.add('quote-result__head-name');
        quoteResultHeadName.textContent = cryptosObj[objQuote.crypto]
        quoteResultHead.appendChild(quoteResultHeadName);
    
        const quoteResultHeadPrice = document.createElement('p');
        quoteResultHeadPrice.classList.add('quote-result__head-price');
        quoteResultHeadPrice.textContent = PRICE
        quoteResultHead.appendChild(quoteResultHeadPrice);
    
        const quoteResultInfo = document.createElement('div');
        quoteResultInfo.classList.add('quote-result__info');
    
        const quoteResultInfoHighest = document.createElement('p');
        quoteResultInfoHighest.textContent = "Today's highest price: ";
        quoteResultInfo.appendChild(quoteResultInfoHighest);
        
        const quoteResultInfoHighestSpan = document.createElement('span');
        quoteResultInfoHighestSpan.classList.add('font-bold');
        quoteResultInfoHighestSpan.textContent = HIGHDAY;
        quoteResultInfoHighest.appendChild(quoteResultInfoHighestSpan);
    
        const quoteResultInfoLowest = document.createElement('p');
        quoteResultInfoLowest.textContent = "Today's lowest price: ";
        quoteResultInfo.appendChild(quoteResultInfoLowest);
        
        const quoteResultInfoLowestSpan = document.createElement('span');
        quoteResultInfoLowestSpan.classList.add('font-bold');
        quoteResultInfoLowestSpan.textContent = LOWDAY;
        quoteResultInfoLowest.appendChild(quoteResultInfoLowestSpan);
    
        const quoteResultInfoVariation = document.createElement('p');
        quoteResultInfoVariation.textContent = "Variation last 24hrs: ";
        quoteResultInfo.appendChild(quoteResultInfoVariation);
        
        const quoteResultInfoVariationSpan = document.createElement('span');
        quoteResultInfoVariationSpan.classList.add('font-bold');
        quoteResultInfoVariationSpan.textContent = `${CHANGEPCT24HOUR}%`;
        quoteResultInfoVariation.appendChild(quoteResultInfoVariationSpan);
    
        const quoteResultInfoUpdate = document.createElement('p');
        quoteResultInfoUpdate.textContent = "Last update: ";
        quoteResultInfo.appendChild(quoteResultInfoUpdate);
        
        const quoteResultInfoUpdateSpan = document.createElement('span');
        quoteResultInfoUpdateSpan.classList.add('font-bold');
        quoteResultInfoUpdateSpan.textContent = LASTUPDATE;
        quoteResultInfoUpdate.appendChild(quoteResultInfoUpdateSpan);
    
        quoteResult.appendChild(quoteResultHead);
        quoteResult.appendChild(quoteResultInfo)
    }
    
    cleanHTML() {
        while(quoteResult.firstChild) {
            quoteResult.removeChild(quoteResult.firstChild);
        }
    }
}

