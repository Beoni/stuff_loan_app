
<script>
    import { onMount } from "svelte";
  
    // @ts-ignore
    let items = [];
  
    // Hakee API:n tiedot nuolifunktiolla ja päivittää items-arrayn
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/stuff");
        if (response.ok) {
          const data = await response.json();
          items = [...data];
        } else {
          console.error("API request failed", response.status);
        }
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };
  
    // Kutsutaan fetchData, kun komponentti ladataan
    onMount(() => fetchData());
  </script>
  
  <main>
    <h1>Tuotelistaus</h1>
    <table border="1" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nimi</th>
          <th>Kuvaus</th>
          <th>Määrä</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item}
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </main>
  
  <style>
    table {
      width: 100%;
      margin-top: 20px;
    }
  
    th, td {
      padding: 8px;
      text-align: left;
    }
  
    th {
      background-color: #f4f4f4;
    }
  </style>