<template>
    <div class="container">
      <div class="message-container">
        <Message
          v-for="{ id, text, userPhotoURL, userName, userId } in messages"
          :key="id"
          :name="userName"
          :photo-url="userPhotoURL"
          :sender="userId === user?.uid"
        >
          {{ text }}
        </Message>
        <div ref="bottom" class="scroll-to-bottom" />
      </div>
  
      <div class="input-container">
        <form v-if="isLogin" @submit.prevent="send">
          <div class="d-flex align-center">
            <input
              v-model="message"
              class="message-input"
              placeholder="Type a message..."
              required
            />
            <button class="emoji-button" @click="showEmojiPicker"></button>
            <button type="submit" class="send-button">
              <SendIcon />
            </button>
          </div>
          <div v-if="showPicker" class="emoji-picker-container">
            <EmojiPicker :native="true" @select="onSelectEmoji" />
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, nextTick, onUnmounted } from 'vue'
  import { useAuth, useChat } from '@/firebase'
  
  import SendIcon from './SendIcon.vue'
  import Message from './Message.vue'
  import EmojiPicker from 'vue3-emoji-picker'
  
  // import css
  import 'vue3-emoji-picker/css'
  
  export default {
    components: { Message, SendIcon, EmojiPicker },
    setup() {
      const { user, isLogin } = useAuth()
      const { messages, sendMessage } = useChat()
  
      const bottom = ref(null)
      watch(
        messages,
        () => {
          nextTick(() => {
            bottom.value?.scrollIntoView({ behavior: 'smooth' })
          })
        },
        { deep: true }
      )
  
      const message = ref('')
      const send = () => {
        sendMessage(message.value)
        message.value = ''
      }
  
      const showPicker = ref(false)
      const showEmojiPicker = () => {
        showPicker.value = !showPicker.value
      }
  
      const closeEmojiPicker = (event) => {
        if (
          !event.target.closest('.emoji-button') &&
          !event.target.closest('.emoji-picker-container')
        ) {
          showPicker.value = false
        }
      }
  
      document.addEventListener('click', closeEmojiPicker)
  
      onUnmounted(() => {
        document.removeEventListener('click', closeEmojiPicker)
      })
  
      const onSelectEmoji = (selectedEmoji) => {
        // Handle the selected emoji
        console.log(selectedEmoji)
        message.value += selectedEmoji.i
      }
  
      return {
        user,
        isLogin,
        messages,
        bottom,
        message,
        send,
        showPicker,
        showEmojiPicker,
        onSelectEmoji
      }
    }
  }
  </script>
 
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: url(@/assets/chatImg.jpg) no-repeat center;
    background-size: cover;
    margin-top: -25px;
  }
  
  .message-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  
  .scroll-to-bottom {
    margin-top: auto;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    padding: 20px;
    background-image: linear-gradient(#58319b, #2c184e);
    border-top: 1px solid #ddd;
  }
  
  .message-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    width: 800px;
  }
  
  .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    background-color: #007bff;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  
  .emoji-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: transparent;
    border: none;
    border-radius: 100%;
    color: #421515;
    cursor: pointer;
    outline: none;
    background: url(@/assets/emoji.png) no-repeat center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  
  .emoji-picker-container {
    position: absolute;
    top: 420px;
    left: 100px;
    right: 0;
    z-index: 1;
  }
  
  /* Custom styles for Message component */
  .message {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .message .photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .message .text {
    background-color: #643636;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .message .sender {
    background-color: #007bff;
    color: #fff;
  }
  
  .message .sender .text {
    background-color: #007bff;
    color: #fff;
  }
  
  /* Add additional custom styles as needed */
  </style>
  