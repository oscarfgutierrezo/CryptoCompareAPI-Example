import { api, ui } from "./APP.js";
import { objQuote } from "./APP.js";

export class API {
    constructor() {

    }

    async consultCryptocurrencies() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    
        try {
            const reply = await fetch(url);
            const result = await reply.json();
            const cryptocurrencies = result.Data;
            ui.completeSelectCriptocurrencies(cryptocurrencies);
        } catch (error) {
            console.log(error);
        }
    };

    quote(e) {
        e.preventDefault();
        if(api.validateForm()) {
            ui.showAlert('All fields are required');
            return;
        }
        api.consultAPI()
    }

    validateForm() {
        return Object.values(objQuote).some(key => key === '')
    }

    async consultAPI() {
        const { currency, crypto } = objQuote;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
    
        try {
            const reply = await fetch(url);
            const result = await reply.json();
            ui.showQuote(result.DISPLAY[crypto][currency]);
        } catch (error) {
            console.log(error)
        }
    }
}

