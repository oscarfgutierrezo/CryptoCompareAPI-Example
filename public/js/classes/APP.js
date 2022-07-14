import { UI } from "./UI.js";
import { API } from "./API.js";

export const ui = new UI()
export const api = new API()

export const objQuote = {
    currency: '',
    crypto: ''
}

export const cryptosObj = {}

class App {
    constructor() {
        this.initApp();
    }

    initApp() {
        api.consultCryptocurrencies();
        form.addEventListener('submit', api.quote)
    }
}

const app = new App()
