import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import Filter from 'bad-words';
import { ref, onUnmounted, computed } from 'vue';

const firebaseConfig = {
    apiKey: "AIzaSyANzTWLe7O0iCgzO8Ybk5PwRZe9X_9CTs0",
    authDomain: "vue-chat-app-cdd40.firebaseapp.com",
    projectId: "vue-chat-app-cdd40",
    storageBucket: "vue-chat-app-cdd40.appspot.com",
    messagingSenderId: "412846436552",
    appId: "1:412846436552:web:c168fda48ea7406a9875fd",
    measurementId: "G-CRGQX40XY5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messagesCollection = collection(firestore, 'messages');
const messagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(100));
const filter = new Filter();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = onAuthStateChanged(auth, (_user) => {
    user.value = _user;
  });
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await signOut(auth);
  };

  return { user, isLogin, signIn, signOut };
}

export function useChat() {
  const messages = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = async (text) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    await addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      // text: filter.clean(text),
      text: text, 
      createdAt: serverTimestamp()
    });
  };

  return { messages, sendMessage };
}
