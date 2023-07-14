<template>
    <nav class="nav-container">
      <div class="nav-content">
        <h1><strong>ASQUARE</strong> Chat App</h1>
  
        <div v-if="isLogin" class="login">
          <Avatar :src="user.photoURL" />
          <button class="text-gray-400 hover:text-white" @click="signOut">
            Sign Out
          </button>
        </div>
  
        <button v-else class="sign-in-btn" @click="signIn">
          Sign in
        </button>
      </div>
    </nav>
  </template>
  
  
  <script>
  import Avatar from './Avatar.vue'
  import { useAuth } from '@/firebase'
  
  export default {
  
    components: { Avatar },
    setup() {
      const { user, isLogin, signOut, signIn } = useAuth()
      return { user, isLogin, signOut, signIn }
    }
  }
  </script>

<style>
.nav-container {
  background-color: #333;
  padding: 10px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

h1 {
  margin: 0;
  font-size: 24px;
}

h1 strong {
  font-weight: bold;
}

.login {
  display: flex;
  align-items: center;
}

.text-gray-400 {
  color: #ccc;
}

.text-gray-400:hover,
.hover:text-white:hover {
  color: #fff;
}

.sign-in-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.sign-in-btn:hover {
  background-color: #45a049;
}

/* Adjust the styling of the Avatar component if necessary */
</style>
