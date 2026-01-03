<script>
  import { onMount } from 'svelte';
  import { fetchStuff } from './lib/Server.js';
  import StuffList from './StuffList.svelte'

let items = [];
let isLoading = false;

// Yhdistetty funktio, joka hoitaa latauksen ja tilojen hallinnan
  async function loadStuff() {
    // 1. Aseta lataustila päälle. Tämä saa {#if isLoading} -lohkon näkymään.
    isLoading = true;
    // Tyhjennä lista välittömästi (valinnainen, mutta varmistaa, että lista katoaa heti)
    items = []; 

    try {
        // 2. Suorita asynkroninen API-kutsu
        items = await fetchStuff();
    } catch (error) {
        console.error("Datan haku epäonnistui:", error);
        // Käsittele virhe
        items = []; 
    } finally {
        // 3. Aseta lataustila pois päältä, kun haku on valmis (tai epäonnistuu)
        isLoading = false;
    }
  }

onMount (async () => {
  items = await fetchStuff();
});
</script>

<svelte:head>
    <title>Tuotelistaus</title>
</svelte:head>

<button on:click={loadStuff}>Hae uudelleen</button>

<h1>Tuotelistaus Svelte</h1>

{#if isLoading}
  <p>Ladataan...</p>
{:else if items.length}
  <StuffList items={items}/>
{:else}
  <p>Odottaa...</p>
{/if}

<style>
  
</style>