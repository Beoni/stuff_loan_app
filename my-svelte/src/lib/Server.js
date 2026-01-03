
export async function fetchStuff() {
   try {
     const items = await fetch('http://localhost:3000/stuff');
     if (!items.ok) {
         throw new Error(`HTTP error! status: ${items.status}`);
     }
     return await items.json();
    } catch (error) {
     console.error("Error fetching data from the API", error);
     return { items: [] };
   } 

 }