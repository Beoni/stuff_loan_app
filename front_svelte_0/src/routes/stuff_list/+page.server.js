/** @type {import('./$types').PageServerLoad} */


export async function load( { fetch }) {
    const url = new URL('http://localhost:3000/stuff');
    const response = await fetch(url);
    const stuff_all = await response.json();
    let stuff;
    
    return {
        stuff_all
        }
 };
