/** @type {import('./$types').PageLoad} */
 export async function load({ fetch }) {
   try {
     const res = await fetch("http://localhost:3000/stuff");
     if (!res.ok) {
         throw new Error(`HTTP error! status: ${res.status}`);
     }
     const items = await res.json();
     
     return { items };
     
   } catch (error) {
     console.error("Error fetching data from the API", error);
     return { items: [] };
   } 

 }