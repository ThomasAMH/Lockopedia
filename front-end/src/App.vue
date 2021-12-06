<template>
  <div id="app">
    <div id="nav">
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/locks">Locks</router-link>
    </div>
    <router-view/>
    <footer>
      <a href="#">Lockopedia on GitHub</a>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
}

footer {
  background-color: #4d4dff;
  padding: 30px;
}

a {
  color: white;
}

#nav {
  padding: 30px;
  background-color: #4d4dff;
}

#nav a {
  font-weight: bold;
  color: black;
  font-size: 1.25em;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
