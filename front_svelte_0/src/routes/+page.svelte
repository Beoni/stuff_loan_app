
<script>
    /** @type {{ data: import('./$types').PageData }} */
    export let data;
</script>

<svelte:head>
    <title>Tuotelistaus</title>
</svelte:head>

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
        {#each data.items as item (item.id)}
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.quantity}</td>
          </tr>
        {/each}
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