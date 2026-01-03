<script>
let { items } = $props();
</script>

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
          {#each items as item (item.id)}
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