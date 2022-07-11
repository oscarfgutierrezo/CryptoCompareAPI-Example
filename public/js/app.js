const form = document.querySelector('#form');
const formCurrencySelect = document.querySelector('#form__currency-select');
const formCryptoSelect = document.querySelector('#form__crypto-select');
const formBtn = document.querySelector('#form__btn');
const quoteResult = document.querySelector('#quote-result')

const cryptosObj = {

}

const objQuote = {
    currency: '',
    crypto: ''
}

document.addEventListener('DOMContentLoaded', () => {
    consultCryptocurrencies();
    form.addEventListener('submit', readUserQuote)
})

// Consultar el top-10 de criptomonedas
async function consultCryptocurrencies() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

    try {
        const reply = await fetch(url);
        const result = await reply.json();
        const cryptocurrencies = result.Data
        selectCriptocurrencies(cryptocurrencies);
    } catch (error) {
        console.log(error);
    }
};

// Crear las opciones del select con el top 10 de criptomonedas
function selectCriptocurrencies(cryptocurrencies) {
    cryptocurrencies.forEach(crypto => {
        const { FullName, Name } = crypto.CoinInfo;
        
        cryptosObj[Name] = FullName; // Agregar las criptomonedas al cryptoObj

        const option = document.createElement('option');
        option.value = Name;
        option.dataset.crypto = FullName;
        option.textContent = FullName;
        formCryptoSelect.appendChild(option);
    });
};

// Completar el objeto de cotización con las opciones seleccionadas por el usuario
function readUserQuote(e) {
    e.preventDefault();
    objQuote.currency = formCurrencySelect.value;
    objQuote.crypto = formCryptoSelect.value;
    if(validateForm()) {
        showAlert('All fields are required');
        return;
    }
    consultAPI();
} 

function validateForm() {
    console.log(objQuote);
    return Object.values(objQuote).some(key => key === '')
}

function showAlert(message) {
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

async function consultAPI() {
    const { currency, crypto } = objQuote;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;

    try {
        const reply = await fetch(url);
        const result = await reply.json();
        showQuote(result.DISPLAY[crypto][currency]);
    } catch (error) {
        console.log(error)
    }
}

function showQuote(quote) {
    cleanHTML();
    
    form.classList.replace('md:col-span-2', 'md:col-span-1')

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quote;

    const quoteResultHead = document.createElement('div');
    quoteResultHead.classList.add('quote-result__head');

    const quoteResultHeadName = document.createElement('h2');
    quoteResultHeadName.classList.add('quote-result__head-name');
    quoteResultHeadName.textContent = cryptosObj[formCryptoSelect.value]
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

function cleanHTML() {
    while(quoteResult.firstChild) {
        quoteResult.removeChild(quoteResult.firstChild);
    }
}
