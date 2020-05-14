<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <section>
      <router-view class="sidebar" name="sidebar"></router-view>
      <router-view class="content" name="content"></router-view>
    </section>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  align-items: center;
}
</style>

<style>
.sidebar a {
  color: #2c3e50;
  text-decoration: none;
}

.sidebar a {
  padding-top: .25rem;
  padding-bottom: .25rem;
  padding-left: 1em;
}

.sidebar a.router-link-active {
  color: #42b983;
}
</style>
