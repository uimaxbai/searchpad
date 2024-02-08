import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const q = url.searchParams.get('q');
    /* if (q === "" || q === null) {
        error(400, "Missing query parameter 'q'");
    } */
    var linkToFetch = `http://suggestqueries.google.com/complete/search?client=chrome&q=${q}`;

    var response = await fetch(linkToFetch);
    if (!response.ok) {
        error(500, "Failed to fetch.");
    }
    var data = await response.json();

    return json(data);
}

/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
    error(405, "Method not allowed. Use a GET request instead.");
}