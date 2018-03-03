<template>
  <div id="app">
     <img src="./assets/logo.png">
     <ul>
       <li><router-link to="/" exact>主页</router-link></li>
       <li><router-link to="/topics">话题</router-link></li>
       <li><router-link to="/counter">Counter</router-link></li>
       <li><router-link to="/about">关于</router-link></li>
     </ul>
     <router-view class="view"></router-view>
  </div>
</template>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  .router-link-active{
    color: red ;
  }
</style>
