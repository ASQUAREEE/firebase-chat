<template>
  <div class="message">
    <div class="flex" :class="{'flex-row-reverse': sender}">
      <div :class="{'message-sender': sender, 'message-receiver': !sender}">
        <div class="avatar-container">
          <Avatar class="avatar" :src="photoUrl" />
          <span class="message-name">{{ name }}</span>
        </div>
        <v-card class="text-container">
          <slot />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>

<style>
.message {
  margin-bottom: 10px;
}

.flex {
  display: flex;
  align-items: flex-start;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

.message-sender {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
}

.message-receiver {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}

.message-name {
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  font-size: 12px;
}

.avatar-container {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 5px;
}

.text-container {
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #e2f2fd;
  color: #000000;
}

.text-receiver .text-container {
  background-color: #f5f5f5;
  color: #000000;
}
</style>
