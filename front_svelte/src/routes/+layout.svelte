<nav>
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/stuff_list">Stuff list</a>
</nav>

<slot />    

<style>
    nav {
        position:relative;
        display: flex;
        gap: 1em;
        justify-content: left;
        padding: 1em;
        background: #f4f4f4;
        font-size: 1.2em;
    }

    nav a {
        text-decoration: none;
    }   

    nav a:hover {
        text-decoration: underline;
    }
</style>