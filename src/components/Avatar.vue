<template>
    <img class="avatar" :src="src" />
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* float: left; */
  }
  </style>
  