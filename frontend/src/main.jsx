import { createRoot } from 'react-dom/client';
import { createContext } from 'react';
import firebase from 'firebase/compat/app'; // Используем совместимость
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { PreLoaderProvider } from './Context/PreLoaderContext.jsx';
import { UserProvider } from './Context/UserContext.jsx';

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCXKd158nRrAWgC19N0fjt8qqSpYFGt2p8",
  authDomain: "online-group-sd.firebaseapp.com",
  projectId: "online-group-sd",
  storageBucket: "online-group-sd.appspot.com", // ✅ Исправлено
  messagingSenderId: "914123654980",
  appId: "1:914123654980:web:cc01f3f12bf8a5d53d7911",
  measurementId: "G-040GLWSYE0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
    console.log("Сессия Firebase сохранена!");
  })
  .catch((error) => {
    console.error("Ошибка при установке сессии:", error);
  });

export const Context = createContext({
  firebase,
  auth: firebase.auth(),
  firestore: firebase.firestore(),
});


createRoot(document.getElementById('root')).render( 
  <PreLoaderProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </PreLoaderProvider>
)
