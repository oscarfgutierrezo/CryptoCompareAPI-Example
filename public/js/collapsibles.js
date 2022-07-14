import { formCryptoHead, formCryptoOptionsContainer, formCurrencyHead, formCurrencyOptionsContainer, formCurrencyOptions } from "./selectors.js";
import { objQuote } from "./classes/APP.js"

    // Desplegar y ocultar el menu de Cryptos al dar click en el encabezado
    formCryptoHead.addEventListener('click', () => {
        if (formCryptoOptionsContainer.style.maxHeight) {
            hiddenMenuOptions(formCryptoOptionsContainer);
        } else {
            showMenuOptions(formCryptoOptionsContainer);
        }
    });

    // Clic sobre una de las opciones del menú Crypto
    export function clickFormCryptoOptions(option) {
        option.addEventListener('click', () => {
            // Oculta el menú y el encabezado cambia por el nombre de la opción seleccionada
            hiddenMenuOptions(formCryptoOptionsContainer);
            formCryptoHead.textContent = option.querySelector('label').textContent;

            // El value de la opción seleccionada se convierte en el valor de la propiedad Crypto del objeto de consulta (objQuote)
            objQuote.crypto = option.querySelector('input').value;
        })
    }

    // Desplegar y ocultar el menu de Currency al dar click en el encabezado
    formCurrencyHead.addEventListener('click', () => {
        if (formCurrencyOptionsContainer.style.maxHeight) {
            hiddenMenuOptions(formCurrencyOptionsContainer)
        } else {
            showMenuOptions(formCurrencyOptionsContainer)
        }
    });

    // Clic sobre una de las opciones del menú Currency
    formCurrencyOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Oculta el menú y el encabezado cambia por el nombre de la opción seleccionada
            hiddenMenuOptions(formCurrencyOptionsContainer);
            formCurrencyHead.textContent = option.querySelector('label').textContent;

            // El value de la opción seleccionada se convierte en el valor de la propiedad Currency del objeto de consulta (objQuote)
            objQuote.currency = option.querySelector('input').value;
        })
    });

    // Ocultar los menú de opciones al hacer clic por fuera de ellos
    window.onclick = (e) => {
        if (formCryptoOptionsContainer.style.maxHeight && e.target !== formCryptoHead) {
            hiddenMenuOptions(formCryptoOptionsContainer)
        } else if (formCurrencyOptionsContainer.style.maxHeight && e.target !== formCurrencyHead) {
            hiddenMenuOptions(formCurrencyOptionsContainer)
        }
    }


    // Funciones para mostrar y ocultar los menú
    function showMenuOptions(menu) {
        if(menu.scrollHeight < '128px') {
            menu.style.maxHeight = menu.scrollHeight + "px";
        } else {
            menu.style.maxHeight = '128px'
        };
        menu.classList.add('active');
    }
    
    function hiddenMenuOptions(menu) {
        menu.style.maxHeight = null;
        menu.classList.remove('active')
    }




