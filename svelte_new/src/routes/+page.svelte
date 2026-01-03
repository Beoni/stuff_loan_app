<script>
  import {invalidateAll} from '$app/navigation';
    /** @type {{ data: import('./$types').PageData }} */
    let {data} = $props();
    let isLoading = $state(false);
    let startTime = $state(null);
    
    // Käytä $effect() suorittamaan laskenta ja tulostamaan konsoliin, kun DOM on päivitetty.
    $effect(() => {
        if (startTime !== null && !isLoading) {
            const endTime = performance.now();
            const elapsed = endTime - startTime;
            const timeInMs = elapsed.toFixed(2);
            
            // Kirjoitetaan renderöintiaika konsoliin
            console.log(`Renderöintiaika (napin painamisesta taulukon päivitykseen): ${timeInMs} ms`);

            startTime = null; // Nollataan seuraavaa mittausta varten
        }
    });

    async function refreshData() {
      startTime = performance.now(); // Tallenna napin painamisen aloitusajankohta
      isLoading = true;
      await invalidateAll(); // Re-runs all load functions on the page
      isLoading = false;
  }
</script>

<svelte:head>
    <title>Tuotelistaus</title>
</svelte:head>

<button onclick={refreshData} disabled={isLoading}>
  {isLoading ? 'Ladataan...' : 'Lataa uudelleen'}
</button>

<h1>Tuotelistaus Svelte</h1>

    <table >
      <thead>
        <tr>
          <th>ID</th>
          <th>Nimi</th>
          <th>Kuvaus</th>
          <th>Määrä</th>
        </tr>
      </thead>
      <tbody>
        {#if isLoading}
          <tr>
            <td>Ladataan dataa...</td>
          </tr>
        {:else}
          {#each data.items as item (item.id)}
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>

<style>
    table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>