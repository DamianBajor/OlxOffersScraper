const API_URL = 'http://localhost:7777/addOffer';
const SECONDS_TO_WAIT = 10;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makePostRequest(url, body) {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    const response = await fetch(url, config);
    const responseMessage = await response.json();

    return {status: response.status, responseMessage};
}

async function getOffersFromPage() {
    const elements = document.querySelector('[data-testid="listing-grid"]').querySelectorAll('[data-cy="l-card"]');

    for (const element of elements) {
        const title = element.querySelector('h6').innerText;
        const url = element.querySelector('a').href;

        const locationAndRefreshDate = element.querySelector('[data-testid="location-date"]').innerText;
        const location = locationAndRefreshDate.match(/(.+)(?= -)/g)[0];

        const priceTextValue = element.querySelector('[data-testid="ad-price"]').innerText;
        const parsedPriceValue = parseFloat(priceTextValue.replace(/ /g, ''));
        const price = parsedPriceValue ? parsedPriceValue : -1; // -1 means exchange

        const body = {
            title,
            price,
            location,
            url
        };

        await makePostRequest(API_URL, body);
    }
}

function scrollToBottom() {
    const y = document.querySelector('html').offsetHeight;
    document.querySelector('html').scrollTop = y;
}

async function waitForLoadingOffers() {
    for (let i = 0; i < SECONDS_TO_WAIT; i++) {
        if (document.querySelector('[data-testid="listing-grid"]')) {
            return;
        }

        await sleep(1000);
    }

    throw "Script could not find offers after " + SECONDS_TO_WAIT + "s";
}

async function getOffersFromAllPages() {
    while (true) {
        await scrollToBottom();
        await getOffersFromPage();

        if (!document.querySelector('[data-testid="pagination-forward"]')) {
            console.log("End of script");
            return;
        }

        document.querySelector('[data-testid="pagination-forward"]').click();
        await waitForLoadingOffers();
    }
}

getOffersFromAllPages();
