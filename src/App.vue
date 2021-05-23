<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
  url(./assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.text-title {
  font-size: 3rem;
}
.text-sub-title {
  font-size: 1.2rem;
}
.text-title, .text-sub-title {
  font-weight: bold;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
