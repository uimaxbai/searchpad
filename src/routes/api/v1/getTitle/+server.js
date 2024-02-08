import { error, json } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const site = url.searchParams.get('site') || "";
    /* if (q === "" || q === null) {
        error(400, "Missing query parameter 'q'");
    } */
    var data = {};
    var dataFetched = false;

    

    fetch(site)
            .then((response) => {
                if (!response.ok) {
                    error(500, "Failed to fetch.");
                }
                else {
                    return response;
                }
            })
            .then(res => res.text())
            .then((res) => {
                const parsedResponse = new JSDOM(res);
                // console.log(parsedResponse);
                data.title = parsedResponse.window.document.title;
                // console.log(parsedResponse.window.document.title);
                // data.description = parsedResponse.querySelector('meta[name="description"]').getAttribute('content');
                data.favicon = site + parsedResponse.window.document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href');
            })
            .then(() => {
                dataFetched = true;
            })
    
    return new Promise((resolve) => {
        setInterval(() => {
            if (dataFetched) {
                resolve(json(data));
            }
        }, 10);
    });
    
}

/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
    error(405, "Method not allowed. Use a GET request instead.");
}