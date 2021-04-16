<template>
  <div>
    <header>
      <Breadcrumbs />
    </header>
    <main>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home page</NuxtLink></li>
          <li><NuxtLink to="/Fun">Fun page</NuxtLink></li>
          <li><NuxtLink to="/Fun/1">Fun/1 page</NuxtLink></li>
          <li><NuxtLink to="/Fun/1/test">Fun/1/test page</NuxtLink></li>
        </ul>
      </nav>
      <Nuxt />
    </main>
  </div>
</template>

<style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1 {
    margin: 0;
  }
  nav { width: 150px;}
  ul {list-style: none; margin: 0; padding: 0;}
  li {text-align: left;}
  /* nav ul {margin-left: 12px;} */
  /* ul ul {padding-top: 6px; border-top: 1px solid #2c3e50;margin-left: 0; margin-top: 6px;} */
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    padding: .75rem 1rem;
    list-style: none;
    background-color: rgb(66, 185, 131, 0.2);
    margin-top: 0;
    margin-bottom: 16px;
  }
  .breadcrumb-item + .breadcrumb-item {
      padding-left: 6px;
  }
  .breadcrumb-item + .breadcrumb-item::before {
    display: inline-block; 
    color: #2c3e50;
    content: '/';
  }
  .breadcrumb-item .nuxt-link-active {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }
  .breadcrumb-item .nuxt-link-exact-active.nuxt-link-active {
    color: #42b983;
  }
  main {
    display: flex;
  }
</style>