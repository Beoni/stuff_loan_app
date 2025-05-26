<script>
    /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
    let { data, children } = $props();
    
</script>
<nav>
    <a href="/">Etusivu</a>
    <a href="/stuff_list">Tuotelistaus</a>
</nav>

{@render children()}